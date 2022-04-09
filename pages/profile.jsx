import Image from "next/image";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService, dbService } from "../firebaseConfig";
import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [newName, setNewName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setUser(user);
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    if (isSignedIn) {
      setDisplayName(user.displayName);
      setUserId(user.uid);
      getStatusMsg();
    }
  }, [isSignedIn]);

  const getStatusMsg = async () => {
    const profileRef = collection(dbService, "profile");
    const q = query(profileRef, where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setStatusMsg(doc.data().statusMsg);
    });
  };

  const updateDisplayName = (newName) => {
    updateProfile(authService.currentUser, {
      displayName: newName,
    })
      .then(() => {
        setDisplayName(newName);
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateStatusMsg = async (newMsg) => {
    let target = null;
    const profileRef = collection(dbService, "profile");
    const q = query(profileRef, where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      target = doc.ref;
    });
    console.log(target);

    if (!target) {
      await addDoc(collection(dbService, "profile"), {
        uid: user.uid,
        statusMsg: newMsg,
      })
        .then(() => {
          setStatusMsg(newMsg);
          alert("Status Message Changed!");
        })
        .catch((error) => {
          alert(error);
        });
      return;
    }

    await updateDoc(target, {
      statusMsg: newMsg,
    })
      .then(() => {
        setStatusMsg(newMsg);
        alert("Status Message Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div id="profile">
      <h1>
        {displayName ? `${displayName}님의 프로필` : "닉네임을 설정해주세요"}
      </h1>
      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          updateDisplayName(newName);
        }}
      >
        <div className="field">
          <label>닉네임 바꾸기</label>
          <div className="fields">
            <div className="field">
              <input
                type="text"
                placeholder="새로운 닉네임"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="field">
              <button className="ui button" type="submit">
                바꾸기
              </button>
            </div>
          </div>
        </div>
      </form>

      <form
        className="ui form"
        onSubmit={(e) => {
          e.preventDefault();
          updateStatusMsg(newStatusMsg);
        }}
      >
        <div className="field">
          <label>상태 메시지</label>
          <p>{statusMsg}</p>
          <div className="fields">
            <div className="field">
              <input
                type="text"
                placeholder="새로운 상태 메시지"
                value={newStatusMsg}
                onChange={(e) => setNewStatusMsg(e.target.value)}
              />
            </div>
            <div className="field">
              <button className="ui button" type="submit">
                바꾸기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

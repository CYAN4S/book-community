import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService as auth, dbService as db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, Header } from "semantic-ui-react";

export default function Profile() {
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState(false);

  // User
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  // Form Input
  const [newName, setNewName] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    if (isSignedIn) {
      setUid(user.uid);
      getStatusMsg(user.uid);
    }
  }, [isSignedIn]);

  const onLogOutClick = () => {
    auth.signOut();
    router.push("/");
  };

  const getStatusMsg = async (uid) => {
    const docRef = doc(db, "profile", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDisplayName(docSnap.data().displayName);
      setStatusMsg(docSnap.data().statusMsg);
    }
  };

  const updateDisplayName = (newName) => {
    updateUserDoc({ displayName: newName })
      .then(() => {
        setDisplayName(newName);
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateStatusMsg = async (newMsg) => {
    updateUserDoc({ statusMsg: newMsg })
      .then(() => {
        setStatusMsg(newMsg);
        alert("Status Message Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateUserDoc = (newData) => {
    return setDoc(doc(db, "profile", user.uid), newData, { merge: true });
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
      <Header as="h2">로그아웃 하기</Header>
      <Button onClick={onLogOutClick}> Logout </Button>
    </div>
  );
}

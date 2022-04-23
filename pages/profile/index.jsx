import Image from "next/image";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService, dbService } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Button, Header } from "semantic-ui-react";

export default function Profile() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [newName, setNewName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");
  const [getSubscriberNum,setgetSubscriberNum] = useState(0);


  const profileRef = collection(dbService, "profile");

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
      setgetSubscriberNum(user.getSubscriberNum);
      getStatusMsg();
    }
  }, [isSignedIn]);

  function onLogOutClick() {
    authService.signOut();
    router.push("/");
  }

  const updateUserDoc = async (doc) => {
    let ref = null;
    const q = query(profileRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => (ref = doc.ref));
    console.log("updateUserDoc 함수 발동");
    return ref
      ? updateDoc(ref, doc)
      : addDoc(profileRef, {
          uid: user.uid,
          getSubscriberNum: user.getSubscriberNum ,
          ...doc,
        });
  };

  const getStatusMsg = async () => {
    const profileRef = collection(dbService, "profile");
    const q = query(profileRef, where("uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setStatusMsg(doc.data().statusMsg);
      console.log("getStatus 함수 발동", doc.data().statusMsg);
    });
    
  };

  const updateDisplayName = (newName) => {
    Promise.all([
      // Promise 내용 https://jongbeom-dev.tistory.com/201
      updateProfile(authService.currentUser, { displayName: newName }),
      updateUserDoc({ displayName: newName }),
    ])
      .then(() => {
        setDisplayName(newName);
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
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

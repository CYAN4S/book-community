import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService as auth, dbService as db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button, Form, Header } from "semantic-ui-react";

export default function Profile({ queryId }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  // User
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  // Form Input
  const [newName, setNewName] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");

  const isMe = () => uid == queryId;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    if (isSignedIn) {
      getDocAndSet(queryId);
    }
  }, [isSignedIn]);

  useEffect(() => {
    getDocAndSet(queryId);
  }, [queryId]);

  const onLogOutClick = () => {
    auth.signOut();
    router.push("/");
  };

  const getDocAndSet = async (uid) => {
    const userDoc = await getUserDoc(uid);
    if (userDoc) {
      setDisplayName(userDoc.displayName);
      setStatusMsg(userDoc.statusMsg);
    }
  };

  const getUserDoc = async (uid) => {
    const docRef = doc(db, "profile", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else return null;
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
    return setDoc(doc(db, "profile", uid), newData, { merge: true });
  };

  const onSubmit = (callback) => (e) => {
    e.preventDefault();
    callback();
  };

  const onSubscribeClick = async (e) => {
    e.preventDefault();

    const doc = await getUserDoc(uid);
    const isSubing = !!doc.users?.includes(queryId);

    if (isSubing) {
      updateUserDoc({ users: doc.users.filter((id) => id != queryId) });
    } else {
      updateUserDoc({ users: doc.users ? [...doc.users, queryId] : [queryId] });
    }
  };

  return (
    <div id="profile">
      <Header as="h2">
        {displayName ? `${displayName}님의 프로필` : "닉네임을 설정해주세요"}
      </Header>

      <p>{statusMsg}</p>

      {isMe() && (
        <>
          <Form onSubmit={onSubmit(() => updateDisplayName(newName))}>
            <Form.Field>
              <label>닉네임 바꾸기</label>
              <input
                type="text"
                placeholder="새로운 닉네임"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Field>

            <Button type="submit">바꾸기</Button>
          </Form>

          <Form onSubmit={onSubmit(() => updateStatusMsg(newStatusMsg))}>
            <Form.Field>
              <label>상태 메시지</label>
              <input
                type="text"
                placeholder="새로운 상태 메시지"
                value={newStatusMsg}
                onChange={(e) => setNewStatusMsg(e.target.value)}
              />
            </Form.Field>

            <Button type="submit">바꾸기</Button>
          </Form>
        </>
      )}

      {!isMe() && (
        <>
          <Button onClick={onSubscribeClick}>구독하기 / 구독 해제하기</Button>
        </>
      )}

      <Header as="h2">로그아웃 하기</Header>
      <Button onClick={onLogOutClick}> Logout </Button>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { queryId: context.query.id },
  };
}

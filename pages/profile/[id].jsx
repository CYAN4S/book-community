import { authService as auth, dbService as db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { doc, setDoc } from "firebase/firestore";
import { Button, Form, Header } from "semantic-ui-react";

import { v4 } from "uuid";

import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/hooks";

import { onUserDocSnapshot, getUserDoc } from "../../utils/functions";

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser] = useRecoilState(currentUserState);

  // Route
  const router = useRouter();
  const queryId = router.query.id;

  // Query User
  const [displayName, setDisplayName] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [wasSubingCheck, setWasSubingCheck] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  // Form Input
  const [newName, setNewName] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");

  const isMe = () => currentUser?.uid == queryId;

  const onLogOutClick = () => {
    auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const unsub = onUserDocSnapshot(queryId, onUser);
    return () => unsub?.();
  }, [queryId]);

  const onUser = async (data) => {
    setDisplayName(data?.displayName);
    setStatusMsg(data?.statusMsg);

    if (data?.users) {
      const x = await Promise.all(
        data.users.map(async (uid) => await getUserDoc(uid))
      );
      const list = x.map((i) => i?.displayName ?? "게스트");
      setSubscribers(list);

      if (currentUser) {
        checkSub(data.uid);
      }
    }
  };

  const updateDisplayName = (newName) => {
    updateUserDoc({ displayName: newName })
      .then(() => {
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateStatusMsg = async (newMsg) => {
    updateUserDoc({ statusMsg: newMsg })
      .then(() => {
        alert("Status Message Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateUserDoc = (newData) => {
    return setDoc(doc(db, "profile", currentUser.uid), newData, {
      merge: true,
    });
  };

  const onSubmit = (callback) => (e) => {
    e.preventDefault();
    callback();
  };

  const checkSub = async (uid) => {
    const doc = await getUserDoc(uid);
    console.log(doc);
    const isSubing = !!doc.users?.includes(queryId);
    setWasSubingCheck(isSubing);
  };

  const onSubscribeClick = async (e) => {
    e.preventDefault();

    const doc = await getUserDoc(currentUser?.uid);
    const isSubing = !!doc.users?.includes(queryId);

    if (isSubing) {
      updateUserDoc({ users: doc.users.filter((id) => id != queryId) });
      setWasSubingCheck(false);
      console.log("구독 취소", isSubing);
    } else {
      updateUserDoc({ users: doc.users ? [...doc.users, queryId] : [queryId] });
      setWasSubingCheck(true);
      console.log("구독 완료", isSubing);
    }
  };

  return (
    <div id="profile">
      <Header as="h2">
        {displayName
          ? `${displayName}님의 프로필`
          : isMe()
          ? "닉네임을 설정해주세요."
          : "닉네임을 아직 설정하지 않은 사용자입니다."}
      </Header>

      <p>{statusMsg}</p>

      <Header as="h2">구독자 목록</Header>
      <ul>
        {subscribers.map((displayName) => (
          <li key={v4()}>{displayName}</li>
        ))}
      </ul>

      {subscribers.length == 0 && <p>구독자가 없습니다.</p>}

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
        <Button onClick={onSubscribeClick}>
          {wasSubingCheck ? "구독 중" : "구독하기"}
        </Button>
      )}

      <Header as="h2">로그아웃 하기</Header>
      <Button onClick={onLogOutClick}> Logout </Button>
    </div>
  );
}

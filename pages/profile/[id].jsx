import { authService as auth, dbService as db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Segment,
  List,
  Step,
} from "semantic-ui-react";

import { v4 } from "uuid";
import Link from "next/link";

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
  const [myBooks, setMyBooks] = useState([]);

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

      if (data.myBooks) {
        const listMyBook = await Promise.all(
          data.myBooks.map(async (x) => await x.substr(24))
        );
        setMyBooks(listMyBook);
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
    } else {
      updateUserDoc({ users: doc.users ? [...doc.users, queryId] : [queryId] });
      setWasSubingCheck(true);
    }
  };
  return (
    <div id="profile">
      <Header style={{ marginTop: 30 }}>
        <Label color={"teal"} size="massive">
        {displayName
          ? `${displayName}님의 프로필`
          : isMe()
          ? "닉네임을 설정해주세요."
          : "닉네임을 아직 설정하지 않은 사용자입니다."}
        </Label>
      </Header>

      <Grid columns={2} style={{ marginLeft: 10 }}>
        <Grid.Column>
          <Segment raised>
            <Label as="a" color="red" ribbon>
              상태메시지
            </Label>
            <span>{statusMsg ? statusMsg : "상태메시지를 입력해보세요"}</span>
            <Image
              src="https://markettraders.kr/wp-content/uploads/2020/04/stock.jpg"
              size="medium"
              style={{ marginTop: 10, marginBottom: 30 }}
            />

            <Label as="a" color="blue" ribbon>
              나의 구독자 목록
            </Label>

            {subscribers.length == 0 ? (
              <div>
                <Icon name="thumbs up" style={{ marginTop: 15 }} />
                <span>구독자가 없습니다.</span>
              </div>
            ) : (
              <List>
                {subscribers.map((displayName) => (
                  <List.Item key={v4()}>
                    <Image avatar src="/images/avatar/small/rachel.png" />
                    <List.Content>
                      <List.Header as="a">{displayName}</List.Header>
                      <List.Description>
                        Last seen watching just now. {/*구독자 상태메시지*/}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            )}

            <Label style={{ marginTop: 15 }} as="a" color="purple" ribbon>
              내가 등록한 책 목록
            </Label>

            {myBooks.length == 0 ? (
              <div>
                <Icon name="thumbs up" style={{ marginTop: 15 }} />
                <span>등록한 책이 없습니다.</span>
              </div>
            ) : (
              <List className="ui bulleted list">
                {myBooks.map((myBooks) => (
                  <List.Item key={v4()}>
                  
                    <List.Content>
                      <List.Header as="a">{myBooks}</List.Header>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
              
            )}

            {!isMe() && (
              <Button onClick={onSubscribeClick}>
                {wasSubingCheck ? "구독 중" : "구독하기"}
              </Button>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment raised>
            {isMe() && (
              <>
                <Form onSubmit={onSubmit(() => updateDisplayName(newName))}>
                  <Form.Field>
                    <Label as="a" color="red" ribbon="right">
                      닉네임 바꾸기
                    </Label>
                    <Input
                      type="text"
                      placeholder="새로운 닉네임"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      style={{ marginTop: 10 }}
                    />
                  </Form.Field>

                  <Button type="submit" color="black">
                    바꾸기
                  </Button>
                </Form>

                <Form onSubmit={onSubmit(() => updateStatusMsg(newStatusMsg))}>
                  <Form.Field>
                    <Label as="a" color="yellow" ribbon="right">
                      상태메시지 바꾸기
                    </Label>
                    <input
                      type="text"
                      placeholder="새로운 상태 메시지"
                      value={newStatusMsg}
                      onChange={(e) => setNewStatusMsg(e.target.value)}
                      style={{ marginTop: 10 }}
                    />
                  </Form.Field>

                  <Button type="submit" color="black">
                    바꾸기
                  </Button>
                </Form>
              </>
            )}

            <Label as="a" color="black" ribbon="right" onClick={onLogOutClick}>
              <Icon name="sign out alternate"></Icon>로그아웃하기
            </Label>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

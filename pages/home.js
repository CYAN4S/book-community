import Head from "next/head";
import { authService, dbService } from "../firebaseConfig";

import { Divider, Header, Icon } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { onAuthStateChanged } from "firebase/auth";

export default function Book_home() {
  // userPhoto Real-time synchronization
  const [userPhotos, setUserPhotos] = useState([]);

  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  const q = query(collection(dbService, "chat"), orderBy("createdAt", "desc"));
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats(chatArray);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);

  // 0517_2145 home snapshot(사용자프로필, 닉네임 부분 useEffect 활성화) code START
  const userPhotoQuery = query(collection(dbService, "profile"));
  useEffect(() => {
    onSnapshot(userPhotoQuery, (snapshot) => {
      const userPhotoArray = [];
      snapshot.forEach((doc) => {
        userPhotoArray.push(doc.data().userPhoto);
      });
      setUserPhotos(userPhotoArray);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);
  // 0517_2145 home snapshot(사용자프로필, 닉네임 부분 useEffect 활성화) code END
  console.log(userPhotos);
  return (
    <>
      <div style={{ marginLeft: 5 }}>
        <Head>
          <title>Home pages</title>
        </Head>
        <div style={{ height: 30 }}></div>
        <div>
          <Header as="h2" style={{ marginTop: -40 }}>
            <Icon name="chat" />
            <Header.Content>
              의견남기기
              <Header.Subheader>다른 사용자와 대화해보세요!</Header.Subheader>
            </Header.Content>
          </Header>
          <ChatFactory />

          <Divider />

          <Header as="h2">
            <Icon name="wechat" />
            <Header.Content>
              올라온 채팅
              <Header.Subheader>
                다른 사용자의 채팅을 볼 수 있어요!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <div style={{ marginTop: 30 }}>
            {chats.length ? (
              chats.map((chat) => (
                <div key={chat.id} style={{ marginBottom: 30 }}>
                  <Chats chat={chat} isOwner={chat.createrId === userId} userphoto = {chat} />
                </div>
              ))
            ) : (
              <p>채팅목록이 없습니다</p>
            )}
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
}

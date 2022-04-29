import Head from "next/head";
import { authService, dbService } from "../firebaseConfig";

import { Divider, Header } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { onAuthStateChanged } from "firebase/auth";

import { textState } from "../utils/hooks";
import { useRecoilState } from "recoil";

export default function Book_home() {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  const [text, setText] = useRecoilState(textState);

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
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
    });
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>Home pages</title>
        </Head>
        <div>
          <ChatFactory />

          <Divider />
          <Header as="h2">올라온 채팅</Header>
          <div>
            {chats.length ? (
              chats.map((chat) => (
                <div key={chat.id}>
                  <Chats chat={chat} isOwner={chat.createrId === userId} />
                </div>
              ))
            ) : (
              <p>채팅목록이 없습니다</p>
            )}
          </div>

          <Divider />
        </div>

        <h1>{text}</h1>
        <button onClick={() => setText((v) => v + 1)}>값 바꾸기</button>
      </div>
    </>
  );
}

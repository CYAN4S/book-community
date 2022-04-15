import Head from "next/head";
import { authService, dbService } from "../firebaseConfig";

import { Button, Divider, Header } from "semantic-ui-react";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { async } from "@firebase/util";
import { onAuthStateChanged } from "firebase/auth";

export default function Book_home() {

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
                <div className="chat_space" key={chat.id}>
                  <Chats chat={chat} 
                  
                  isOwner={chat.createrId === userId} />
                </div>
              ))
            ) : (
              <p>채팅목록이 없습니다</p>
            )}
          </div>

          <Divider />

        </div>
      </div>
      <style jsx>{`
        .chat_space {
          margin-left: 10px;
          margin-bottom: 5px;
          width: 300px;
          padding: 10px 10px 10px 0px;
        }
      `}</style>
    </>
  );
}

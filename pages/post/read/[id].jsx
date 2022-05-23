import Chats from "../../../Components/Chats";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../../firebaseConfig";
import { useState, useEffect } from "react";

export default function ReadWriting({ chat_data }) {
  // 게시글 출력 페이지 : 게시글 수정 시, 바로 출력되게끔 구성
  const [chats, setChats] = useState({});
  const q = query(
    collection(dbService, chat_data.genre_chat),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatArray.filter((item) => chat_data.chat.id === item.id));
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);
  return (
    <>
      {chats.length ? (
          <Chats
            chat={chats[0]}
            isOwner={chat_data.isOwner}
            genre_chat={chat_data.genre_chat}
            extractTitle = {chat_data.extractTitle}
          />

      ) : (
        <></>
      )}
    </>
  );
}

export async function getServerSideProps(props) {
  // query값으로 받아온 string요소를 다시 원상복구
  const chat = props.query && JSON.parse(props.query.chat);
  const isOwner = props.query && JSON.parse(props.query.isOwner);
  const genre_chat = props.query && props.query.genre_chat;
  const extractTitle = props.query && (props.query.extractTitle);
  return {
    props: {
      chat_data: { chat: chat, isOwner: isOwner, genre_chat: genre_chat, extractTitle: extractTitle },
    },
  };
}

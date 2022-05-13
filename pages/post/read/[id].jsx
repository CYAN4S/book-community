import Chats from "../../../Components/Chats";
import { useRouter } from "next/router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../../firebaseConfig";
import { useState, useEffect } from "react";

export default function ReadWriting({ chat_data }) {
  const [chats, setChats] = useState({})
  let chatdatata;

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
      chatdatata =chatArray.filter((item) => chat_data.chat.id === item.id);
      console.log(chatdatata);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);

  return (
    <>
      <Chats
        chat={chat_data.chat}
        isOwner={chat_data.isOwner}
        genre_chat={chat_data.genre_chat}
      />
    </>
  );
}

export async function getServerSideProps(props) {
  const chat = props.query && JSON.parse(props.query.chat);
  const isOwner = props.query && JSON.parse(props.query.isOwner);
  const genre_chat = props.query && props.query.genre_chat;

  return {
    props: {
      chat_data: { chat: chat, isOwner: isOwner, genre_chat: genre_chat },
    },
  };
}

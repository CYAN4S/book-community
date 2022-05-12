import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

import { authService, dbService } from "../firebaseConfig";

export default function CardChats({ chat, id, isOwner, genre_chat }) {
  const [chatData, setChatData] = useState([]);
  const isMe = chat.createrId === isOwner;
  const collectionName = genre_chat;

  return (
    <>
      <Link
        href={{
          pathname: `../post/read/${id}`,
          query: {
            id : id,
            createdAt: chat.createdAt,
            createrId: chat.createrId,
            fileUrl: chat.fileUrl,
            text: chat.text,
            title: chat.title,
            users: chat.users ? chat.users : [],
            isOwner: isOwner,
            genre_chat: genre_chat,
          },
        }}
      >
        <div>
          <p>
            {chat.title}, {chat.text}
          </p>
        </div>
      </Link>

      <style jsx>{``}</style>
    </>
  );
}

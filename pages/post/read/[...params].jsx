import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Popup,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService } from "../../../firebaseConfig";
import Chats from "../../../Components/Chats";

export default function ReadWriting({ chat, isMe, genre_chat }) {
  return (
    <>
    왜
      <Chats chat={chat} isOwner={isMe} genre_chat={genre_chat} />
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  console.log(params)
  let [createdAt, createrId, id, text, title, isMe, collectionName] = params;

  const chat = [
    {
      createdAt: createdAt,
      createrId: createrId,
      fileUrl : "",
      id: id,
      text: text,
      title: title,
    },
  ];
  return {
    props: {
      chat: chat,
      isMe: isMe,
      genre_chat: collectionName ? collectionName : "없음",
    },
  };
}

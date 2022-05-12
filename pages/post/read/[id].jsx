import Chats from "../../../Components/Chats";
import { useRouter } from "next/router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../../firebaseConfig";
import { useState, useEffect } from "react";

export default function ReadWriting({chat_data}) {

  
  return (
    <>
      <Chats chat={chat_data.chat} isOwner={chat_data.isOwner} genre_chat={chat_data.genre_chat} />
    </>
  );
}

export async function getServerSideProps(props) {
  
  const chat = props.query && JSON.parse(props.query.chat);
  const isOwner = props.query && JSON.parse(props.query.isOwner);
  const genre_chat = props.query && (props.query.genre_chat);

  return {
    props: {
      chat_data : {chat : chat, isOwner : isOwner, genre_chat : genre_chat}
    },
  };
}
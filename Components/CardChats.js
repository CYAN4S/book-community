import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

import { authService, dbService } from "../firebaseConfig";

export default function CardChats({ chat, id, isOwner, genre_chat }) {
  
  return (
    <>
      <Link
        href={{
          pathname: `../post/read/${id}`,
          query: {
            chat : chat && JSON.stringify(chat),
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

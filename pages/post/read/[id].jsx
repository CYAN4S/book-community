import Chats from "../../../Components/Chats";
import { useRouter } from "next/router";

export default function ReadWriting() {
  const router = useRouter();
  const { createdAt, createrId, fileUrl, text, title, users, isOwner, genre_chat } = router.query;

  const chat = {
    createdAt : createdAt,
    createrId : createrId,
    fileUrl : fileUrl,
    text : text,
    title : title,
    users : users ? users : []
  }

  
  console.log(chat);
  return (
    <>
      <Chats chat={chat} isOwner={isOwner} genre_chat={genre_chat} />
    </>
  );
}

// export async function getServerSideProps({ params: { params } }) {
//   let [createdAt, createrId, id, text, title, isMe, collectionName] = params;
//   const chat = {
//     createdAt: createdAt,
//     createrId: createrId,
//     fileUrl : "",
//     id: id,
//     text: text,
//     title: title,
//     users: [],
//   }

//   return {
//     props: {
//       chat: chat,
//       isMe: isMe,
//       genre_chat: collectionName ? collectionName : "없음",
//     },
//   };
// }


import Chats from "../../../Components/Chats";

export default function ReadWriting({ chat, isMe, genre_chat }) {
  return (
    <>
      <Chats chat={chat} isOwner={isMe} genre_chat={genre_chat} />
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  let [createdAt, createrId, id, text, title, isMe, collectionName] = params;
  const chat = {
    createdAt: createdAt,
    createrId: createrId,
    fileUrl : "",
    id: id,
    text: text,
    title: title,
    users: [],
  }

  return {
    props: {
      chat: chat,
      isMe: isMe,
      genre_chat: collectionName ? collectionName : "없음",
    },
  };
}

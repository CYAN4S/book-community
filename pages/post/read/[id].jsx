import Chats from "../../../Components/Chats";
import { useRouter } from "next/router";

export default function ReadWriting() {
  const router = useRouter();
  const { id, createdAt, createrId, fileUrl, text, title, users, isOwner, genre_chat } = router.query;

  const chat = {
    id : id,
    createdAt : createdAt,
    createrId : createrId,
    fileUrl : fileUrl,
    text : text,
    title : title,
    users : users ? users : []
  }

  return (
    <>
      <Chats chat={chat} isOwner={isOwner} genre_chat={genre_chat} />
    </>
  );
}

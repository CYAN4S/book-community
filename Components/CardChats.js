import Link from "next/link";
export default function CardChats({ chat, isOwner, genre_chat }) {
  const isMe = chat.createrId === isOwner;
  const collectionName = genre_chat;

  return (
    <>
      {/* 여기서 아이디가 그대로 전달되는데 나중에 as써서 가릴거임 */}
      <Link
        href={`../post/read/${chat.createdAt}/${chat.createrId}/${chat.id}/${chat.text}/${chat.title}/${isMe}/${collectionName}`}
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

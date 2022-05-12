import Link from "next/link";
export default function CardChats({ chat, isOwner, genre_chat }) {
  const isMe = chat.createrId === isOwner;
  const collectionName = genre_chat;
  console.log(chat.users)

  return (
    <>
      <Link
        href={{
          pathname : `../post/read/${chat.id}`,
          query : {
            createdAt : chat.createdAt,
            createrId : chat.createrId,
            fileUrl : chat.fileUrl,
            text : chat.text,
            title : chat.title,
            users : chat.users ? chat.users : [],
            isOwner : isOwner,
            genre_chat : genre_chat,
          }
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

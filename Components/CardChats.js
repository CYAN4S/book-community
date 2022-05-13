import Link from "next/link";

export default function CardChats({ chat, id, isOwner, genre_chat }) {
  return (
    <>
      {/*게시된 글을 누르면, 게시된 글을 출력하는 페이지로 이동
        또한 obj는 string화함
    */}
      <Link
        href={{
          pathname: `../post/read/${id}`,
          query: {
            chat: chat && JSON.stringify(chat),
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

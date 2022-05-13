import Link from "next/link";
import { Card, Container, Divider, List } from "semantic-ui-react";

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
        <>
          <Card.Header style={{ fontSize: 18, marginBottom: 0 }}>
             {chat.title}
          </Card.Header>
          <Card.Description>
            {chat.text.length > 30
              ? `${chat.text.substring(0, 30)}...`
              : chat.text}
          </Card.Description>
        </>
      </Link>

      <style jsx>{``}</style>
    </>
  );
}

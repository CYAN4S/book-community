import Link from "next/link";
import { Container, Divider, List } from "semantic-ui-react";

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
        <List.Content>
          <List.Header style={{fontSize : 18, marginBottom : 0}}> 제목 : {chat.title}</List.Header>
            <List.List>
              <List.Description>내용 : {chat.text.length > 30 ? `${chat.text.substring(0,30)}...` : chat.text}</List.Description>
            </List.List>
        </List.Content>
      </Link>

      <style jsx>{``}</style>
    </>
  );
}

import Link from "next/link";
import { Card, Container, Divider, Icon, Label, List } from "semantic-ui-react";
import { useUserDisplayName } from "../utils/functions";

export default function CardChats({ chat, id, isOwner, genre_chat }) {
  return (
    <>
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
        <Card
          raised
          style={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
            color: "black",
            fontFamily: `Helvetica, Arial, sans-serif`,
          }}
        >
          {/*10분 기준 : 즉각갱신*/}
          {new Date() - new Date(chat.createdAt) > 600000 ? (
            <></>
          ) : (
            <Label  color="red" floating style={{width : "26%"}}>
              <>
                <p style={{fontSize : 14, marginTop : -3}}>New</p>
                <p style={{fontSize : 10, marginTop : -17, marginBottom : -3}}>{`약 ${new Date(new Date() - new Date(chat.createdAt)).getMinutes()}분 전`}</p>
              </>
            </Label>
          )}

          <Card.Header
            style={{
              fontSize: 17,
              marginLeft: 18,
              marginTop: 10,
              marginBottom: 5,
              textAlign: "left",
            }}
          >
            {chat.title.length > 15
              ? `${chat.title.substring(0, 15)}...`
              : `${chat.title}`}
          </Card.Header>
          <Card.Description
            style={{
              fontSize: 11,
              marginLeft: 15,
              marginBottom: 5,
              textAlign: "left",
              color: "grey",
            }}
          >
            <Icon name="pencil alternate" />
            {chat.text.length > 20
              ? `${chat.text.substring(0, 20)}...`
              : chat.text}
          </Card.Description>
          <Card.Meta
            style={{
              fontSize: 11,
              textAlign: "right",
              marginTop: 10,
              marginRight: 10,
            }}
          >
            {" "}
            {new Date(chat.createdAt).toLocaleString()}
          </Card.Meta>
          <Card.Content extra>
            <Icon name="user" />
            {`작성자 : ${useUserDisplayName(chat.createrId)}`}
          </Card.Content>
        </Card>
      </Link>

      <style jsx>{``}</style>
    </>
  );
}

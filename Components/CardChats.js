import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, Icon, Label } from "semantic-ui-react";
import { dbService } from "../firebaseConfig";
import { useUserDisplayName } from "../utils/functions";

export default function CardChats({ chat, id, isOwner, genre_chat }) {
  const [chats, setChats] = useState([]);
  const [extractText, setExtractText] = useState("이동하기");

  const q = query(
    collection(dbService, genre_chat),
    orderBy("createdAt", "desc")
  );
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const checkExistOrginal = chatArray
        .map((x) => x.id)
        .includes(chat.replyTo);
      if (checkExistOrginal) {
        if (chats.filter((x) => x.id === chat.replyTo)[0]) {
          setExtractText(
            `${chats.filter((x) => x.id === chat.replyTo)[0].title}`
          );
          chat.title = `${chats.filter((x) => x.id === chat.replyTo)[0].title}`;
        }
      }

      setChats(chatArray);
    });
  }, [chats]);

  // check replyChat Exist
  const onCheckExistOriginal = () => {
    //(id) => id != `${isbn}${title}`
    const checkExistOrginal = chats.map((x) => x.id).includes(chat.replyTo);
    if (checkExistOrginal == false) {
      alert("사용자가 원글을 삭제하여 이동할 수 없습니다.");
    }
  };

  const onMouseEnter = () => {
    const checkExistOrginal = chats.map((x) => x.id).includes(chat.replyTo);
    if (checkExistOrginal == false) {
    } else {
      setExtractText(
        `원문 '${chats.filter((x) => x.id === chat.replyTo)[0].text}'으로...`
      );
    }
  };

  const onMouseLeave = () => {
    setExtractText("이동하기");
  };

  return (
    <>
      <Link
        href={{
          pathname: `../post/read/${id}`,
          query: {
            chat: chat && JSON.stringify(chat),
            extractTitle: extractText,
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
            <Label color="red" floating style={{ width: "24%" }}>
              <>
                <p style={{ fontSize: 14, marginTop: -3 }}>New</p>
                <p
                  style={{ fontSize: 10, marginTop: -17, marginBottom: -3 }}
                >{`약 ${new Date(
                  new Date() - new Date(chat.createdAt)
                ).getMinutes()}분 전`}</p>
              </>
            </Label>
          )}

          {chat.replyTo && (
            <Label color="blue" style={{ width: "100%", textAlign: "center" }}>
              {extractText === "" ? (
                <></>
              ) : extractText.length > 20 ? (
                <>{extractText.substring(0, 20)}...의 답글</>
              ) : (
                `${extractText}의 답글`
              )}
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
            {chat.replyTo ? (
              <>
                <p>답글</p>
              </>
            ) : (
              <>
                {chat.title.length > 15
                  ? `${chat.title.substring(0, 15)}...`
                  : `${chat.title}`}
              </>
            )}
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
            {new Date(chat.createdAt).toLocaleString()}
          </Card.Meta>
          <Card.Meta
            style={{
              fontSize: 11,
              textAlign: "right",
              marginRight: 10,
            }}
          >
            <Icon name="heart" color={chat.users.length ? "red" : "grey"} />
            {chat.users.length}
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

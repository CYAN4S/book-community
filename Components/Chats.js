import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Label,
  Image,
  Item,
  Container,
  Header,
} from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import { useUserDisplayName } from "../utils/functions";
import PostEditor from "./PostEditor";
import { useRouter } from "next/router";

export default function Chats({ chat, isOwner, detailbook_chat, genre_chat }) {
  const [editing, setEditing] = useState(false);
  const [currentUid, setCurrentUid] = useState(null);

  const [replying, setReplying] = useState(false);
  const [doLike, setDoLike] = useState(false);

  const displayName = useUserDisplayName(chat.createrId);
  const collectionName = detailbook_chat
    ? detailbook_chat
    : genre_chat
    ? genre_chat
    : "chat";

  const router = useRouter();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
        setDoLike(chat.users.includes(user.uid));
      }
    });
  }, []);

  const onDeleteClick = async () => {
    const ok = window.confirm("채팅을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, collectionName, `${chat.id}`))
        .then(() => {
          alert("채팅이 삭제되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });

      if (chat.fileUrl !== "") {
        await deleteObject(ref(storageService, chat.fileUrl));
      }
    }

    if (genre_chat) {
      router.back();
    }
  };

  // toggle edit mode
  const onEditClick = () => setEditing((prev) => !prev);

  // chat Like func
  const onLikeClick = () => {
    const doLike = chat.users.includes(currentUid);

    if (doLike) {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        users: chat.users.filter((content) => content != currentUid),
      });
      setDoLike(false);
    } else {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        users: chat.users.concat(currentUid),
      });
      setDoLike(true);
    }
  };

  // recomment edit mode
  const onReplyClick = () => setReplying((prev) => !prev);

  return (
    <>
      {genre_chat ? (
        <div>
          <Container centered>
            <Header as="h2" style={{ marginTop: "10%" }}>
              {chat.title}
            </Header>
            <p style={{ textAlign: "left", display: "flex" }}>
              <Link href={`/profile/${chat.createrId}`}>
                <a>
                  <Label
                    style={{
                      backgroundColor: "white",
                      width: 60,
                      height: 60,
                    }}
                  >
                    <Item.Image
                      avatar
                      spaced="right"
                      src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" // 이미지 넣을거임
                      size="large"
                    />
                  </Label>
                </a>
              </Link>
              <p style={{ marginTop: 3, fontWeight: "bold" }}>
                {" "}
                {displayName}{" "}
              </p>
              <span style={{ marginTop: 25, marginLeft: -40 }}>
                <Icon name="clock" />
                {new Date(chat.createdAt).toLocaleString()}
              </span>
            </p>
            <p>{chat.text}</p>
          </Container>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: 10 }}>
            <Item style={{ display: "flex", alignItems: "center" }}>
              <Link href={`/profile/${chat.createrId}`}>
                <a>
                  <Label
                    style={{
                      backgroundColor: "white",
                      width: 60,
                      height: 60,
                    }}
                  >
                    <Item.Image
                      avatar
                      spaced="right"
                      src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" // 이미지 넣을거임
                      size="large"
                    />
                    <p style={{ marginTop: 3 }}> {displayName} </p>
                  </Label>
                </a>
              </Link>
              <Item.Content style={{ marginLeft: 3, marginBottom: 5 }}>
                <Item.Description>
                  <strong>{chat.title}</strong>
                  <strong>{chat.text}</strong>
                  <p style={{ marginTop: 3 }}>
                    <Icon name="clock" />
                    {new Date(chat.createdAt).toLocaleString()}
                  </p>
                </Item.Description>
              </Item.Content>
            </Item>

            {chat.fileUrl && (
              <Image
                src={chat.fileUrl}
                style={{
                  width: "40%",
                  height: "40%",
                  marginTop: 10,
                  marginBottom: 5,
                }}
              />
            )}
          </div>
          <Button
            labelPosition="right"
            onClick={onLikeClick}
            style={{ marginRight: 10 }}
          >
            <Button color={doLike ? "red" : "grey"}>
              <Icon name="heart" />
            </Button>
            <Label as="a" basic color={doLike ? "red" : "grey"} pointing="left">
              {chat.users.length}
            </Label>
          </Button>
          <Button inverted color="blue" onClick={onReplyClick}>
            댓글
          </Button>

          {isOwner && (
            <>
              <Button inverted color="red" onClick={onDeleteClick}>
                삭제
              </Button>
              <Button inverted color="green" onClick={onEditClick}>
                편집
              </Button>
            </>
          )}

          {editing && (
            <div>
              <PostEditor
                chat={chat}
                purpose={"edit"}
                uid={currentUid}
                detailbook_chat={detailbook_chat}
                genre_chat={genre_chat}
              />
            </div>
          )}

          {replying && (
            <PostEditor
              chat={chat}
              purpose={"reply"}
              uid={currentUid}
              detailbook_chat={detailbook_chat}
              genre_chat={genre_chat}
            />
          )}
        </div>
      )}

      <style jsx>{`
        strong {
          font-size: 16px;
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        }
      `}</style>
    </>
  );
}

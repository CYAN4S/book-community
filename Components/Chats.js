import { deleteDoc, doc, updateDoc,collection, onSnapshot, query } from "firebase/firestore";
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
  Divider,
} from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import { useUserDisplayName, useUserPhoto } from "../utils/functions";
import PostEditor from "./PostEditor";
import { useRouter } from "next/router";
import {  } from "firebase/firestore";

export default function Chats({ chat, isOwner, detailbook_chat, genre_chat }) {
  const [editing, setEditing] = useState(false);
  const [currentUid, setCurrentUid] = useState(null);

  const [isMe, setIsMe] = useState(false);
  const [replying, setReplying] = useState(false);
  const [doLike, setDoLike] = useState(false);
  // syncUserPhoto
  const userPhoto = useUserPhoto(chat.createrId);
  const displayName = useUserDisplayName(chat.createrId);

  const collectionName = detailbook_chat ?? genre_chat ?? "chat";
  // 0517_2145 home snapshot(사용자프로필, 닉네임 부분 useEffect 활성화) code START
  const userPhotoQuery = query(collection(dbService, "profile"));
  useEffect(() => {
    onSnapshot(userPhotoQuery, (snapshot) => {
      const userPhotoArray = [];
      snapshot.forEach((doc) => {
        userPhotoArray.push(doc.data().userPhoto);
      });
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);
  // 0517_2145 home snapshot(사용자프로필, 닉네임 부분 useEffect 활성화) code END

  const router = useRouter();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
        setDoLike(chat.users.includes(user.uid));

        setIsMe(user.uid == chat.createrId);
      }
    });
  }, []);

  const onDeleteClick = async () => {
    const ok = window.confirm("채팅을 삭제하시겠습니까?");
    if (ok) {
      console.log(collectionName, chat.id);
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
            <Header as="h2" style={{ marginTop: "7%" }}>
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
                    <Image
                      className="ui medium circular image"
                      src={userPhoto}
                      size="big"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    ></Image>
                    <p style={{ marginTop: 3 }}> {displayName} </p>
                  </Label>
                </a>
              </Link>
              <p style={{ marginTop: 3, fontWeight: "bold" }}>{displayName}</p>
              <span style={{ marginTop: 25, marginLeft: -40 }}>
                <Icon name="clock" />
                {new Date(chat.createdAt).toLocaleString()}
              </span>
            </p>
            <Divider
              style={{ marginTop: -10, marginBottom: 15, width: "40%" }}
            />
            <p style={{ marginBottom: 10 }}>{chat.text}</p>

            {chat.fileUrl && (
              <Image
                src={chat.fileUrl}
                style={{
                  width: "40%",
                  height: "40%",
                  marginTop: 10,
                  marginBottom: 25,
                }}
              />
            )}
            <Container textAlign="right" style={{ marginBottom: 100 }}>
              <Button
                labelPosition="right"
                onClick={onLikeClick}
                style={{ marginRight: 10 }}
              >
                <Button color={doLike ? "red" : "grey"}>
                  <Icon name="heart" />
                </Button>
                <Label
                  as="a"
                  basic
                  color={doLike ? "red" : "grey"}
                  pointing="left"
                >
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
            </Container>
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
                    {/* test */}
                    <Image
                      className="ui medium circular image"
                      src={userPhoto}
                      size="big"
                      style={{ marginTop: 10, marginBottom: 10 }}
                    ></Image>

                    <p
                      style={{
                        textAlign: "center",
                        marginLeft: -31,
                        marginTop: 3,
                        width: 100,
                        fontSize: 13,
                        fontFamily: "GothicA1-ExtraLight",
                      }}
                    >
                      {" "}
                      {displayName?.length > 5
                        ? `${displayName.substring(0, 5)}...`
                        : displayName}{" "}
                    </p>
                  </Label>
                </a>
              </Link>
              <Item.Content style={{ marginLeft: 20, marginBottom: 5 }}>
                <Item.Description>
                  <strong>{chat.title}</strong>
                  <strong>{chat.text}</strong>
                  <Divider style={{ marginBottom: 5, marginTop: 5 }} />
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

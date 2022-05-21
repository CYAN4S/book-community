import {
  deleteDoc,
  doc,
  updateDoc,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
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
import {} from "firebase/firestore";

export default function Chats({ chat, isOwner, detailbook_chat, genre_chat }) {
  const [chats, setChats] = useState("");
  const [editing, setEditing] = useState(false);
  const [replying, setReplying] = useState(false);
  const [currentUid, setCurrentUid] = useState(null);

  const [isMe, setIsMe] = useState(false);
  const [doLike, setDoLike] = useState(false);

  const [extractText, setExtractText] = useState("답글");
  // syncUserPhoto
  const userPhoto = useUserPhoto(chat.createrId);
  const displayName = useUserDisplayName(chat.createrId);

  const collectionName = detailbook_chat ?? genre_chat ?? "chat";

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
      if (chat.vidFileUrl !== "") {
        await deleteObject(ref(storageService, chat.vidFileUrl));
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

  // query for CheckReply
  // DB Real-time change check
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatArray);
    });
  }, []);

  // Detail book page chatting query
  const q = query(collection(dbService, `chat`), orderBy("createdAt", "desc"));
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
      setExtractText(`원문 '${chats.filter((x) => x.id === chat.replyTo)[0].text}'으로 이동하기`);
    }
  };

  const onMouseLeave = () => {
    setExtractText("답글");
  };
  
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
                      marginLeft : -15
                    }}
                  >
                    <Image
                      className="ui medium circular image"
                      src={userPhoto}
                      size="big"
                      style={{ marginTop: 0, marginBottom: 10 }}
                    ></Image>
                    <p style={{ marginTop: 3, marginLeft : 7 }}> {displayName} </p>
                  </Label>
                </a>
              </Link>
              <p style={{ marginTop: 3, fontWeight: "bold" }}>{displayName}</p>
              <span style={{ marginTop: 25, marginLeft: -25 }}>
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
                  width: 300,
                  marginTop: 10,
                  marginBottom: 25,
                }}
              />
            )}
            {chat.vidFileUrl && (
              <video loop={true} style={{ width: 400 }} controls={true}>
                <source src={chat.vidFileUrl}></source>
              </video>
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
                      {displayName?.length > 5
                        ? `${displayName.substring(0, 5)}...`
                        : displayName}
                    </p>
                  </Label>
                </a>
              </Link>
              <Item.Content style={{ marginLeft: 20, marginBottom: 5 }}>
                <Item.Description>
                  {chat.replyTo ? (
                    <>
                      <strong>{chat.text}</strong>
                      <Label 
                        color="teal"
                        style={{marginLeft : 10}}
                        circular
                        onClick={onCheckExistOriginal}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        name={`${chat.id}`}
                        href={`#${chat.replyTo}`}
                        title={`답글이 삭제된 경우, 이동되지 않습니다.`}>
                        
                        <p style={{marginLeft : 10, marginRight : 10, fontSize : 13 , height : 17, fontFamily :"GothicA1-ExtraLight"}}>{extractText}</p>
                      </Label>
                    </>
                  ) : (
                    <>
                      <strong>{chat.text}</strong>
                      <a name={`${chat.id}`} />
                    </>
                  )}

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
                  width: 300,
                  marginTop: 10,
                  marginBottom: 5,
                }}
              />
            )}
            {chat.vidFileUrl && (
              <video loop={true} style={{ width: 400 }} controls={true}>
                <source src={chat.vidFileUrl}></source>
              </video>
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
        }
      `}</style>
    </>
  );
}

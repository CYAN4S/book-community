import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import PostEditor from "./PostEditor";

export default function Chats({ chat, isOwner }) {
  const [username, setUserName] = useState(
    chat.nickName ? chat.nickName : "guest"
  );
  const [editing, setEditing] = useState(false);
  const [currentUid, setCurrentUid] = useState(null);

  const [replying, setReplying] = useState(false);
  const [doLike, setDoLike] = useState(false);

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
      await deleteDoc(doc(dbService, "chat", `${chat.id}`))
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
  };

  const onEditClick = () => setEditing((prev) => !prev);

  const onLikeClick = () => {
    const doLike = chat.users.includes(currentUid);

    if (doLike) {
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        users: chat.users.filter((content) => content != currentUid),
      });
      setDoLike(false);
    } else {
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        users: chat.users.concat(currentUid),
      });
      setDoLike(true);
    }
  };

  const onReplyClick = () => setReplying((prev) => !prev);

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Link href={`/profile/${chat.createrId}`}>
            <a>{username}</a>
          </Link>{" "}
          : <strong> {chat.text}</strong>
          <p>[등록시간] {new Date(chat.createdAt).toLocaleString()}</p>
          {chat.fileUrl && (
            <img src={chat.fileUrl} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
        <Button labelPosition="right" onClick={onLikeClick}>
          <Button color={doLike ? "red" : "grey"}>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color={doLike ? "red" : "grey"} pointing="left">
            {chat.users.length}
          </Label>
        </Button>
        <Button onClick={onReplyClick}>댓글</Button>

        {isOwner && (
          <>
            <Button onClick={onDeleteClick}>삭제</Button>
            <Button onClick={onEditClick}>편집</Button>
          </>
        )}

        {editing && (
          <PostEditor chat={chat} purpose={"edit"} uid={currentUid} />
        )}

        {replying && (
          <PostEditor chat={chat} purpose={"reply"} uid={currentUid} />
        )}
      </div>
    </>
  );
}

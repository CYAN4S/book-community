import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import PostEditor from "./PostEditor";

export default function Chats({ chat, isOwner }) {
  const [likeNum, setLikeNum] = useState(chat.likeNum);
  const [username, setUserName] = useState(
    chat.nickName ? chat.nickName : "guest"
  );
  const [editing, setEditing] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          likeNum: likeNum,
          doLike: false,
          updateProfile: (args) => updateProfile(args),
        });
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
    const filter = chat.users.filter((item) => {
      return item === userObj.uid;
    });

    console.log(chat.users);
    console.log(filter);

    // 오늘 할 것 : userObj.doLike가 초기화되지않는 뭔가가 되면
    if (!filter.length && userObj.uid !== chat.createrId) {
      console.log("제발?");
      setLikeNum((prev) => prev + 1);
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        likeNum: chat.likeNum + 1,
        users: chat.users.concat(userObj.uid),
      })
        .then(() => {
          userObj.doLike = true;
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      console.log("제발");
      setLikeNum((prev) => prev - 1);
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        likeNum: chat.likeNum - 1,
        users: chat.users.filter((item) => item !== userObj.uid),
      })
        .then(() => {
          userObj.doLike = false;
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          <Link href={`/profile/${chat.createrId}`}><a>{username}</a></Link> :{" "}
          <strong> {chat.text}</strong>
          <p>[등록시간] {new Date(chat.createdAt).toLocaleString()}</p>
          {chat.fileUrl && (
            <img src={chat.fileUrl} style={{ width: "100%", height: "100%" }} />
          )}
        </div>
        <span className="btn_Like" onClick={onLikeClick}>
          좋아요 수 : {chat.likeNum ? "💗" : "🤍"} {chat.likeNum}
        </span>

        {isOwner && (
          <>
            <Button onClick={onDeleteClick}>삭제</Button>
            <Button onClick={onEditClick}>편집</Button>
          </>
        )}

        {editing && <PostEditor chat={chat} />}
      </div>
    </>
  );
}

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Image, Item } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import PostEditor from "./PostEditor";

export default function Chats({ chat, isOwner, detailbook_chat }) {
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
      await deleteDoc(doc(dbService, detailbook_chat ?? "chat", `${chat.id}`))
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
      updateDoc(doc(dbService, detailbook_chat ?? "chat", `${chat.id}`), {
        users: chat.users.filter((content) => content != currentUid),
      });
      setDoLike(false);
    } else {
      updateDoc(doc(dbService, detailbook_chat ?? "chat", `${chat.id}`), {
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
          <Item style={{display:"flex", alignItems: "center"}}>
            <Link href={`/profile/${chat.createrId}`}>
            <a>
              <Label style={{backgroundColor:"white", width:60, height:60}}>
                <Item.Image
                  avatar
                  spaced="right"
                  src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" // 이미지 넣을거임
                  size = "large"
                />
                <p style={{marginTop:3}}> {username} </p>
              </Label>
            </a>
          </Link>
           <Item.Content style={{marginLeft:3, marginBottom:5}}>
             <Item.Description>
             <strong> 
               {chat.text}
            </strong>
            <p style={{marginTop:3}}> <Icon name="clock"/>{new Date(chat.createdAt).toLocaleString()}</p>
             </Item.Description>
          </Item.Content>
          </Item>
          
          
          {chat.fileUrl && (
            <Image src={chat.fileUrl} style={{ width: "40%", height: "40%", marginTop:10, marginBottom:5}} />
          )}
        </div>
        <Button labelPosition="right" onClick={onLikeClick} style={{marginRight:10}}>
          <Button color={doLike ? "red" : "grey"}>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color={doLike ? "red" : "grey"} pointing="left">
            {chat.users.length}
          </Label>
        </Button>
        <Button inverted color='blue' onClick={onReplyClick}>댓글</Button>

        {isOwner && (
          <>
            <Button inverted color='red' onClick={onDeleteClick}>삭제</Button>
            <Button inverted color='green' onClick={onEditClick}>편집</Button>
          </>
        )}

        {editing && (
          <div>
             <PostEditor chat={chat} purpose={"edit"} uid={currentUid} />
          </div> 
        )} 

        {replying && (
          <PostEditor chat={chat} purpose={"reply"} uid={currentUid} />
        )}
      </div>
      <style jsx>{`
        strong{
          font-size:16px;
          font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        }

      `}</style>
    </>
  );
}

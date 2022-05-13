import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  TextArea,
  Image,
  Icon,
} from "semantic-ui-react";
import { dbService, storageService } from "../firebaseConfig";
import { v4 } from "uuid";

export default function PostEditor({
  chat,
  purpose,
  uid,
  detailbook_chat,
  genre_chat,
}) {
  const [newChat, setNewChat] = useState(purpose == "reply" ? "" : chat?.text);
  const [newTitle, setNewTitle] = useState(
    purpose == "reply" ? "" : chat?.title
  );
  const [imgFileString, setImgFileString] = useState("");
  const [imgEdit, setImgEdit] = useState(false);

  const collectionName = detailbook_chat
    ? detailbook_chat
    : genre_chat
    ? genre_chat
    : "chat";

  const onEditSubmit = async () => {

    console.log(chat);
    console.log(newChat, newTitle);
    console.log(collectionName);
    if (imgEdit) {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      const temp_fileUrl = await getDownloadURL(response.ref);

      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
        fileUrl: temp_fileUrl,
      })
        .then(() => {
          alert("수정되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
      })
        .then(() => {
          alert("수정되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });
    }
    setImgEdit(false);
    setImgFileString("");
  };

  const onReplySubmit = async () => {
    let fileUrl = "";
    if (newChat === "") {
      return;
    }
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }

    const chatObj = {
      title: newTitle,
      text: newChat,
      createdAt: Date.now(),
      createrId: uid,
      fileUrl,
      users: [],
      replyTo: chat.id,
    };


    await addDoc(collection(dbService, collectionName), chatObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setNewChat("");
    setNewTitle("");
    setImgFileString("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (purpose === "edit") {
      onEditSubmit();
    } else {
      onReplySubmit();
    }
  };

  const onDeleteTempImageClick = () => {
    if (imgFileString !== "") {
      setImgFileString("");
      setImgEdit(false);
    }
  };

  const OnImageDeleteClick = async () => {
    const ok = window.confirm(
      "등록된 이미지를 삭제하시겠습니까? (삭제과정은 되돌릴 수 없습니다.)"
    );
    if (ok) {
      if (chat.fileUrl === "") {
        alert("채팅에 올려놓은 이미지가 없습니다.");
      } else {
        await deleteObject(ref(storageService, chat.fileUrl)).then(() => {
          updateDoc(doc(dbService, collectionName, `${chat.id}`), {
            title: newTitle,
            text: newChat,
            fileUrl: "",
          })
            .then(alert("삭제되었습니다!"))
            .catch((error) => {
              alert(error);
            });
        });
      }
    }
  };

  const onFileChange = async (event) => {
    setImgEdit(true);
    const {
      target: { files },
    } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImgFileString(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <Label
              basic
              color="violet"
              pointing="below"
              style={{ marginTop: 10 }}
            >
              Edit your text
            </Label>
            {genre_chat ? (
              <Form.Input
                value={newTitle}
                type="text"
                placeholder={purpose == "reply" ? "댓글 달기" : "수정하기"}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                required
              />
            ) : (
              <></>
            )}

            <Form.TextArea
              value={newChat}
              type="text"
              placeholder={purpose == "reply" ? "댓글 달기" : "수정하기"}
              onChange={(e) => setNewChat(e.target.value)}
              autoFocus
              required
            />

            {!chat?.fileUrl && (
              <div style={{ marginTop: 10 }}>
                <Label
                  basic
                  color="violet"
                  pointing="right"
                  htmlFor="attach-file"
                >
                  <p>Add/Edit photos</p>
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  id="attach-file"
                  icon="file image"
                  style={{ width: 300 }}
                />
              </div>
            )}
          </Form.Field>
          {imgFileString && (
            <div className="temp">
              <Image
                fluid
                label={{
                  color: "red",
                  onClick: onDeleteTempImageClick,
                  icon: "remove circle",
                  size: "large",
                  ribbon: true,
                }}
                src={imgFileString}
                style={{
                  backgroundImage: imgFileString,
                  width: "30%",
                  height: "30%",
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 15,
                }}
              />
            </div>
          )}
          {chat?.fileUrl && (
            <div
              onClick={OnImageDeleteClick}
              style={{ width: 100, height: 30, cursor: "pointer" }}
            >
              <Icon color="red" name="remove circle" /> <span>DEL IMG</span>
            </div>
          )}
          <Button type="submit" value="update" inverted color="green">
            {purpose == "reply" ? "댓글 달기" : "수정 완료"}
          </Button>
        </Form>
      </div>
    </>
  );
}

import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useState } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { dbService, storageService } from "../firebaseConfig";
import { v4 } from "uuid";

export default function PostEditor({ chat, purpose, uid }) {
  const [newChat, setNewChat] = useState(purpose == "reply" ? "" : chat?.text);
  const [imgFileString, setImgFileString] = useState("");
  const [imgEdit, setImgEdit] = useState(false);

  const onEditSubmit = async () => {
    if (imgEdit) {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      const temp_fileUrl = await getDownloadURL(response.ref);

      updateDoc(doc(dbService, "chat", `${chat.id}`), {
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
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
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
      text: newChat,
      createdAt: Date.now(),
      createrId: uid,
      fileUrl,
      users: [],
      replyTo: chat.id,
    };

    await addDoc(collection(dbService, "chat"), chatObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setNewChat("");
    setImgFileString("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (purpose == "edit") {
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
          updateDoc(doc(dbService, "chat", `${chat.id}`), {
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
            <TextArea
              value={newChat}
              type="text"
              placeholder={purpose == "reply" ? "댓글 달기" : "수정하기"}
              onChange={(e) => setNewChat(e.target.value)}
              autoFocus
              required
            />
            {!chat?.fileUrl && (
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                id="attach-file"
              />
            )}
          </Form.Field>
          {imgFileString && (
            <div className="temp">
              <img
                src={imgFileString}
                style={{
                  backgroundImage: imgFileString,
                  width: "30%",
                  height: "30%",
                }}
              />
              <span className="downTempImg" onClick={onDeleteTempImageClick}>
                Del TempImg
              </span>
            </div>
          )}
          {chat?.fileUrl && <div onClick={OnImageDeleteClick}>Del Img</div>}
          <Button type="submit" value="update">
            수정 완료
          </Button>
        </Form>
      </div>
    </>
  );
}

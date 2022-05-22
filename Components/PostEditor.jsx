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
import { useRouter } from "next/router";

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
  // 0519_1929 비디오 업로드 편집/삭제 관련 버그 해결 코드 시작
  const [vidFileString, setVidFileString] = useState("");
  const [vidEdit, setVidEdit] = useState(false);
  // 0520_1100 편집/댓글 달고 나서 편집/댓글 창 그대로 유지되는 현상 방지
  const router = useRouter();

  console.log(chat)
  const collectionName = detailbook_chat
    ? detailbook_chat
    : genre_chat
    ? genre_chat
    : "chat";
  const onEditSubmit = async () => {
    if (imgEdit) {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      const temp_fileUrl = await getDownloadURL(response.ref);

      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
        fileUrl: temp_fileUrl,
      })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    } else {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
      })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    }
    if (vidEdit) {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, vidFileString, "data_url");
      const temp_vidFileUrl = await getDownloadURL(response.ref);

      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
        vidFileUrl: temp_vidFileUrl,
      })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    } else {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
      })
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    }
    setImgEdit(false);
    setImgFileString("");
    setVidEdit(false);
    setVidFileString("");
    alert("수정되었습니다!");
  };

  const onReplySubmit = async () => {
    let fileUrl = "";
    let vidFileUrl = "";
    if (newChat === "") {
      return;
    }
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    if (vidFileString !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, vidFileString, "data_url");
      vidFileUrl = await getDownloadURL(response.ref);
    }
    const chatObj = {
      title: newTitle,
      text: newChat,
      createdAt: Date.now(),
      createrId: uid,
      fileUrl,
      users: [],
      vidFileUrl,
      replyTo: chat.id,
    };

    await addDoc(collection(dbService, collectionName), chatObj)
      .then(() =>    
      alert("댓글이 등록되었습니다."))
      .catch((error) => alert(error));

    setImgFileString("");
    setVidFileString("");
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (purpose === "edit") {
      onEditSubmit();
    } else {
      onReplySubmit();
    }
    
    if(!genre_chat){
      const url = window.location.href; 
      if(!url.includes("home")){
        router.push(window.location.reload());
      }
      else{
        router.push("/");
      }
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
  const OnVideoDeleteClick = async () => {
    const ok = window.confirm("등록된 비디오를 삭제하시겠습니까?");
    if (ok) {
      if (chat.vidFileUrl === "") {
        alert("채팅에 올려놓은 동영상이 없습니다.");
      } else {
        await deleteObject(ref(storageService, chat.vidFileUrl)).then(() => {
          updateDoc(doc(dbService, collectionName, `${chat.id}`), {
            title: newTitle,
            text: newChat,
            vidFileUrl: "",
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
  const onFileChangeVideo = (event) => {
    setVidEdit(true);
    const {
      target: { files },
    } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setVidFileString(result);
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
              style={{ marginTop: 20 }}
            >
              Edit your text
            </Label>
            {genre_chat ? (
              <>
                {purpose == "reply" ? (
                  <></>
                ) : (
                  <>
                    {chat.replyTo ? <></> : <>
                    <Form.Input
                      value={newTitle}
                      type="text"
                      placeholder={
                        purpose == "reply" ? "댓글 달기" : "수정하기"
                      }
                      onChange={(e) => setNewTitle(e.target.value)}
                      autoFocus
                      required
                    />
                    </>}
                    
                  </>
                )}
              </>
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
                    width: 300,
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 15,
                  }}
                />
              </div>
            )}
            {!chat?.vidFileUrl && (
              <div style={{ marginTop: 10 }}>
                <Label
                  basic
                  color="violet"
                  pointing="right"
                  htmlFor="attach-file"
                >
                  <p>Add/Edit videos</p>
                </Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={onFileChangeVideo}
                  id="attach-file"
                  icon="video image"
                  style={{ width: 300 }}
                />
              </div>
            )}
          </Form.Field>
          {vidFileString && (
            <div>
              <video
                loop={true}
                style={{
                  width: 400,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 15,
                }}
                controls={true}
              >
                <source src={vidFileString}></source>
              </video>
              <div
                onClick={OnVideoDeleteClick}
                style={{ width: 100, height: 30, cursor: "pointer" }}
              >
                <Icon color="red" name="remove circle" />{" "}
                <span>비디오 삭제</span>
              </div>
            </div>
          )}

          {chat?.fileUrl && (
            <div
              onClick={OnImageDeleteClick}
              style={{ width: 100, height: 30, cursor: "pointer" }}
            >
              <Icon color="red" name="remove circle" /> <span>이미지 삭제</span>
            </div>
          )}
          {chat?.vidFileUrl && (
            <div
              onClick={OnVideoDeleteClick}
              style={{ width: 100, height: 30, cursor: "pointer" }}
            >
              <Icon color="red" name="remove circle" /> <span>비디오 삭제</span>
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

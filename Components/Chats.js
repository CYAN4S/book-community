import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import { v4 } from "uuid";

export default function Chats({ chat, isOwner }) {
  const [newChat, setNewChat] = useState(chat.text);
  const [likeNum, setLikeNum] = useState(chat.likeNum);
  const [username, setUserName] = useState(
    chat.nickName ? chat.nickName : "guest"
  );
  const [editing, setEditing] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");
  const [imgEdit, setImgEdit] = useState(false);

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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (imgEdit) {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
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
    setEditing(false);
    setImgFileString("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
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
        <div style={{ marginBottom: 10 }}>
          <a href={"profile".concat("/", chat.createrId)}>{username}</a> :{" "}
          <strong> {chat.text}</strong>{" "}
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

        {editing && (
          <div>
            <Form onSubmit={onSubmit}>
              <Form.Field>
                <TextArea
                  value={newChat}
                  type="text"
                  placeholder="수정하기"
                  onChange={onChange}
                  autoFocus
                  required
                />
                {!chat.fileUrl ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    id="attach-file"
                  />
                ) : (
                  <></>
                )}
              </Form.Field>
              {imgFileString && (
                <>
                  <div className="temp">
                    <img
                      src={imgFileString}
                      style={{
                        backgroundImage: imgFileString,
                        width: "30%",
                        height: "30%",
                      }}
                    />
                    <span
                      className="downTempImg"
                      onClick={onDeleteTempImageClick}
                    >
                      Del TempImg
                    </span>
                  </div>
                </>
              )}
              {chat.fileUrl ? (
                <div className="downImg" onClick={OnImageDeleteClick}>
                  Del Img
                </div>
              ) : (
                <></>
              )}
              <Button type="submit" value="update">
                수정 완료
              </Button>
            </Form>
            <Button onClick={onEditClick}>cancel</Button>
          </div>
        )}
      </div>
    </>
  );
}

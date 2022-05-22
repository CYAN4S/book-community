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
  Grid,
  Embed,
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
  // ChatFactory.js에서 추출 (Youtube Url) code START
  const [youtubeString, setYoutubeString] = useState("");
  const [youtubeEdit, setYoutubeEdit] = useState(false);
  const [id, setId] = useState("");
  const [checkRealSubmit, setCheckRealSubmit] = useState(false);
  // ChatFactory.js에서 추출 (Youtube Url) code END

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

    if (youtubeEdit) {
      updateDoc(doc(dbService, collectionName, `${chat.id}`), {
        title: newTitle,
        text: newChat,
        youtubeUrl: id,
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
    setYoutubeString("");
    setId("");
    alert("수정되었습니다!");
  };

  const onReplySubmit = async () => {
    let fileUrl = "";
    let vidFileUrl = "";
    let youtubeUrl = "";
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
    //  (youtube URL) code start
    if (id !== "") {
      youtubeUrl = id;
    }
    //  code end
    const chatObj = {
      title: newTitle,
      text: newChat,
      createdAt: Date.now(),
      createrId: uid,
      fileUrl,
      users: [],
      vidFileUrl,
      youtubeUrl,
      replyTo: chat.id,
    };

    await addDoc(collection(dbService, collectionName), chatObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setImgFileString("");
    setVidFileString("");
    setYoutubeString("");
    setId("");
    if (genre_chat) {
      router.back();
    }
  };

  const onSubmit = async (e) => {
    if (checkRealSubmit == true) {
      e.preventDefault();

      if (purpose === "edit") {
        onEditSubmit();
      } else {
        onReplySubmit();
      }
      const url = window.location.href;
      if (!url.includes("home")) {
        router.push(window.location.reload());
      } else {
        router.push("/");
      }
      setCheckRealSubmit(false);
    } else {
      return;
    }
  };

  const onDeleteTempImage = () => {
    if (imgFileString !== "") {
      setImgFileString("");
      setImgEdit(false);
    }
  };

  const onDeleteTempVideoFile = () => {
    setVidFileString("");
    setVidEdit(false);
  };

  const onDeleteTempYoutubeUrl = () => {
    setYoutubeString("");
    setId("");
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
  const onYoutubeUrlDeleteClick = async () => {
    const ok = window.confirm("등록된 유튜브 링크를 삭제하시겠습니까?");
    if (ok) {
      if (chat.youtubeUrl === "") {
        alert("채팅에 올려놓은 링크가 없습니다.");
      } else {
        updateDoc(doc(dbService, collectionName, `${chat.id}`), {
          title: newTitle,
          text: newChat,
          youtubeUrl: "",
        })
          .then(alert("삭제되었습니다!"))
          .catch((error) => {
            alert(error);
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

  // Lee's Youtube URL substring Code Start
  const onYoutubeSubmit = () => {
    setYoutubeEdit(true);
    if (youtubeString.includes("watch?v=")) {
      let pos = youtubeString.indexOf("watch?v=");
      // console.log(url.substring(pos+8,));
      setId(youtubeString.substring(pos + 8));
    } else if (youtubeString.includes("/shorts/")) {
      let pos = youtubeString.indexOf("/shorts/");
      // console.log(url.substring(pos+8,));
      setId(youtubeString.substring(pos + 8));
    } else if (youtubeString.includes("youtu.be/")) {
      let pos = youtubeString.indexOf("youtu.be/");
      setId(youtubeString.substring(pos + 9));
    } else if (youtubeString == "" && checkRealSubmit == true) {
      setId("");
      alert("");
      // code fix Youtube URL Submit push button when URL empty string
    } else if (youtubeString == "" && checkRealSubmit == false) {
      setId("");
      setYoutubeString("");

      alert("유튜브 URL을 입력해주세요");
    } else {
      setId("");
      setYoutubeString("");

      alert("인식할 수 없는 URL입니다.");
    }
  };
  // Lee's Youtube URL substring Code END
  const onCheckRealSubmit = () => setCheckRealSubmit(true);
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
          </Form.Field>
          {purpose != "reply" ? (
            <>
              {!chat?.youtubeUrl && (
                <Grid columns={3}>
                  <Grid.Column style={{ width: 160, marginTop: 10 }}>
                    <Label
                      basic
                      color="orange"
                      pointing="right"
                      htmlFor="attach-file"
                    >
                      <p>Add Youtube URL</p>
                    </Label>
                  </Grid.Column>
                  <Grid.Column style={{ marginLeft: -30, width: 240 }}>
                    <Form.Field>
                      <Form.Input
                        focus
                        placeholder="Youtube URL을 입력해주세요"
                        value={youtubeString}
                        onChange={(e) => setYoutubeString(e.target.value)}
                      />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column style={{ marginLeft: -20, width: 200 }}>
                    <Button
                      style={{ marginTop: 5 }}
                      size="mini"
                      onClick={onYoutubeSubmit}
                    >
                      Submit
                    </Button>
                  </Grid.Column>
                </Grid>
              )}
            </>
          ) : (
            <>
              <Grid columns={3}>
                <Grid.Column style={{ width: 160, marginTop: 10 }}>
                  <Label
                    basic
                    color="orange"
                    pointing="right"
                    htmlFor="attach-file"
                  >
                    <p>Add Youtube URL</p>
                  </Label>
                </Grid.Column>
                <Grid.Column style={{ marginLeft: -30, width: 240 }}>
                  <Form.Field>
                    <Form.Input
                      focus
                      placeholder="Youtube URL을 입력해주세요"
                      value={youtubeString}
                      onChange={(e) => setYoutubeString(e.target.value)}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column style={{ marginLeft: -20, width: 200 }}>
                  <Button
                    style={{ marginTop: 5 }}
                    size="mini"
                    onClick={onYoutubeSubmit}
                  >
                    Submit
                  </Button>
                </Grid.Column>
              </Grid>
            </>
          )}

          {id && (
            <div style={{ width: "50%" }}>
              <Embed
                style={{
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 5,
                }}
                placeholder={`https://i1.ytimg.com/vi/${id}/maxresdefault.jpg`}
                id={id}
                source="youtube"
              />

              <div
                onClick={onDeleteTempYoutubeUrl}
                style={{
                  width: 150,
                  marginTop: 10,
                  marginLeft: 20,
                  marginBottom: 5,
                  height: 30,
                  cursor: "pointer",
                }}
              >
                <Icon color="red" name="remove circle" />{" "}
                <span>Youtube URL 삭제</span>
              </div>
            </div>
          )}
          {purpose != "reply" ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}

          {imgFileString && (
            <div className="temp">
              <Image
                fluid
                label={{
                  color: "red",
                  onClick: onDeleteTempImage,
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
          {purpose != "reply" ? (
            <>
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
            </>
          ) : (
            <>
              {" "}
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
            </>
          )}

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
                onClick={onDeleteTempVideoFile}
                style={{ width: 100, height: 30, cursor: "pointer" }}
              >
                <Icon color="red" name="remove circle" />{" "}
                <span>비디오 삭제</span>
              </div>
            </div>
          )}

          {purpose != "reply" ? (
            <>
              {chat?.fileUrl && (
                <div
                  onClick={OnImageDeleteClick}
                  style={{ width: 100, height: 30, cursor: "pointer" }}
                >
                  <Icon color="red" name="remove circle" />{" "}
                  <span>이미지 삭제</span>
                </div>
              )}
              {chat?.vidFileUrl && (
                <div
                  onClick={OnVideoDeleteClick}
                  style={{ width: 100, height: 30, cursor: "pointer" }}
                >
                  <Icon color="red" name="remove circle" />{" "}
                  <span>비디오 삭제</span>
                </div>
              )}
              {chat?.youtubeUrl && (
                <div
                  onClick={onYoutubeUrlDeleteClick}
                  style={{ width: 140, height: 30, cursor: "pointer" }}
                >
                  <Icon color="red" name="remove circle" />{" "}
                  <span>Youtube URL 삭제</span>
                </div>
              )}
            </>
          ) : (
            <></>
          )}

          {/* ------------------ */}

          <Button
            onClick={onCheckRealSubmit}
            value="update"
            inverted
            color="green"
          >
            {purpose == "reply" ? "댓글 달기" : "수정 완료"}
          </Button>
        </Form>
      </div>
    </>
  );
}

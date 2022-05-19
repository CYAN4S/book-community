import { authService, dbService, storageService } from "../firebaseConfig";
import {
  Button,
  Form,
  Icon,
  Input,
  Label,
  Segment,
  TextArea,
  Image,
  Container,
  Header,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export default function ChatFactory({ detailbook_chat, genre_chat }) {
  const [chat, setChat] = useState("");
  const [title, setTitle] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");
  const [vidFileString, setVidFileString] = useState("");
  const [textVidUploadComplete, setTextVidUploadComplete] = useState("");

  const router = useRouter();

  const collectionName = detailbook_chat
    ? detailbook_chat
    : genre_chat
    ? genre_chat
    : "chat";
  // const collectionName = detailbook_chat ?? "chat"

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          updateProfile: (args) => updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
    });
  }, []);

  const onNewPostSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";
    let vidFileUrl ="";
    if (chat === "") {
      return;
    }
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }
    if (vidFileString !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, vidFileString, "data_url");
      vidFileUrl = await getDownloadURL(response.ref);
    }
    console.log(vidFileUrl);
    const chatObj = {
      title: title,
      text: chat,
      createdAt: Date.now(),
      createrId: userObj.uid,
      fileUrl,
      vidFileUrl,
      users: [],
    };

    await addDoc(collection(dbService, collectionName), chatObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setChat("");
    setImgFileString("");
    setVidFileString("");
    setTextVidUploadComplete("");

    if (genre_chat) {
      router.back();
    }
  };

  const onFileChange = (event) => {
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
    setTextVidUploadComplete("영상이 입력되었음");
  };

  const onClearPhotoClick = () => setImgFileString("");

  return (
    <div>
      {genre_chat ? (
        <>
          <Header as="h2" icon textAlign="center">
            <Icon name="book" circular />
            <Header.Content>글 쓰기</Header.Content>
            <p style={{ fontSize: 12, marginTop: 3 }}>게시글을 작성해보세요!</p>
          </Header>
          <Container textAlign="left">
            <Form onSubmit={onNewPostSubmit}>
              <Form.Field>
                <Form.Input
                  fluid
                  label="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="글의 제목을 입력해주세요."
                  required
                />
                <Form.TextArea
                  label="내용"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  placeholder="글의 내용을 입력해주세요."
                  required
                />
              </Form.Field>
              <div>
                <Label
                  basic
                  color="orange"
                  pointing="right"
                  htmlFor="attach-file"
                >
                  <p>Add photos</p>
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  id="attach-file"
                  icon="file image"
                />
              </div>

              {imgFileString && (
                <div>
                  <Image
                    fluid
                    label={{
                      color: "red",
                      onClick: onClearPhotoClick,
                      icon: "remove circle",
                      size: "large",
                      ribbon: true,
                    }}
                    src={imgFileString}
                    style={{
                      backgroundImage: imgFileString,
                      width: "40%",
                      height: "40%",
                      marginTop: 10,
                      marginLeft: 20,
                    }}
                  />
                </div>
              )}
              <Button
                icon
                labelPosition="right"
                color="teal"
                style={{ marginTop: 15 }}
              >
                보내기
                <Icon name="right arrow" />
              </Button>
            </Form>
          </Container>
        </>
      ) : (
        <>
          <Form onSubmit={onNewPostSubmit}>
            <Form.Field>
              <Label basic color="orange" pointing="below">
                Please enter your text
              </Label>
              <TextArea
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                required
              />
            </Form.Field>
            <div>
              <Label
                basic
                color="orange"
                pointing="right"
                htmlFor="attach-file"
              >
                <p>Add photos</p>
              </Label>

              <Input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                id="attach-file"
                icon="file image"
              />
            </div>
            <div>
              <Label
                basic
                color="orange"
                pointing="right"
                htmlFor="attach-file"
              >
                <p>Add videos</p>
              </Label>

              <Input
                type="file"
                accept="video/*"
                onChange={onFileChangeVideo}
                id="attach-file"
                icon="file image"
              />
            </div>
            {vidFileString && (
            <div>
              {textVidUploadComplete}
              </div>
            )}
            {imgFileString && (
              <div>
                <Image
                  fluid
                  label={{
                    color: "red",
                    onClick: onClearPhotoClick,
                    icon: "remove circle",
                    size: "large",
                    ribbon: true,
                  }}
                  src={imgFileString}
                  style={{
                    backgroundImage: imgFileString,
                    width: "40%",
                    height: "40%",
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                />
              </div>
            )}
            <Button
              icon
              labelPosition="right"
              color="teal"
              style={{ marginTop: 15 }}
            >
              보내기
              <Icon name="right arrow" />
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}

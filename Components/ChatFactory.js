import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { authService, dbService, storageService } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { useRecoilState } from "recoil";
import { currentUserState, useImageUploader } from "../utils/hooks";

import {
  Button,
  Form,
  Icon,
  Input,
  Label,
  TextArea,
  Image,
  Container,
  Header,
} from "semantic-ui-react";

import { v4 } from "uuid";

export default function ChatFactory({ detailbook_chat, genre_chat }) {
  const [chat, setChat] = useState("");
  const [title, setTitle] = useState("");

  const [currentUser] = useRecoilState(currentUserState);
  const [imageFile, onImageChange, clearImage] = useImageUploader("");

  const router = useRouter();

  const collectionName = detailbook_chat ?? genre_chat ?? "chat";

  const onNewPostSubmit = async (e) => {
    e.preventDefault();

    let fileUrl = "";
    if (chat === "") {
      return;
    }
    if (imageFile !== "") {
      const fileRef = ref(storageService, `${currentUser.uid}/${v4()}`);
      const response = await uploadString(fileRef, imageFile, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }

    const chatObj = {
      title: title,
      text: chat,
      createdAt: Date.now(),
      createrId: currentUser.uid,
      fileUrl,
      users: [],
    };

    await addDoc(collection(dbService, collectionName), chatObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setChat("");
    clearImage();

    if (genre_chat) {
      router.back();
    }
  };

  const onClearPhotoClick = (e) => {
    e.preventDefault();
    clearImage();
  };

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
                  onChange={onImageChange}
                  id="attach-file"
                  icon="file image"
                />
              </div>

              {imageFile && (
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
                    src={imageFile}
                    style={{
                      backgroundImage: imageFile,
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
                onChange={onImageChange}
                id="attach-file"
                icon="file image"
              />
            </div>

            {imageFile && (
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
                  src={imageFile}
                  style={{
                    backgroundImage: imageFile,
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

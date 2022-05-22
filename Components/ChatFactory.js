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
  Embed,
  Grid,
  GridColumn,
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
  // Youtube Url
  const [input, setInput] = useState(false);
  const [youtubeString, setYoutubeString] = useState("");
  const [id, setId] = useState("");
  // fix bug when push  YOUTUBE URL SUBMIT button
  const [checkRealSubmit, setCheckRealSubmit] = useState(false);
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
    if (checkRealSubmit == true) {
      let fileUrl = "";
      let vidFileUrl = "";
      let youtubeUrl = "";
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
      //  (youtube URL) code start
      if (id !== "") {
        youtubeUrl = id;
      }
      //  code end

      const chatObj = {
        title: title,
        text: chat,
        createdAt: Date.now(),
        createrId: userObj.uid,
        fileUrl,
        vidFileUrl,
        youtubeUrl,
        users: [],
      };

      await addDoc(collection(dbService, collectionName), chatObj)
        .then(() => console.log("전송완료"))
        .catch((error) => alert(error));

      setChat("");
      setImgFileString("");
      setVidFileString("");
      setYoutubeString("");
      setId("");
      setInput(false);
      if (genre_chat) {
        router.back();
      }
      setCheckRealSubmit(false);
      
    } else {
      return;
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
  };
  // Lee's Youtube URL substring Code Start
  const onYoutubeSubmit = () => {
    if (youtubeString.includes("watch?v=")) {
      let pos = youtubeString.indexOf("watch?v=");
      // console.log(url.substring(pos+8,));
      setId(youtubeString.substring(pos + 8));
      setInput(true);
    } else if (youtubeString.includes("/shorts/")) {
      let pos = youtubeString.indexOf("/shorts/");
      // console.log(url.substring(pos+8,));
      setId(youtubeString.substring(pos + 8));
      setInput(true);
    } else if (youtubeString.includes("youtu.be/")){
      let pos = youtubeString.indexOf("youtu.be/");
      setId(youtubeString.substring(pos + 9));
      setInput(true);
    }
    else if (youtubeString == "" && checkRealSubmit == true) {
      setId("");
      setInput(true);
      alert("");
      // code fix Youtube URL Submit push button when URL empty string
    } else if(youtubeString == "" && checkRealSubmit == false){
      setId("");
      setYoutubeString("");
      setInput(false);
      alert("유튜브 URL을 입력해주세요");
    }
    else {
      setId("");
      setYoutubeString("");
      setInput(false);
      alert("인식할 수 없는 URL입니다.");
    }
  };
  // Lee's Youtube URL substring Code END
  const onClearPhotoClick = () => setImgFileString("");
  const onDeleteVideo = () => setVidFileString("");
  const onDeleteYoutubeUrl = () => {
    alert("삭제완료");
    setId("");
    setInput(false);
  };

  const onCheckRealSubmit = () => setCheckRealSubmit(true);
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
                <Form.Input
                  fluid
                  label="내용"
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  placeholder="글의 내용을 입력해주세요."
                  required
                />
              </Form.Field>
              <Grid columns={3}>
                <Grid.Column style={{ width: 160 }}>
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
              {input && (
                <div>
                  <Embed
                    style={{
                      marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 5,
                    }}
                    placeholder={`https://i1.ytimg.com/vi/${id}/sddefault.jpg`}
                    id={id}
                    source="youtube"
                  />

                  <div
                    onClick={onDeleteYoutubeUrl}
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
                  icon="video image"
                />
              </div>
              {vidFileString && (
                <div>
                  <video
                    loop={true}
                    style={{
                      width: 400,
                      marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 5,
                    }}
                    controls={true}
                  >
                    <source src={vidFileString}></source>
                  </video>
                  <div>
                    <Button
                      icon
                      labelPosition="right"
                      color="red"
                      onClick={onDeleteVideo}
                      style={{ marginLeft: 20 }}
                    >
                      영상 삭제
                      <Icon name="delete" />
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={onCheckRealSubmit}
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
            <Grid columns={3}>
              <Grid.Column style={{ width: 160 }}>
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
            {input && (
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
                  onClick={onDeleteYoutubeUrl}
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
                icon="video image"
              />
            </div>
            {vidFileString && (
              <div>
                <video
                  loop={true}
                  style={{
                    width: 400,
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 5,
                  }}
                  controls={true}
                >
                  <source src={vidFileString}></source>
                </video>
                <div>
                  <Button
                    icon
                    labelPosition="right"
                    color="red"
                    onClick={onDeleteVideo}
                    style={{ marginLeft: 20 }}
                  >
                    영상 삭제
                    <Icon name="delete" />
                  </Button>
                </div>
              </div>
            )}

            <Button
              onClick={onCheckRealSubmit}
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

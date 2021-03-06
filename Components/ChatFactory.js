import { authService, dbService, storageService } from "../firebaseConfig";
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
  Embed,
} from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/router";

export default function ChatFactory({ detailbook_chat, genre_chat }) {
  // Submit Files Toggle setOn
  const [submitFile, setSubmitFile] = useState(false);
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
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }
  const collectionName = detailbook_chat
    ? detailbook_chat
    : genre_chat
    ? genre_chat
    : "chat";

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
        .then(() => console.log("????????????"))
        .catch((error) => alert(error));

      setChat("");
      setImgFileString("");
      setVidFileString("");
      setYoutubeString("");
      setId("");
      setInput(false);
      if (genre_chat) {
        alert("?????? ?????????????????????.");
        router.back();
      } else if (detailbook_chat) {
        const url = window.location.href;
        alert("?????? ?????????????????????.");
        router.push(url);
      } else {
        alert("?????? ?????????????????????.");
        router.push("/we");
      }
      setCheckRealSubmit(false);
    } else {
      return;
    }
    setSubmitFile(false);
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
    } else if (youtubeString.includes("youtu.be/")) {
      let pos = youtubeString.indexOf("youtu.be/");
      setId(youtubeString.substring(pos + 9));
      setInput(true);
    } else if (youtubeString == "" && checkRealSubmit == true) {
      setId("");
      setInput(true);
      alert("");
      // code fix Youtube URL Submit push button when URL empty string
    } else if (youtubeString == "" && checkRealSubmit == false) {
      setId("");
      setYoutubeString("");
      setInput(false);
      alert("????????? URL??? ??????????????????");
    } else {
      setId("");
      setYoutubeString("");
      setInput(false);
      alert("????????? ??? ?????? URL?????????.");
    }
  };
  // Lee's Youtube URL substring Code END
  const onClearPhotoClick = () => setImgFileString("");
  const onDeleteVideo = () => setVidFileString("");
  const onDeleteYoutubeUrl = () => {
    alert("????????????");
    setId("");
    setInput(false);
  };

  // submitFile Ontoggle code
  const onSubmitFile = () => {
    setSubmitFile((prev) => !prev);
  };

  const onCheckRealSubmit = () => setCheckRealSubmit(true);
  return (
    <>
      <div>
        {genre_chat ? (
          <>
            <Header as="h2" icon textAlign="center">
              <Icon name="book" circular />
              <Header.Content>??? ??????</Header.Content>
              <p className="genre_chat">???????????? ??????????????????!</p>
            </Header>

            <Container textAlign="left">
              <Form onSubmit={onNewPostSubmit}>
                <Form.Field>
                  <div style={{ textAlign: "right" }}>
                    <Icon
                      name="caret left"
                      style={{ cursor: "pointer" }}
                      onClick={returnClick}
                    ></Icon>
                    <strong style={{ cursor: "pointer" }} onClick={returnClick}>
                      ????????????
                    </strong>
                  </div>
                  <Form.Input
                    fluid
                    label="??????"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="?????? ????????? ??????????????????."
                    required
                  />
                  <Form.TextArea
                    label="??????"
                    value={chat}
                    onChange={(e) => setChat(e.target.value)}
                    placeholder="?????? ????????? ??????????????????."
                    required
                  />
                </Form.Field>
                {submitFile && (
                  <div
                    style={{ height: 35, marginBottom: 10 }}
                    className="ui fluid action input"
                  >
                    <Label
                      basic
                      color="red"
                      pointing="right"
                      htmlFor="attach-file"
                      style={{ width: 130, textAlign: "center" }}
                    >
                      <p className="upload_element">Add Youtube URL</p>
                    </Label>

                    <Form.Field>
                      <Form.Input
                        style={{
                          height: 35,
                          width: 215,
                          marginLeft: 10,
                        }}
                        focus
                        placeholder="Youtube URL??? ??????????????????"
                        value={youtubeString}
                        onChange={(e) => setYoutubeString(e.target.value)}
                      />
                    </Form.Field>
                    <Icon
                      name="search"
                      style={{
                        marginLeft: 10,
                        marginTop: 6,
                        cursor: "pointer",
                      }}
                      size="large"
                      color="violet"
                      onClick={onYoutubeSubmit}
                    />
                  </div>
                )}
                {input && (
                  <div style={{ width: "50%" }}>
                    <Embed
                      style={{
                        marginTop: 10,
                        marginLeft: 20,
                        marginBottom: 5,
                      }}
                      iframe={{
                        allowFullScreen: true,
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
                      <span>Youtube URL ??????</span>
                    </div>
                  </div>
                )}
                {submitFile && (
                  <div>
                    <Label
                      basic
                      color="orange"
                      pointing="right"
                      htmlFor="attach-file"
                    >
                      <p className="upload_element">Add photos</p>
                    </Label>

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                      id="attach-file"
                      icon="file image"
                      style={{ marginLeft: 10, marginBottom: 10 }}
                    />
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
                {submitFile && (
                  <div>
                    <Label
                      basic
                      color="yellow"
                      pointing="right"
                      htmlFor="attach-file"
                    >
                      <p className="upload_element">Add videos</p>
                    </Label>

                    <Input
                      type="file"
                      accept="video/*"
                      onChange={onFileChangeVideo}
                      id="attach-file"
                      icon="video image"
                      style={{ marginLeft: 10 }}
                    />
                  </div>
                )}
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
                    <div
                      onClick={onDeleteVideo}
                      style={{
                        width: 100,
                        height: 30,
                        cursor: "pointer",
                        marginLeft: 20,
                      }}
                    >
                      <Icon color="red" name="remove circle" />
                      <span>????????? ??????</span>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 10 }}>
                  <Button
                    onClick={onCheckRealSubmit}
                    icon
                    labelPosition="right"
                    color="teal"
                    style={{ marginTop: 5 }}
                  >
                    ?????????
                    <Icon name="paper plane" />
                  </Button>
                  <Button
                    onClick={onSubmitFile}
                    icon
                    labelPosition="right"
                    color="blue"
                    style={{ marginTop: 5 }}
                  >
                    ?????? ????????????
                    <Icon name="file" />
                  </Button>
                </div>
              </Form>
            </Container>
          </>
        ) : (
          <>
            <Form onSubmit={onNewPostSubmit}>
              <Form.Field>
                <Label basic color="black" pointing="below">
                  Please enter your text
                </Label>
                <TextArea
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  required
                />
              </Form.Field>
              {submitFile && (
                <div
                  style={{ height: 35, marginBottom: 10 }}
                  className="ui fluid action input"
                >
                  <Label
                    basic
                    color="red"
                    pointing="right"
                    htmlFor="attach-file"
                    style={{ width: 130, textAlign: "center" }}
                  >
                    <p className="upload_element">Add Youtube URL</p>
                  </Label>

                  <Form.Field>
                    <Form.Input
                      style={{
                        height: 35,
                        width: 215,
                        marginLeft: 10,
                      }}
                      focus
                      placeholder="Youtube URL??? ??????????????????"
                      value={youtubeString}
                      onChange={(e) => setYoutubeString(e.target.value)}
                    />
                  </Form.Field>
                  <Icon
                    name="search"
                    style={{ marginLeft: 10, marginTop: 6, cursor: "pointer" }}
                    size="large"
                    color="violet"
                    onClick={onYoutubeSubmit}
                  />
                </div>
              )}
              {input && (
                <div style={{ width: "50%" }}>
                  <Embed
                    style={{
                      marginTop: 10,
                      marginLeft: 20,
                      marginBottom: 5,
                    }}
                    iframe={{
                      allowFullScreen: true,
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
                    <span>Youtube URL ??????</span>
                  </div>
                </div>
              )}
              {submitFile && (
                <div>
                  <Label
                    basic
                    color="orange"
                    pointing="right"
                    htmlFor="attach-file"
                  >
                    <p className="upload_element">Add photos</p>
                  </Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    id="attach-file"
                    icon="file image"
                    style={{ marginLeft: 10, marginBottom: 10 }}
                  />
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
              {submitFile && (
                <div>
                  <Label
                    basic
                    color="yellow"
                    pointing="right"
                    htmlFor="attach-file"
                  >
                    <p className="upload_element">Add videos</p>
                  </Label>

                  <Input
                    type="file"
                    accept="video/*"
                    onChange={onFileChangeVideo}
                    id="attach-file"
                    icon="video image"
                    style={{ marginLeft: 10 }}
                  />
                </div>
              )}
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
                  <div
                    onClick={onDeleteVideo}
                    style={{
                      width: 100,
                      height: 30,
                      cursor: "pointer",
                      marginLeft: 20,
                    }}
                  >
                    <Icon color="red" name="remove circle" />
                    <span>????????? ??????</span>
                  </div>
                </div>
              )}
              <div style={{ marginTop: 10 }}>
                <Button
                  onClick={onCheckRealSubmit}
                  icon
                  labelPosition="right"
                  color="teal"
                  style={{ marginTop: 5 }}
                >
                  ?????????
                  <Icon name="paper plane" />
                </Button>
                <Button
                  onClick={onSubmitFile}
                  icon
                  labelPosition="right"
                  color="blue"
                  style={{ marginTop: 5 }}
                >
                  ?????? ????????????
                  <Icon name="file" />
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
      <style jsx>{`
        .genre_chat {
          font-size: 11px;
          color: grey;
        }

        .upload_element {
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </>
  );
}

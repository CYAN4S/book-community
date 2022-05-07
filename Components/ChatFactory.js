import { authService, dbService, storageService } from "../firebaseConfig";
import { Button, Form, Icon, Input, Label, Segment, TextArea, Image } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ChatFactory({ detailbook_chat }) {
  const [chat, setChat] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");

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
    if (chat === "") {
      return;
    }
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      fileUrl = await getDownloadURL(response.ref);
    }

    const chatObj = {
      text: chat,
      createdAt: Date.now(),
      createrId: userObj.uid,
      fileUrl,
      users: [],
    };
    await addDoc(
      collection(dbService, detailbook_chat ? detailbook_chat : "chat"),
      chatObj
    )
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));

    setChat("");
    setImgFileString("");
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

  const onClearPhotoClick = () => setImgFileString(""); // 위 onFileChange에서 들고온 result을 무효화

  return (
    <div>
      <Form onSubmit={onNewPostSubmit}>
        <Form.Field>
          <Label basic color="orange" pointing = "below">Please enter your text</Label>
          <TextArea
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            required
          />
        </Form.Field>
        <div>
          <Label basic color='orange' pointing='right' htmlFor="attach-file" >
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
                color: 'red',
                onClick : onClearPhotoClick,
                icon: 'remove circle',
                size : "large",
                ribbon: true,
              }}
              src={imgFileString}
              style={{
                backgroundImage: imgFileString,
                width: "40%",
                height: "40%",
                marginTop : 10,
                marginLeft : 20,
              }}
            />
          </div>
        )}
        <Button icon labelPosition='right' color="teal" style={{ marginTop: 15 }}>
          보내기
          <Icon name='right arrow' />
        </Button>
      </Form>
    </div>
  );
}

import { authService, dbService, storageService } from "../firebaseConfig";
import { Button, Form, TextArea } from "semantic-ui-react";
import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ChatFactory() {
  const [chat, setChat] = useState("");
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
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
      nickName: userObj.displayName,
      fileUrl,
    };
    await addDoc(collection(dbService, "chat"), chatObj)
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
          <label>의견남기기</label>
          <TextArea
            value={chat}
            onChange={(e) => setChat(e.target.value)}
            required
          />
        </Form.Field>

        <label htmlFor="attach-file">
          <span>Add photos</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          id="attach-file"
          style={{ marginBottom: 10 }}
        />
        {imgFileString && (
          <>
            <div>
              <img
                src={imgFileString}
                style={{
                  backgroundImage: imgFileString,
                  width: "30%",
                  height: "30%",
                }}
              />

              <div className="span_btn" onClick={onClearPhotoClick}>
                <span>Remove</span>
              </div>
            </div>
            <style jsx>{`
              .span_btn {
                width: 70px;
                height: 25px;
                color: black;
                font-family: "Trebuchet MS", "Lucida Sans Unicode",
                  "Lucida Grande", "Lucida Sans", Arial, sans-serif;
                cursor: pointer;
                text-align: center;
                border-top: 2px solid black;
                border-left: none;
                border-right: none;
                border-bottom: 2px solid black;
                transition: 400ms;
              }

              .span_btn:hover {
                color: white;
                background-color: black;
              }
            `}</style>
          </>
        )}
        <Button color="blue" style={{ marginTop: 15 }}>
          보내기
        </Button>
      </Form>
    </div>
  );
}

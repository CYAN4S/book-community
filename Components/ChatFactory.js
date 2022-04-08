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
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(args),

        });
      } else {
        setUserObj(null);
      }
    });
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    let fileUrl = "";
    if (chat === "") { return }
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, 'data_url');
      fileUrl = await getDownloadURL(response.ref);
    }

    const chatObj = {
      text: chat,
      createdAt: Date.now(),
      createrId: userObj.uid,
      nickName: userObj.displayName,
      date: `${new Date().getFullYear().toString().padStart(2, "0")}/${new Date().getMonth().toString().padStart(2, "0")}/${new Date().getDate().toString().padStart(2, "0")},
           ${new Date().getHours().toString().padStart(2, "0")} : ${new Date().getMinutes().toString().padStart(2, "0")} : ${new Date().getSeconds().toString().padStart(2, "0")}`,
      fileUrl
    }
    await addDoc(collection(dbService, "chat"), chatObj)
      .then(() => {
        console.log("전송완료");
      })
      .catch((error) => {
        alert(error);
      });
    setChat("");
    setImgFileString("");

  }

  const onFileChange = (event) => {
    const { target: { files } } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImgFileString(result);
    }
    if(file){
      reader.readAsDataURL(file);
    }

  }

  const onClearPhotoClick = () => setImgFileString(""); // 위 onFileChange에서 들고온 result을 무효화

  const onChange = (event) => {
    const {
      target: { value }
    } = event; //event로부터 event 안에있는 target의 value를 반환

    setChat(value);
  }


  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>의견남기기</label>
          <TextArea value={chat} onChange={onChange} required />
        </Form.Field>

        <label htmlFor="attach-file">
                <span>Add photos</span>
        </label>
        <input 
            type="file" 
            accept="image/*" 
            onChange={onFileChange}
            id="attach-file"/>
        
        {imgFileString && (
          <>
            <div>
              <img src={imgFileString}
                style={{
                  backgroundImage: imgFileString,
                  width : "30%",
                  height : "30%",
                }} />

              <div onClick={onClearPhotoClick}>
                <span>Remove</span>
              </div>
            </div>
          </>

        )
        }
        <Button color="blue">보내기</Button>
      </Form>
    </div>
  );
}

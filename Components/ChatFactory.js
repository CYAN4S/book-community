import { authService, dbService, storageService } from "../firebaseConfig";
import { Button, Form,  TextArea } from "semantic-ui-react";
import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ChatFactory() {
  const [chat, setChat] = useState(""); 
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        // setUserObj(user);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => updateProfile(args),
        })
      }else{
        setUserObj(null);
      }
    });
  }, [])

  const onSubmit = async(event) =>{
      event.preventDefault();
      if(chat === "") {return}

      const chatObj = {
          text : chat, 
          createdAt : Date.now(),
          createrId : userObj.uid,
          nickName : userObj.displayName
      }
      await addDoc(collection(dbService, "chat"), chatObj)
      .then(() => {
        console.log("전송완료");
      })
      .catch((error) => {
        alert(error);
      });
      setChat("");

  }

  const onChange = (event) => {
    const {
         target : {value}
        } = event; //event로부터 event 안에있는 target의 value를 반환

    setChat(value);
}

  return (
    <div> 
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>의견남기기</label>
                <TextArea value = {chat} onChange = {onChange} />
            </Form.Field>

            <Button color="blue">보내기</Button>
        </Form>
    </div>
  );
}

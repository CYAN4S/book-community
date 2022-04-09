import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
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
import { async } from "@firebase/util";
import toNativeString from "../utils/functions"

export default function Chats({ chat, isOwner }) {
  const [newChat, setNewChat] = useState(chat.text);
  const [username, setUserName] = useState(
    chat.nickName ? chat.nickName : "guest"
  );
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState(chat.date);
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");
  const [imgEdit, setImgEdit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(args),
        });
    }, [])
    const onDeleteClick = async () => {
        const ok = window.confirm("채팅을 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, "chat", `${chat.id}`)).then(() => {
                alert("채팅이 삭제되었습니다!");
            })
                .catch((error) => {
                    alert(error);
                });

            if (chat.fileUrl !== "") {
                await deleteObject(ref(storageService, chat.fileUrl));
            }
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        if(imgEdit){
            const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(fileRef, imgFileString, 'data_url');
            const temp_fileUrl = await getDownloadURL(response.ref);

            updateDoc(doc(dbService, "chat", `${chat.id}`), {
                text: newChat,
                fileUrl : temp_fileUrl
            }).then(() => {
                alert("수정되었습니다!");
            })
                .catch((error) => {
                    alert(error);
                });
        }
        else{
            updateDoc(doc(dbService, "chat", `${chat.id}`), {
                text: newChat,
            }).then(() => {
                alert("수정되었습니다!");
            })
                .catch((error) => {
                    alert(error);
                });
        }
        setImgEdit(false);
        setEditing(false);
        setImgFileString("");
    }
    setImgEdit(false);
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

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
    const toggleEditing = () => setEditing((prev) => !prev);

    const temp_imgDeleteing=()=>{
        if (imgFileString !== "") {
            setImgFileString("");
            setImgEdit(false);
        }
    }

    const imgDeleteing = async() => {
        
        const ok = window.confirm("등록된 이미지를 삭제하시겠습니까? (삭제과정은 되돌릴 수 없습니다.)");
        if (ok) {
            if(chat.fileUrl===""){
                alert("채팅에 올려놓은 이미지가 없습니다.");
            }else{
                await deleteObject(ref(storageService, chat.fileUrl)).then(()=>{
                    updateDoc(doc(dbService, "chat", `${chat.id}`), {
                        text: newChat,
                        fileUrl : "",
                    }).then(alert("삭제되었습니다!")).catch((error) => {
                        alert(error);
                    });
                });
                
            }
        }

        
        
    }
    const onFileChange = async (event) => {
        setImgEdit(true);
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

    return (
        editing ? (
            <>
                <div>
                    <Form onSubmit={onSubmit} >
                        <Form.Field>
                            <TextArea
                                    value={newChat}
                                    type="text"
                                    placeholder="수정하기"
                                    onChange={onChange}
                                    autoFocus
                                    required />
                            {!chat.fileUrl ? <input
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                id="attach-file" 
                            /> : <></>}        
                            
                        </Form.Field>
                        {imgFileString && (
                        <>
                            <div className="temp">
                                <img src={imgFileString}
                                    style={{
                                    backgroundImage: imgFileString,
                                    width : "30%",
                                    height : "30%",
                                    }} />
                                <span className = "downTempImg" onClick = {temp_imgDeleteing}>Del TempImg</span>
                            </div>
                            
                        </>)}
                        {
                            chat.fileUrl ? <div className = "downImg" onClick = {imgDeleteing}>Del Img</div> : <></>
                        }
                        <Button type="submit" value="update"> 수정 완료 </Button>
                    </Form>
                </div>           
                <Button onClick={toggleEditing}>
                        cancel
                </Button>
                <style jsx>{`

                div{
                    margin-bottom : 10px;
                }

                .temp{
                    display : flex;
                }

                .downImg{
                    width : 80px;
                    color : black;
                    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    cursor: pointer;
                    text-align : center;
                    border-top: 2px solid black;
                    border-left: none;
                    border-right: none;
                    border-bottom : 2px solid black;
                    transition : 400ms;
                }  

                .downTempImg{
                    width : 100px;
                    height : 24px;
                    color : black;
                    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                    cursor: pointer;
                    text-align : center;
                    border-top: 2px solid black;
                    border-left: none;
                    border-right: none;
                    border-bottom : 2px solid black;
                    transition : 400ms;
                    margin-left : 10px;
                }  

                .downImg:hover{
                    color : white;
                    background-color: black;
                }   

                .downTempImg:hover{
                    color : white;
                    background-color: black;
                }      
                
                input{
                    margin : 5px auto;
                }

                `}</style>
            </>)
            :
            <>
                <div>
                    <div style={{ marginBottom: 10 }}>
                        {username} : <strong> {chat.text}</strong> <p>[등록시간] {time}</p>
                        {chat.fileUrl &&
                            <img src={chat.fileUrl} style={{ width: "100%", height: "100%" }} />}
                    </div>

                    {isOwner ?
                        <div className="btn_span">
                            <Button onClick={onDeleteClick}>삭제</Button>
                            <Button onClick={toggleEditing}>편집</Button>
                        </div>
                        : <></>
                    }
                </div>
                <style jsx>{`
                    .btn_span{
                        margin-left:10px;
                    }

                    strong{
                        font-size:15px;
                    }                   
                `}</style>
            </>

    );

        strong {
          font-size: 15px;
        }
      `}</style>
    </>
  );
}

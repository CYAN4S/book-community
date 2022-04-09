
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import { v4 } from "uuid";
import { async } from "@firebase/util";

export default function Chats({ chat, isOwner }) {

    const [newChat, setNewChat] = useState(chat.text);
    const [username, setUserName] = useState(chat.nickName ? chat.nickName : "guest");
    const [editing, setEditing] = useState(false);
    const [time, setTime] = useState(chat.date);
    const [userObj, setUserObj] = useState(null);
    const [imgFileString, setImgFileString] = useState("");
    const [imgEdit,setImgEdit] = useState(false);

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
    }, [])

    const onDeleteClick = async () => {
        const ok = window.confirm("채팅을 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, "chat", `${chat.id}`));
            if (chat.fileUrl !== "") {
                deleteObject(ref(storageService, chat.fileUrl));
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
        }else{
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

        

    }

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewChat(value);
    }


    const toggleEditing = () => setEditing((prev) => !prev);

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
            <div>
                <form onSubmit={onSubmit} >
                    <input
                        value={newChat}
                        type="text"
                        placeholder="수정하기"
                        onChange={onChange}
                        autoFocus
                        required />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        id="attach-file" />
                    <Button type="submit" value="update"> 수정 완료 </Button>
                </form>
                <Button onClick={toggleEditing}>
                    cancel
                </Button>
            </div>)
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

}


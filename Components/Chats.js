
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";

export default function Chats({ chat, isOwner }) {

    const [newChat, setNewChat] = useState(chat.text);
    const [username,setUserName] = useState(chat.nickName ? chat.nickName : "guest");
    const [editing, setEditing] = useState(false);

    const onDeleteClick = async() =>{
        const ok = window.confirm("채팅을 삭제하시겠습니까?");
        if(ok){
            await deleteDoc(doc(dbService, "chat", `${chat.id}`));            
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        updateDoc(doc(dbService, "chat", `${chat.id}`),{
            text : newChat
        }).then(() => {
            alert("수정되었습니다!");
          })
          .catch((error) => {
            alert(error);
          });
        setEditing(false);

    }

    const onChange = (event) =>{
        const {
            target : {value}
        } = event;
        setNewChat(value);
    }


    const toggleEditing = () => setEditing((prev) => !prev);

        return (
            editing ? (
                <div>
                    <form onSubmit={onSubmit} > 
                        <input 
                            value = {newChat} 
                            type = "text"
                            placeholder="수정하기"
                            onChange={onChange}
                            autoFocus
                            required/>

                        <Button type = "submit" value="update"> 수정 완료 </Button>
                    </form> 
                    <Button onClick = {toggleEditing}>
                        cancel
                    </Button>
                </div>)
                :
            <div>
                <div>
                {username} : <strong> {chat.text}</strong>
                    {isOwner ? 
                    <span className="btn_span">
                        <Button onClick={onDeleteClick}>삭제</Button>
                        <Button onClick={toggleEditing}>편집</Button>
                    </span>
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
            </div>
            
        );

}


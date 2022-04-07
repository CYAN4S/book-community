
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { authService, dbService } from "../firebaseConfig";

export default function Chats({ chat }) {

    const newChat = chat.text;
    const username = chat.nickName ? chat.nickName : "guest";
    

        return (
            <div>
                {username} : {newChat}
            </div>
        );

}


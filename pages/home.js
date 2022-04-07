import Head from "next/head";
import { authService, dbService } from "../firebaseConfig";
import { useRouter } from "next/router";
import { Button, Divider} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { async } from "@firebase/util";

export default function Book_home() {
  const router = useRouter();

  const [chats, SetChats] = useState([]);

  function onLogOutClick() {
    authService.signOut();
    router.push("/");
  }

  const q = query(collection(dbService, "chat"),orderBy("createdAt","desc"));
  useEffect(()=>{

    onSnapshot(q,snapshot =>{
        const chatArray = snapshot.docs.map((doc) => ({
            id : doc.id,
            ...doc.data(),
        }));

        SetChats(chatArray);
        // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
    })
},[])

  
  return (
    <div>
      <Head>
        <title>Home pages</title>
      </Head>
      <div>
        <ChatFactory/>
        <Divider/>
        <div>
        {chats.map((chat)=>(
          <Chats chat={chat} key = {chat.id}/>
        ))}
                
        </div>
        <Button onClick={onLogOutClick}> Logout </Button>
      </div>
    </div>
  );
}

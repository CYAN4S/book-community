import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Popup,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "../../firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";

import CardChats from "../../Components/CardChats";

export default function PostArea({ representative_KDC_Name, detail_KDC_Name }) {
  const router = useRouter();

  // 서버의 현재시간을 담을 state
  const [time, setTime] = useState(0);

  // chat data, userId
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  const collectionName = `genre_chat_${representative_KDC_Name}_${detail_KDC_Name}`;

  // 뒤로가기 버튼 click event
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  useEffect(() => {
    // 서버 현재시간
    setTime(new Date().getTime());
  }, []);

  const q = query(
    collection(dbService, collectionName),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChats(chatArray);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);

  return (
    <>
      <Message
        info
        header={`선택된 대표 장르는 "${representative_KDC_Name}" 입니다.`}
        content={`선택된 세부 장르는 "${detail_KDC_Name}" 입니다.`}
      />

      <Message warning>
        <Message.Header>혹시 다른 장르를 선택하시고 싶으신가요?</Message.Header>
        <p>돌아가시려면 버튼을 클릭해주세요!</p>
        <Button
          content="돌아가기"
          icon="undo"
          labelPosition="left"
          onClick={returnClick}
          inverted
          color="black"
        />
      </Message>

      <Divider horizontal style={{ marginTop: 20 }}>
        <Header as="h4">
          <Icon name="clipboard" />
          게시된 글
        </Header>
      </Divider>

      <Button.Group basic size="small" right>
        <Link href={`./${collectionName}`}>
          <Button icon="pencil alternate" content="글 작성하기" />
        </Link>
        <Button icon="redo" content="새로고침" />
        <Button icon="comment alternate outline" content="문의하기" />
        <Button icon="question" content="도움말" />
      </Button.Group>

      {/* 게시글 */}

      {chats.length ? (
        chats.map((chat) => (
          <div key={chat.id} style={{ marginBottom: 30 }}>
            <CardChats chat={chat} id = {chat.id}
                isOwner={chat.createrId === userId}
                genre_chat={collectionName}/>
                
            
          </div>
        ))
      ) : (
        <p>채팅목록이 없습니다</p>
      )}
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  let [representative_KDC_Element, detail_KDC_Element] = params;

  return {
    props: {
      representative_KDC_Name: representative_KDC_Element,
      detail_KDC_Name: detail_KDC_Element,
    },
  };
}

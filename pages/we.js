import { authService, dbService } from "../firebaseConfig";

import { Divider, Header, Icon,Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { onAuthStateChanged } from "firebase/auth";
import withTransition from "../public/HOC/withTransition";

function Book_home() {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setUserId(user.uid);
    }
  });

  const q = query(collection(dbService, "chat"), orderBy("createdAt", "desc"));
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

  const onLookEntire = () => {

  };
  const onLookMine = () => {

  };
  const onLookSubscriber = () => {

  };
  return (
    <>
      <div style={{marginLeft : 5}}>
        <Header>
          <title>Home pages</title>

        </Header>
        <div style={{height:30}}>
         
        </div>
        <div>
          <Header as="h2" style={{ marginTop: -40 }}>
            <Icon name="chat" />
            <Header.Content>
              의견남기기
              <Header.Subheader>다른 사용자와 대화해보세요!</Header.Subheader>
            </Header.Content>
          </Header>
          <ChatFactory />

          <Divider />

          <Header as="h2">
            <Icon name="wechat" />
            <Header.Content>
              올라온 채팅
              <Header.Subheader>
                다른 사용자의 채팅을 볼 수 있어요!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Button inverted color="violet" onClick={onLookEntire}>
            전체 글
          </Button>
          <Button inverted color="pink" onClick={onLookMine}>
            나의 글
          </Button>
          <Button inverted color="green" onClick={onLookSubscriber}>
            구독자 글
          </Button>
          <Divider/>
          <div style={{ marginTop: 30 }}>
            {chats.length ? (
              chats.map((chat) => (
                <div key={chat.id} style={{ marginBottom: 30 }}>
                  <Chats chat={chat} isOwner={chat.createrId === userId} />
                </div>
              ))
            ) : (
              <p>채팅목록이 없습니다</p>
            )}
          </div>
          <Divider />
        </div>

      </div>
    </>
  );
}

export default withTransition(Book_home);
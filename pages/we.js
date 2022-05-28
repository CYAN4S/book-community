import { authService, dbService } from "../firebaseConfig";

import { Divider, Header, Icon, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ChatFactory from "../Components/ChatFactory";
import Chats from "../Components/Chats";
import { onAuthStateChanged } from "firebase/auth";
import withTransition from "../public/HOC/withTransition";
import { onUserDocSnapshot, getUserDoc } from "../utils/functions";

function Book_home() {
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");
  // 0527_1845 전체 글 / 나의 글 / 구독자 글 필터링 버튼 관련 코드 start
  const [exist, setExist] = useState(false);
  const [entire, setEntire] = useState(false);
  const [mine, setMine] = useState(false);
  const [subscriber, setSubscriber] = useState(false);

  const [subscribers, setSubscribers] = useState([]);
  const [Articles, setArticles] = useState([]);

  const onUser = async (data) => {
    if (data?.users) {
      // 구독자 글 있는지 확인
      const x = await Promise.all(
        data.users.map(async (userId) => await getUserDoc(userId))
      );
      const y = x.map((y) => y.uid);
      setSubscribers(y);
    } else {
      setSubscribers([]);
    }
  };
  useEffect(() => {
   

    const unsub = onUserDocSnapshot(userId, onUser);
    return () => unsub?.();
    
  }, [userId]);
  // 0527_1845 전체 글 / 나의 글 / 구독자 글 필터링 버튼 관련 코드 end
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
      const y = chatArray.map((y) => y.createrId);
      setArticles(y);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인.
    });
  }, []);

  // const onLookEntire = () => {
  //   setLookEntire(true);
  //   console.log("onLookEntire 실행")
  //   console.log("LookEntire",LookEntire);
  //   console.log("LookMine",LookMine)
  //   console.log("LookSubscriber",LookSubscriber)
  // };
  // const onLookMine = () => {
  //   setLookEntire(false);
  //   console.log("onLookMine 실행")
  //   console.log("LookEntire",LookEntire);
  //   console.log("LookMine",LookMine)
  //   console.log("LookSubscriber",LookSubscriber)
    
  // };
  // const onLookSubscriber = () => {
  //   setLookEntire(false); 
  //   console.log("onLookSubscriber실행")
  //   console.log("LookEntire",LookEntire);
  //   console.log("LookMine",LookMine)
  //   console.log("LookSubscriber",LookSubscriber)
  // };
  const toggleExist = () => {
    setEntire(false);
    setMine(false);
    setSubscriber(false);
  };
  const toggleEntire = () => {
    setEntire(true);
    setMine(false);
    setSubscriber(false);
  };

  const toggleMine= () => {
    setEntire(false);
    setMine(true);
    setSubscriber(false);
  };

  const toggleSubscriber = () => {
    setEntire(false);
    setMine(false);
    setSubscriber(true);
  };
  return (
    <>
      <div style={{ marginLeft: 5 }}>
        <Header>
          <title>Home pages</title>
        </Header>
        <div style={{ height: 30 }}></div>
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
          <Button inverted color="violet" onClick={toggleEntire}>
            전체 글
          </Button>
          <Button inverted color="pink" onClick={toggleMine}>
            나의 글
          </Button>
          <Button inverted color="green" onClick={toggleSubscriber}>
            구독자 글
          </Button>
          <Divider />
          <div style={{ marginTop: 30 }}>
            {entire && (
              <>
                {chats.length ? (
                  chats.map((chat) => (
                    <div key={chat.id} style={{ marginBottom: 30 }}>
                      <Chats chat={chat} isOwner={chat.createrId === userId} />
                    </div>
                  ))
                ) : (
                  <p>채팅목록이 없습니다</p>
                )}
              </>
            )}
            {mine&& (
              <>
              {chats.length ? (
                chats.map((chat) => (
                  <div key={chat.id} style={{ marginBottom: 30 }}>
                    {Articles.includes(userId) ? (
                      <Chats
                        chat={chat}
                        isOwner={chat.createrId === userId}
                      />
                    ) : (<></>
                    )}
                  </div>
                ))
              ) : (
                <p>채팅목록이 없습니다</p>
              )}
            </>
            )}
            {subscriber && (
              <>
                {chats.length ? (
                  chats.map((chat) => (
                    <div key={chat.id} style={{ marginBottom: 30 }}>
                      {subscribers.includes(chat.createrId) ? (
                        <Chats
                          chat={chat}
                          isOwner={chat.createrId === userId}
                        />
                      ) : (<></>
                      )}
                    </div>
                  ))
                ) : (
                  <p>채팅목록이 없습니다</p>
                )}
              </>
            )} 
          </div>
          <Divider />
        </div>
      </div>
    </>
  );
}

export default withTransition(Book_home);

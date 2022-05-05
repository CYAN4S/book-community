import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Label,
  List,
  Radio,
} from "semantic-ui-react";
import { Image, Segment } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { decode } from "he";
import { useState, useEffect } from "react";
import ChatFactory from "../../../Components/ChatFactory";
import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "../../../firebaseConfig";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import Chats from "../../../Components/Chats";

export default function Title({ books }) {
  const {
    title,
    image,
    author,
    price,
    discount,
    publisher,
    pubdate,
    isbn,
    description,
  } = books.items[0];

  const collectionName = `chat${isbn}`;
  const [isChecked, setIsChecked] = useState(false);
  const [checkItems, setCheckItems] = useState(new Set());
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  // registerBook Check
  const [wasRegisterBookCheck, setWasRegisterBookCheck] = useState(false);
  const [currentIsbn, setCurrentIsbn] = useState("");

  const regionData = [
    { id: 11, name: "서울" },
    { id: 21, name: "부산" },
    { id: 22, name: "대구" },
    { id: 23, name: "인천" },
    { id: 24, name: "광주" },
    { id: 25, name: "대전" },
    { id: 26, name: "울산" },
    { id: 29, name: "세종" },
    { id: 31, name: "경기" },
    { id: 32, name: "강원" },
    { id: 33, name: "충북" },
    { id: 34, name: "충남" },
    { id: 35, name: "전북" },
    { id: 36, name: "전남" },
    { id: 37, name: "경북" },
    { id: 38, name: "경남" },
    { id: 39, name: "제주" },
  ];
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState("");
  onAuthStateChanged(authService, (user) => {
    if (user) {
      setCurrentUid(user.uid); // profile 복붙
      setIsSignedIn(true); // profile 복붙
      setUserId(user.uid);
      setCurrentIsbn(isbn);
    }
    // 추가
    else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatArray);
      // dbservice를 이용해 sweets 컬렉션의 변화를 실시간으로 확인. 변화발생 때 마다 console.log
    });
  }, []);

  const q = query(
    collection(dbService, `chat${isbn}`),
    orderBy("createdAt", "desc")
  );

  const router = useRouter();

  // 내 책으로 등록하기 기능 코드 시작 부분
  const [isSignedIn, setIsSignedIn] = useState(false);
  const queryId = router.query.id;
  const [currentUid, setCurrentUid] = useState("");
  const isMe = () => currentUid == queryId;
  const getDocAndCheck = async () => {
    if (isSignedIn) {
      checkRegisterBook(currentUid);
    }
  };
  const getUserDoc = async (uid) => {
    const docRef = doc(dbService, "profile", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else return null;
  };
  const updateUserDoc = (newData) => {
    return setDoc(doc(dbService, "profile", currentUid), newData, {
      merge: true,
    });
  };
  useEffect(() => {
    if (isSignedIn) {
      getDocAndCheck();
    }
  }, [isSignedIn]);

  const checkRegisterBook = async (uid) => {
    const doc = await getUserDoc(uid);
    const isRegisterBook = !!doc.mybooks?.includes(isbn);
    setWasRegisterBookCheck(isRegisterBook);
  };

  const onRegisterClick = async (e) => {
    e.preventDefault();
    const doc = await getUserDoc(currentUid);
    const registeredMybook = !!doc.mybooks?.includes(isbn);

    if (registeredMybook) {
      updateUserDoc({ mybooks: doc.mybooks.filter((id) => id != isbn) });

      setWasRegisterBookCheck(false);
    } else {
      updateUserDoc({
        mybooks: doc.mybooks ? [...doc.mybooks, isbn] : [isbn],
      });
      setWasRegisterBookCheck(true);
    }
  };
  // 내 책으로 등록하기 기능 소스코드 끝 부분

  function onClick(e) {
    e.preventDefault();
    router.back();
  }

  const checkHandler = ({ target }, id, name) => {
    setIsChecked(!isChecked);
    checkItemHandler(target.parentNode, target.value, target.checked);
    setId(id);
    setName(name);
  };

  const checkItemHandler = (box, id, isChecked) => {
    if (isChecked) {
      checkItems.add(id);
      setCheckItems(checkItems);
    } else if (!isChecked && checkItems.has(id)) {
      checkItems.delete(id);
      setCheckItems(checkItems);
    }
    return checkItems;
  };

  const changeRegion = () => {
    router.reload(window.location.pathname);
  };

  return (
    <>
      <>
        <div class="ui center aligned container">
          <Grid style={{}} columns={3}>
            <Grid.Row>
              <div
                style={{
                  marginBottom: 20,
                  marginLeft: 15,
                  width: 600,
                  height: 270,
                }}
                class="ui two column grid ui center aligned basicsegments"
              >
                <Grid.Column>
                  <div
                    style={{ width: 210, height: 240 }}
                    class="ui orange segment"
                  >
                    <img
                      style={{
                        width: 180,
                        height: 210,
                      }}
                      src={image}
                      alt="DON'T HAVE IMAGE"
                      className="img_book"
                    />
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div
                    style={{ width: 330, height: 240, marginLeft: -50 }}
                    class="ui orange segment"
                  >
                    <Header as="h3" style={{}} color="blue">
                      책 정보
                    </Header>

                    <div>
                      <List divided Vertical>
                        <List.Item>
                          <div style={{ fontSize: 16 }}>
                            <strong className="book_item"> {title} </strong>
                          </div>
                        </List.Item>

                        <List.Item>
                          <strong>출판사</strong> {publisher}
                        </List.Item>
                        <List.Item>
                          <strong>출간일</strong> {pubdate}
                        </List.Item>
                        <List.Item>
                          <strong>작가</strong> {author}
                        </List.Item>
                        <List.Item>
                          <strong className="num_price">
                            {new Intl.NumberFormat("ko", {
                              style: "currency",
                              currency: "KRW",
                            }).format(price)}
                          </strong>
                        </List.Item>
                        <List.Item>
                          {!isMe() && (
                            <Button
                              style={{ marginTop: 10 }}
                              basic
                              color="orange"
                              onClick={onRegisterClick}
                            >
                              {wasRegisterBookCheck
                                ? "등록 해제"
                                : "내 책으로 등록하기"}
                            </Button>
                          )}
                          <Button
                            basic
                            color="black"
                            onClick={onClick}
                            style={{}}
                          >
                            뒤로 돌아가기
                          </Button>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                </Grid.Column>
              </div>

              <Grid.Column>
                <div
                  style={{
                    width: 600,
                    height: 270,
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                  class="ui basic segment"
                >
                  <div
                    style={{ height: 240, marginLeft: 5 }}
                    class="ui orange segment"
                  >
                    <Header
                      style={{ textAlign: "center" }}
                      as="h2"
                      color="blue"
                    >
                      Description
                    </Header>

                    <p style={{ paddingBottom: 20, fontSize: 15 }}>
                      {decode(description)}
                    </p>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div class="ui center aligned container">
          <Grid style={{ marginTop: -10 }} columns={3}>
            <Grid.Row>
              <div
                style={{
                  width: 600,
                  height: 350,
                  marginLeft: 25,
                }}
                class="ui basic segment"
              >
                <Grid.Column>
                  <div
                    style={{
                      height: 260,
                    }}
                    class="ui red segment"
                  >
                    <div>
                      {checkItems.size ? (
                        <div style={{ textAlign: "center", marginBottom: 10 }}>
                          <strong style={{ marginRight: 10 }}>
                            {`"${name}"`} 선택되었습니다.
                          </strong>
                          <Icon
                            name="undo"
                            onClick={changeRegion}
                            color="red"
                            style={{ cursor: "pointer" }}
                          ></Icon>

                          <Link href={`../naru/${isbn}/${id}`}>
                            <a>
                              <Header
                                as="h3"
                                style={{ paddingTop: 20, marginBottom: 0 }}
                                color="blue"
                              >
                                <Button color="teal">
                                  소장도서관 확인하기
                                </Button>
                              </Header>
                            </a>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <Header
                            as="h3"
                            style={{ height: 30, textAlign: "center" }}
                            color="blue"
                          >
                            어디에 있을까?
                          </Header>
                          <Grid columns={3}>
                            <Grid.Row>
                              {regionData.map((item) => {
                                return (
                                  <Grid.Column
                                    key={item.id}
                                    style={{ marginBottom: 12 }}
                                  >
                                    <div>
                                      <label
                                        key={item.id}
                                        style={{ fontSize: 17 }}
                                      >
                                        <Input
                                          type="checkbox"
                                          value={item.name}
                                          onChange={(e) =>
                                            checkHandler(e, item.id, item.name)
                                          }
                                        />
                                        <strong style={{ marginLeft: 5 }}>
                                          {item.name}
                                        </strong>
                                      </label>
                                    </div>
                                  </Grid.Column>
                                );
                              })}
                            </Grid.Row>
                          </Grid>
                        </>
                      )}
                    </div>
                  </div>
                </Grid.Column>
              </div>
              <Grid.Column>
                <div
                  style={{
                    width: 600,
                    height: 350,
                  }}
                  class="ui basic segment"
                >
                  <div
                    style={{
                      height: 260,
                    }}
                    class="ui red segment"
                  >
                    <Header
                      as="h3"
                      style={{ textAlign: "center", marginBottom: 20 }}
                      color="blue"
                    >
                      이 책에 대한 다른 사용자의 의견
                    </Header>

                    <div
                      style={{ overflow: "auto", height: 200, maxHeight: 220 }}
                    >
                      {chats.length ? (
                        chats.map((chat) => (
                          <div className="chat_space" key={chat.id}>
                            <Chats
                              chat={chat}
                              isOwner={chat.createrId === userId}
                              detailbook_chat={collectionName}
                            />
                          </div>
                        ))
                      ) : (
                        <p>채팅목록이 없습니다</p>
                      )}
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>

      {/* <Divider inverted style={{ marginTop: 40 }} /> */}
      <div class="ui center aligned container">
        <div
          style={{ marginTop: -70, width: 570, marginLeft: 20, height: 320 }}
          class="ui purple segment"
        >
          <Header as="h3" style={{ textAlign: "center" }} color="blue">
            생각 공유하기
          </Header>
          <div style={{ overflow: "auto", height: 260, maxHeight: 290 }}>
            <ChatFactory detailbook_chat={collectionName} />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(props) {
  const title = props.query.title;
  const res = await fetch(
    "https://openapi.naver.com/v1/search/book.json?query=" + title,
    {
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_SECRET,
      },
    }
  );

  const books = await res.json();

  books.items.title = books.items.map((book) => {
    book.title = book.title.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  books.items.description = books.items.map((book) => {
    book.description = book.description.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  books.items.author = books.items.map((book) => {
    book.author = book.author.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  books.items.publisher = books.items.map((book) => {
    book.publisher = book.publisher.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
  });

  return {
    props: {
      books,
    },
  };
}

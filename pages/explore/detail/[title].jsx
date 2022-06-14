import {
  Item,
  Table,
  Button,
  Container,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  List,
  Loader,
  Segment,
} from "semantic-ui-react";
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

export default function Title({ books, recommended }) {
  const router = useRouter();

  const { title, image, author, price, publisher, pubdate, isbn, description } =
    books.items[0];

  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (title === "error") {
      setTitleError(true);
      alert("책 정보를 받아올 수 없습니다.");
      router.back();
    } else {
      console.log(recommended);
    }
  }, []);

  // 06132123 추가
  const [lens, setLens] = useState(0);

  const [filter, setFilter] = useState(true);

  const mlBooks = [...recommended];
  mlBooks.sort((a, b) => b.pubdate - a.pubdate);

  // 로딩을 위한 state
  const [loading, setLoading] = useState(false);

  const collectionName = `chat${isbn}`;
  const [isChecked, setIsChecked] = useState(false);
  const [checkItems, setCheckItems] = useState(new Set());
  const [id, setId] = useState(0);
  const [name, setName] = useState("");

  // registerBook Check
  const [wasRegisterBookCheck, setWasRegisterBookCheck] = useState(false);
  const [currentIsbn, setCurrentIsbn] = useState("");

  // region classification code
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

  // Save chat details
  const [chats, setChats] = useState([]);
  // Save userID
  const [userId, setUserId] = useState("");

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setCurrentUid(user.uid);
      setIsSignedIn(true);
      setUserId(user.uid);
      setCurrentIsbn(isbn);
    } else {
      setIsSignedIn(false);
    }
  });

  // 06132125

  useEffect(() => {
    setLoading(true);
    setLens(recommended.length);
    console.log(lens);
  }, []);
  // DB Real-time change check
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const chatArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatArray);
    });

    setLoading(true);
  }, []);

  // Detail book page chatting query
  const q = query(
    collection(dbService, `chat${isbn}`),
    orderBy("createdAt", "desc")
  );

  // 0523_0923 책 검색 History 저장 code START
  const searchHistoryBook = async () => {
    const doc = await getUserDoc(currentUid);
    //const searchedMybook = !!doc.mySearchBooks?.includes(`${isbn}${title}`);
    // if (!searchedMybook) {
    if (!titleError) {
      updateUserDoc({
        mySearchBooks: doc.mySearchBooks
          ? [...doc.mySearchBooks, `${isbn}${title}`]
          : [`${isbn}${title}`],
      });
    }
    // }
  };
  // 0523_0923 책 검색 History 저장 code END

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
    } else return 0;
  };
  const updateUserDoc = (newData) => {
    return setDoc(doc(dbService, "profile", currentUid), newData, {
      merge: true,
    });
  };
  useEffect(() => {
    if (isSignedIn) {
      // 0523_0923추가
      searchHistoryBook();
      getDocAndCheck();
    }
  }, [isSignedIn]);

  const checkRegisterBook = async (uid) => {
    const doc = await getUserDoc(uid);
    const isRegisterBook = !!doc.myBooks?.includes(`${isbn}${title}`);
    setWasRegisterBookCheck(isRegisterBook);
  };

  const onRegisterClick = async (e) => {
    e.preventDefault();
    const doc = await getUserDoc(currentUid);
    const registeredMybook = !!doc.myBooks?.includes(`${isbn}${title}`);

    if (registeredMybook) {
      updateUserDoc({
        myBooks: doc.myBooks.filter((id) => id != `${isbn}${title}`),
      });

      setWasRegisterBookCheck(false);
    } else {
      updateUserDoc({
        myBooks: doc.myBooks
          ? [...doc.myBooks, `${isbn}${title}`]
          : [`${isbn}${title}`],
      });
      setWasRegisterBookCheck(true);
    }
  };
  // 내 책으로 등록하기 기능 소스코드 끝 부분

  function returnClick(e) {
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
      {!loading ? (
        <>
          <Segment style={{ height: "100vh" }}>
            <Dimmer active>
              <Loader size="massive">Loading</Loader>
            </Dimmer>
          </Segment>
        </>
      ) : (
        <>
          <Container textAlign="centered">
            <div className="ui center aligned container">
              <Grid columns={3}>
                <Grid.Row>
                  <div
                    style={{
                      marginBottom: 20,
                      marginLeft: 5,
                      width: 600,
                      height: 270,
                    }}
                    className="ui two column grid ui center aligned basicsegments"
                  >
                    <Grid.Column>
                      <div
                        style={{ width: 210, height: 240 }}
                        className="ui orange segment"
                      >
                        <img
                          style={{ width: 110, height: 160 }}
                          src={image}
                          alt="DON'T HAVE IMAGE"
                          className="img_book"
                        />

                        {!isMe() && (
                          <span>
                            <Button
                              size="mini"
                              basic
                              color="orange"
                              onClick={onRegisterClick}
                            >
                              {wasRegisterBookCheck
                                ? "등록 해제"
                                : "내 책으로 등록하기"}
                            </Button>
                            <p
                              onClick={returnClick}
                              style={{
                                marginTop: 6,
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              <Icon name="undo" /> 돌아가기
                            </p>
                          </span>
                        )}
                      </div>
                    </Grid.Column>

                    <Grid.Column>
                      <div
                        style={{ width: 330, height: 240, marginLeft: -50 }}
                        className="ui orange segment"
                      >
                        <Header
                          as="h3"
                          color="blue"
                          style={{ marginTop: 5, marginBottom: 5 }}
                        >
                          책 정보
                        </Header>

                        <div>
                          <List divided vertical>
                            <List.Item>
                              <div style={{ fontSize: 13, margin: "5px 0px" }}>
                                <strong className="book_item">
                                  {title?.length > 140
                                    ? `${title.substring(0, 140)}...`
                                    : title}{" "}
                                </strong>
                              </div>
                            </List.Item>

                            <List.Item
                              style={{
                                height: 30,
                                lineHeight: "25px",
                                fontSize: 12,
                              }}
                            >
                              <strong>출판사</strong>{" "}
                              {publisher?.length > 60
                                ? `${publisher.substring(0, 60)}...`
                                : publisher}
                            </List.Item>
                            <List.Item
                              style={{
                                height: 30,
                                lineHeight: "25px",
                                fontSize: 12,
                              }}
                            >
                              <strong>출간일</strong> {pubdate}
                            </List.Item>
                            <List.Item
                              style={{
                                height: 30,
                                lineHeight: "25px",
                                fontSize: 12,
                              }}
                            >
                              <strong>작가</strong>{" "}
                              {author?.length > 50
                                ? `${author.substring(0, 50)}...`
                                : author}
                            </List.Item>
                            <List.Item
                              style={{
                                height: 30,
                                lineHeight: "25px",
                                fontSize: 12,
                              }}
                            >
                              <strong className="num_price">
                                {new Intl.NumberFormat("ko", {
                                  style: "currency",
                                  currency: "KRW",
                                }).format(price)}
                              </strong>
                            </List.Item>
                          </List>
                        </div>
                      </div>
                    </Grid.Column>
                  </div>

                  <Grid.Column>
                    <div
                      style={{
                        width: 587,
                        height: 270,
                        marginLeft: 10,
                        marginRight: 20,
                      }}
                      className="ui basic segment"
                    >
                      <div
                        style={{ height: 240, marginLeft: -5 }}
                        className="ui orange segment"
                      >
                        <Header
                          style={{ textAlign: "center" }}
                          as="h2"
                          color="blue"
                        >
                          Description
                        </Header>

                        <p
                          style={{
                            marginTop: 25,
                            paddingBottom: 20,
                            fontSize: 15,
                            lineHeight: 1.9,
                          }}
                        >
                          {decode(description).length > 200
                            ? `${decode(description).substring(0, 200)}...`
                            : decode(description)}
                        </p>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <Container>
              <div>
                {lens ? (
                  <>
                    <div
                      style={{
                        marginBottom: 20,
                        marginLeft: 20,
                        width: 1160,
                        height: 290,
                        overflow: "auto",
                        maxHeight: 300,
                      }}
                      // style ={{display: "flex",
                      //           justifyContent: "center",}}
                      className="ui orange segment center aligned"
                    >
                      <>
                        <Header
                          as="h3"
                          style={{
                            height: 50,
                            textAlign: "center",
                            marginBottom: -50,
                          }}
                          color="blue"
                        >
                          함께 알아보면 좋은 책들
                        </Header>
                        <Item.Group>
                          <Grid columns={4}>
                            <Grid.Row>
                              {mlBooks.map((book) => (
                                <Grid.Column key={book.title}>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginBottom: 20,
                                      height: 215,
                                    }}
                                    className="ui segment"
                                  >
                                    <Item key={book.isbn}>
                                      <Link
                                        href={`./${book.title
                                          .replace(
                                            /%(?![0-9][0-9a-fA-F]+)/g,
                                            "%25"
                                          )
                                          .replace(
                                            /\/(?![0-9][0-9a-fA-F]+)/g,
                                            "%2F"
                                          )}`}
                                      >
                                        <a>
                                          <Item.Image
                                            style={{
                                              width: 80,
                                              height: 120,
                                              marginRight: 15,
                                              marginBottom: 10,
                                              display: "block",

                                              margin: "auto",
                                            }}
                                            //size = "medium"
                                            src={book.image}
                                            alt="DON'T HAVE IMAGE"
                                            className="img_book"
                                          />
                                        </a>
                                      </Link>

                                      <Item.Content>
                                        <Link
                                          href={`./${book.title
                                            .replace(
                                              /%(?![0-9][0-9a-fA-F]+)/g,
                                              "%25"
                                            )
                                            .replace(
                                              /\/(?![0-9][0-9a-fA-F]+)/g,
                                              "%2F"
                                            )}`}
                                        >
                                          <Item.Header as="a">
                                            {book.title.length < 37
                                              ? book.title
                                              : book.title.slice(0, 38) + "..."}
                                          </Item.Header>
                                        </Link>
                                        <Item.Description>
                                          <p>출판일: {book.pubdate}</p>
                                        </Item.Description>
                                      </Item.Content>
                                    </Item>
                                  </div>
                                </Grid.Column>
                              ))}
                            </Grid.Row>
                          </Grid>
                        </Item.Group>
                      </>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        padding: "200px 0",
                        textAlign: "center",
                        fontSize: "35px",
                      }}
                    >
                      <p
                        style={{ fontSize: 23, fontFamily: "GothicA1-Medium" }}
                      >
                        <Icon name="warning circle" color="red" />
                        검색결과가 존재하지 않습니다.
                      </p>

                      <Link href={`/explore`}>
                        <Button color="black">돌아가기</Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </Container>
            <div className="ui aligned container" style={{ marginTop: -10 }}>
              <Grid style={{ marginTop: -10, marginLeft: -20 }} columns={3}>
                <Grid.Row>
                  <div
                    style={{
                      width: 590,
                      height: 380,
                      marginLeft: 25,
                      marginRight: -20,
                    }}
                    className="ui basic segment"
                  >
                    <Grid.Column>
                      <div
                        style={{ width: 565, height: 290 }}
                        className="ui red segment"
                      >
                        <div>
                          {checkItems.size ? (
                            <div
                              style={{
                                textAlign: "center",
                                marginBottom: 10,
                                marginTop: 70,
                              }}
                            >
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
                                style={{ height: 50, textAlign: "center" }}
                                color="blue"
                              >
                                어디에 있을까?
                              </Header>
                              <Grid columns={3} style={{ textAlign: "center" }}>
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
                                                checkHandler(
                                                  e,
                                                  item.id,
                                                  item.name
                                                )
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
                  <Grid.Column style={{ marginLeft: 10 }}>
                    <div
                      style={{
                        width: 590,
                        height: 380,
                      }}
                      className="ui basic segment"
                    >
                      <div
                        style={{
                          height: 290,
                          overflow: "auto",
                          maxHeight: 300,
                        }}
                        className="ui red segment"
                      >
                        <Header
                          as="h3"
                          style={{ textAlign: "center" }}
                          color="blue"
                        >
                          생각 공유하기
                        </Header>
                        <div>
                          <ChatFactory detailbook_chat={collectionName} />
                        </div>
                      </div>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Container>

          {/* <Divider inverted style={{ marginTop: 40 }} /> */}
          <div
            style={{ marginTop: -70 }}
            className="ui center aligned container"
          >
            <Divider horizontal>
              <Header as="h3" color="blue">
                <Icon name="clipboard outline" />이 책에 대한 다른 사용자의 의견
              </Header>
            </Divider>

            <div style={{ marginLeft: 20, textAlign: "left" }}>
              {chats.length ? (
                chats.map((chat) => (
                  <div
                    className="chat_space"
                    key={chat.id}
                    style={{ marginBottom: 30 }}
                  >
                    <Chats
                      chat={chat}
                      isOwner={chat.createrId === userId}
                      detailbook_chat={collectionName}
                      style={{}}
                    />
                  </div>
                ))
              ) : (
                <p>채팅목록이 없습니다</p>
              )}
            </div>
            <div className="ui divider"></div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(props) {
  const title = encodeURIComponent(props.query.title);
  const res = await fetch(
    `https://openapi.naver.com/v1/search/book.json?query=${title}`,
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

  if (books.items[0] === undefined) {
    books.items[0] = {
      title: "error",
      description: "error",
      author: "error",
      publisher: "error",
    };
  }

  const isbn = books.items[0].isbn.split(" ")?.[1];

  const recommend = await fetch(
    `https://asia-northeast2-book-community-e9755.cloudfunctions.net/recommeders-book-to-books`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isbn: isbn }),
    }
  );

  const recommendResult = await recommend.json();

  const resList = (
    await Promise.all(
      recommendResult.result.map((x) =>
        fetch(`https://openapi.naver.com/v1/search/book_adv?d_isbn=${x}`, {
          headers: {
            "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
            "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_SECRET,
          },
        })
          .then((x) => x.json())
          .then((x) => x?.items?.[0])
      )
    )
  ).filter((x) => x);

  return {
    props: {
      books,
      recommended: resList,
    },
  };
}

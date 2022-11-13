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
  Step,
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

  // 네이버 책 API에서 price(정가)정보 삭제됨
  const {
    title,
    image,
    author,
    discount,
    publisher,
    pubdate,
    isbn,
    description,
  } = books.items[0];

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

  // 20221007: error
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

    // 20221007: error
    setLens(recommended.length);
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

  // 추천 책 이동 시마다 발생한 오류 해결 : books데이터 변경 시 마다, 새로 데이터 받아옴
  useEffect(() => {
    getDocAndCheck();
  }, [books]);

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
        <Segment style={{ height: "100vh" }}>
          <Dimmer active>
            <Loader size="massive">Loading...</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <div className="container_wrap">
          <Container textAlign="centered">
            {/* 책 정보 */}
            <div className="ui center aligned container">
              <div className="book_info_wrap">
                <div className="book_info_and_img">
                  <div className="book_img">
                    <div className="ui orange segment">
                      <img
                        src={image}
                        alt="DON'T HAVE IMAGE"
                        className="searchbook_img"
                      />

                      {!isMe() && (
                        <div className="select_register_and_back">
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
                              marginTop: 5,
                              fontSize: 11,
                              cursor: "pointer",
                            }}
                          >
                            <Icon name="undo" /> 돌아가기
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="book_info">
                    <div className="ui orange segment book_info_box">
                      <header>
                        <Header as="h3" color="blue">
                          책 정보
                        </Header>
                      </header>
                      <div>
                        <List divided vertical>
                          <List.Item>
                            <div style={{ fontSize: 13, margin: "5px 0px" }}>
                              <strong className="book_item">
                                {title?.length > 80
                                  ? `${title.substring(0, 80)}...`
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
                            {author?.length > 24
                              ? `${author.substring(0, 24)}...`
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
                              }).format(discount)}
                            </strong>
                          </List.Item>
                        </List>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="book_desc_wrap">
                  <div className="ui orange segment book_desc">
                    <header>
                      <Header as="h2" color="blue">
                        Description
                      </Header>
                    </header>

                    <p>
                      {decode(description).length > 200
                        ? `${decode(description).substring(0, 200)}...`
                        : decode(description)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 추천 책 목록 */}
            {lens ? (
              <div className="ui orange segment center aligned">
                <div>
                  <header>
                    <Header as="h3" color="blue">
                      함께 알아보면 좋은 책들
                    </Header>
                  </header>

                  <Item.Group>
                    <Grid columns={2}>
                      <Grid.Row>
                        {mlBooks.map((book) => (
                          <Grid.Column
                            key={book.title}
                            style={{ marginTop: "0.5rem" }}
                          >
                            <div className="ui segment recommend_wrap">
                              <Item key={book.isbn} className="recommend_items">
                                <Link
                                  href={`./${book.title
                                    .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                                    .replace(
                                      /\/(?![0-9][0-9a-fA-F]+)/g,
                                      "%2F"
                                    )}`}
                                >
                                  <a>
                                    <img
                                      src={book.image}
                                      className="recommend_img_book"
                                    />
                                  </a>
                                </Link>

                                <Item.Content className="recommend_book_desc">
                                  <div className="recommend_book_desc_title">
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
                                        <p>
                                          {book.title.length < 35
                                            ? book.title
                                            : book.title.slice(0, 35) + "..."}
                                        </p>
                                      </Item.Header>
                                    </Link>
                                  </div>
                                </Item.Content>
                              </Item>
                            </div>
                          </Grid.Column>
                        ))}
                      </Grid.Row>
                    </Grid>
                  </Item.Group>
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: "200px 0",
                  textAlign: "center",
                  fontSize: "35px",
                }}
              >
                <p style={{ fontSize: "1rem", fontFamily: "GothicA1-Medium" }}>
                  <Icon name="warning circle" color="red" />
                  검색결과가 존재하지 않습니다.
                </p>

                <Link href={`/explore`}>
                  <Button color="black">돌아가기</Button>
                </Link>
              </div>
            )}

            {/* 도서관 찾기 및 채팅 쓰기 */}
            <div className="selectLib_and_chat_wrap">
              <div className="select_lib_wrap">
                  <div className="ui red segment select_lib">
                    <div>
                      {checkItems.size ? (
                        <div className="complete_select_region">
                          <div className="select_region_name_wrap">
                            <Step>
                              <Icon name="location arrow" size="big" />
                              <Step.Content style={{marginTop:"0.5rem"}}>
                                <Step.Title>선택하신 지역</Step.Title>
                                <strong className="select_region_name">
                                  <Step.Description>
                                    {`"${name}"`}
                                  </Step.Description>
                                </strong>
                              </Step.Content>
                            </Step>

                            <div className="select_move">
                              <div className="reselect">
                                <Button color="red" onClick={changeRegion}>
                                  다시 선택하기
                                </Button>
                              </div>

                              <div className="movepage">
                                <Link href={`../naru/${isbn}/${id}`}>
                                  <Button color="blue">
                                    소장도서관 확인하기
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="no_complete_select_region">
                          <header>
                            <Header as="h3" color="blue">
                              어디에 있을까?
                            </Header>
                          </header>

                          <div className="select_region">
                            <Grid columns={3}>
                              <Grid.Row>
                                {regionData.map((item) => {
                                  return (
                                    <Grid.Column
                                      key={item.id}
                                      style={{ margin: "0.3rem 0" }}
                                    >
                                      <div>
                                        <label key={item.id}>
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
                                          <strong className="region_name">
                                            {item.name}
                                          </strong>
                                        </label>
                                      </div>
                                    </Grid.Column>
                                  );
                                })}
                              </Grid.Row>
                            </Grid>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
              </div>
              <div className="write_chat_wrap">
                  <div className="ui red segment write_chat">
                    <header>
                      <Header as="h3" color="blue">
                        생각 공유하기
                      </Header>
                    </header>
                    <div>
                      <ChatFactory detailbook_chat={collectionName} />
                    </div>
                  </div>
              </div>
            </div>
          </Container>

          <div className="ui center aligned container show_chat_wrap">
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
                    />
                  </div>
                ))
              ) : (
                <p>채팅목록이 없습니다</p>
              )}
            </div>
            <div className="ui divider"></div>
          </div>
        </div>
      )}
      <style jsx>{`
        .container_wrap {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }

        header {
          margin: 1em 0;
          text-align: center;
        }

        // 책 정보 출력을 위한 영역
        .book_info_wrap {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          height: 300px;
        }

        .book_info_and_img {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 55%;
          height: 240px;
        }

        .book_img {
          width: 30%;
        }

        .searchbook_img {
          width: 100px;
          height: 150px;
        }

        .select_register_and_back {
          margin-top: 5px;
        }

        .book_info {
          width: 69%;
          height: 240px;
          padding-right: 0.5%;
        }

        .book_info_box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 240px;
        }

        .book_desc_wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          height: 100%;
          width: 45%;
        }

        .book_desc {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 240px;
        }

        @media screen and (max-width: 1200px) {
          .book_info_and_img {
            justify-content: space-between;
          }

          .book_info_wrap {
            flex-direction: column;
            height: 500px;
          }

          .book_info_and_img {
            width: 100%;
          }

          .book_img {
            width: 25%;
          }

          .book_info {
            width: 70%;
            padding-right: 0;
          }

          .book_desc_wrap {
            width: 100%;
          }

          .book_desc {
            justify-content: space-around;
            height: auto;
          }

          .book_desc > p {
            padding: 1rem 0;
          }
        }

        @media screen and (max-width: 768px) {
          .book_info_wrap {
            height: 100%;
          }

          .book_info_and_img {
            flex-direction: column;
            height: 100%;
          }

          .book_img {
            width: 100%;
            margin: 1rem 0;
          }

          .book_info {
            width: 100%;
            margin: 1rem 0;
          }

          .book_desc_wrap {
            margin: 1rem 0;
          }
        }

        // 함께 알아보면 좋은 책들 영역

        .recommend_wrap {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .recommend_img_book {
          display: flex-column;
          justify-content: center;
          align-items: center;
          width: auto;
          height: 200px;
        }

        .recommend_book_desc_title {
          padding-top: 0.8rem;
        }

        .recommend_book_desc_title p {
          font-size: 0.8rem;
        }

        @media screen and (max-width: 768px) {
          .recommend_img_book {
            height: 130px;
          }

          .recommend_book_desc_title p {
            font-size: 0.6rem;
          }
        }

        // 도서관
        .selectLib_and_chat_wrap {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .select_lib_wrap {
          width: 100%;
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .write_chat_wrap{
          width: 100%;
          height: auto;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .select_lib {
          text-align: center;
          height: auto;
        }

        .select_region {
          text-align: center;
        }

        .region_name {
          margin-left: 0.7rem;
        }

        .complete_select_region, .no_complete_select_region {
          text-align: center;
          height: 240px;
          display:flex;
          flex-direction: column;
          justify-content: center;
        }

        .select_region_name_wrap {
          display: flex;
          height: 100%;
          justify-content: space-around;
          align-items: center;
        }

        .select_region_name{
          display :block;
          font-size: 1.5rem;
          margin-top:1rem;
        }

        .select_move{
          display:flex;
          flex-direction: column;
          align-items:flex-start;
        }

        .reselect{
          margin-bottom:0.5rem;
        }

        .movepage{
          margin-top:0.5rem;
        }

        // 채팅 작성 영역

        .write_chat{
          height: transparent;
        }

        // 채팅 확인영역
        .show_chat_wrap{
          margin-top: 5rem;
        }
        

      `}</style>
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

  const isbn = books.items[0].isbn;

  // 20221007 error
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

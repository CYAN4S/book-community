import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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

  console.log(checkItems);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
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
      setUserId(user.uid);
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
      <div className="wrap">
        <Segment style={{ width: "100%" }}>
          <div>
            <Image src={image} size="medium" centered />
          </div>
          <Header as="h3" style={{ paddingTop: 20 }} color="blue">
            책 정보
          </Header>
          <div className="info_book">
            <strong className="book_item"> {title} </strong>
            <strong className="num_price">
              {new Intl.NumberFormat("ko", {
                style: "currency",
                currency: "KRW",
              }).format(price)}
            </strong>

            <div className="txt_info">
              <List divided horizontal>
                <List.Item>
                  <strong>출판사</strong> {publisher}
                </List.Item>
                <List.Item>
                  <strong>출간일</strong> {pubdate}
                </List.Item>
                <List.Item>
                  <strong>작가</strong> {author}
                </List.Item>
              </List>
            </div>

            <Divider inverted />
            <Header as="h2" color="blue">
              Description
            </Header>

            <p style={{ paddingBottom: 20, fontSize: 15 }}>
              {decode(description)}
            </p>

            <Divider inverted />

            <div>
              {checkItems.size ? (
                <div style={{ marginBottom: 10 }}>
                  <strong style={{ marginRight: 10 }}>
                    {`"${name}"`} 선택되었습니다.
                  </strong>
                  <Button onClick={changeRegion}> 다시 선택하기 </Button>

                  <Link href={`../naru/${isbn}/${id}`}>
                    <a>
                      <Header
                        as="h3"
                        style={{ paddingTop: 20, marginBottom: 0 }}
                        color="blue"
                      >
                        소장도서관 확인하기
                      </Header>
                    </a>
                  </Link>
                </div>
              ) : (
                <>
                  <Header
                    as="h3"
                    style={{ paddingTop: 20, marginBottom: 30 }}
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
                            style={{ marginBottom: 5 }}
                          >
                            <div>
                              <label key={item.id} style={{ fontSize: 18 }}>
                                <Input
                                  type="checkbox"
                                  value={item.name}
                                  onChange={(e) => checkHandler(e, item.id, item.name)}
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

            <Divider inverted />
          </div>
        </Segment>
      </div>

      <Segment style={{ width: "100%" }}>
        <Header
          as="h3"
          style={{ paddingTop: 20, marginBottom: 30 }}
          color="blue"
        >
          생각 공유하기
        </Header>
        <ChatFactory detailbook_chat={collectionName} />

        <Divider inverted style={{ marginTop: 40 }} />
        <Header as="h3" style={{ marginBottom: 10 }} color="blue">
          이 책에 대한 다른 사용자의 의견
        </Header>

        <div>
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
      </Segment>

      <Button onClick={onClick} style={{ marginTop: 10, marginBottom: 20 }}>
        돌아가기
      </Button>

      <style jsx>{`
        .wrap {
          display: flex;
          text-align: center;
          margin: 30px 10px 20px 10px;
        }

        .book_item {
          display: block;
          font-size: 16px;
          margin-top: 25px;
        }

        .txt_info {
          display: block;
          font-size: 15px;
          color: red;
        }

        .book_item {
          display: block;
          font-size: 19px;
        }

        .num_price {
          display: block;
          font-size: 15px;
          margin-top: 10px;
          margin-bottom: 12px;
        }

        img {
          width: auto;
          height: 250px;
          transform: translateZ(0);
          backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast;
        }

        p {
          margin-bottom: 0.1em;
        }

        .chat_space {
          margin-left: 10px;
          margin-bottom: 5px;
          width: 300px;
          padding: 10px 10px 10px 0px;
        }
      `}</style>
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

  return {
    props: {
      books,
    },
  };
}

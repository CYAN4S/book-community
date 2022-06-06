import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Grid,
  Table,
  Divider,
} from "semantic-ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authService, dbService } from "../../firebaseConfig";
// getUserDoc 추가 06061427
import { onUserDocSnapshot, getUserDoc } from "../../utils/functions";
import { doc, setDoc } from "firebase/firestore";

function Explorer() {
  const [randomUser, setRandomUser] = useState(0);
  const [displayName, setDisplayName] = useState([]);
  const [subLens, setSubLens] = useState(0);
  const [subscribers, setSubscribers] = useState([]); // 구독자 목록 가져오기
  const [keyword, setKeyword] = useState("");
  const [recentBooks, setRecentBooks] = useState([]);
  const [lens, setLens] = useState(0); // 최근 검색한 책 기록 여부
  //const [similarBookLens, setSimilarBookLens] = useState(0); // 비슷한 책 데이터 여부

  useEffect(() => {
    setKeyword("");
    setLens(0);
    //setSimilarBookLens(0);
    setSubLens(0);
  }, []);
  useEffect(() => {
    setSubLens(subscribers.length);
    
  }, [subscribers.length]);
 

  // 0523_1103 추가 시작
  const [currentUid, setCurrentUid] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    const unsub = onUserDocSnapshot(currentUid, onUser);
    
    return () => unsub?.();
  }, [currentUid]);

  const onUser = async (data) => {
    
    if (data?.mySearchBooks) {
      const listMySearchBook = await Promise.all(
        data.mySearchBooks.map(async (x) => await x.substr(24))
      );
      const reverseMySearchBook = [...listMySearchBook].reverse();
      const uniqueArr = reverseMySearchBook.filter((element, index) => {
        return reverseMySearchBook.indexOf(element) === index;
      });
      setRecentBooks(
        uniqueArr.length > 4
          ? uniqueArr.slice(-uniqueArr.length, -(uniqueArr.length - 4))
          : uniqueArr
      );
      setLens(uniqueArr.length);
    } else {
      setRecentBooks([]);
    }
    // 06061429 추가
    if (data?.users) {
      const x = await Promise.all(
        data.users.map(async (uid) => await getUserDoc(uid))
      );
      setSubscribers(x);
      
      
      setSubLens(subscribers.length);
      console.log(subscribers.length);
      setDisplayName(x[0].displayName);
      console.log(x[randomUser].displayName);

    } else {
      setSubscribers([]);
    }
  };

  const updateUserDoc = (newData) => {
    return setDoc(doc(dbService, "profile", currentUid), newData, {
      merge: true,
    });
  };

  const clearRecentlyBook = () => {
    updateUserDoc({
      mySearchBooks: [],
    });

    setLens(0);
    setRecentBooks([]);
  };

  
  const otherSubscribers = () => {
    const tempRandomUser = Math.floor(Math.random() * subLens);
    if(randomUser == tempRandomUser){
      otherSubscribers();
    }else{
    setRandomUser(tempRandomUser);
    setDisplayName(subscribers[tempRandomUser].displayName);
    }
  };
  // 테스트용 버튼 (console)
  // const onStatusCheck = () => {
  //   console.log(subscribers[randomUser].displayName);
  // };

  return (
    <>
      <>
        <div style={{ marginTop: -20 }} className="ui fluid action input">
          <input
            type="text"
            placeholder="책 이름, 글쓴이, 출판사 등.."
            onChange={(e) => {
              e.preventDefault();
              setKeyword(e.target.value);
            }}
          ></input>
          <Link href={`/explore/${keyword}`}>
            <a>
              <Button inverted color="blue" style={{ marginLeft: 5 }}>
                검색
              </Button>
            </a>
          </Link>
        </div>
        {/* 테스트용 버튼 (console 확인용) */}
        {/* <Button
          onClick={onStatusCheck}
          inverted
          color="blue"
          style={{ marginLeft: 5 }}
        >
          확인
        </Button> */}
        {/* 0523_1105 내용 추가 시작 */}
        <Header as="h3" color="black">
          최근 검색한 책
          <Icon
            name="delete"
            onClick={clearRecentlyBook}
            color={"red"}
            size="mini"
            style={{ cursor: "pointer", marginLeft: 3, marginBottom: 5 }}
          />
        </Header>
        <Segment style={{ overflow: "hidden", maxHeight: 120 }}>
          <div>
            {lens ? (
              <>
                <Grid columns={4} key={``} divided>
                  <Grid.Row>
                    {recentBooks.map((recentBooks) => (
                      <>
                        <Link
                          href={`explore/detail/${recentBooks
                            .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                            .replace(/\/(?![0-9][0-9a-fA-F]+)/g, "%2F")}`}
                        >
                          <Grid.Column
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              cursor: "pointer",
                            }}
                          >
                            <a title="상세페이지로 이동하기">
                              <Icon name="book" size="huge"></Icon>
                            </a>
                            <p
                              style={{
                                marginLeft: 10,
                                marginRight: 10,
                                fontFamily: "Gugi-Regular",
                                fontSize: 11,
                              }}
                            >
                              {recentBooks.length < 50
                                ? recentBooks
                                : recentBooks.slice(0, 50) + "..."}
                            </p>
                          </Grid.Column>
                        </Link>
                        <Divider />
                      </>
                    ))}
                  </Grid.Row>
                </Grid>
              </>
            ) : (
              <>
                <div
                  style={{
                    padding: "40px 0",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  <strong>최근 검색한 기록이 없습니다!</strong>
                  <p />
                </div>
              </>
            )}
          </div>
        </Segment>
        {/* 0523 추가 내용 끝 */}
        <Header as="h3" color="black">
          추천 장르
        </Header>
        <div className="ui equal width center aligned padded grid">
          <div className="row">
            <div className="teal column">컴퓨터공학</div>
            <div className="teal column">프로그래밍 언어</div>
          </div>
          <div className="row">
            <div className="teal column">예술/에세이</div>
            <div className="teal column">자기계발</div>
          </div>
        </div>
        <Header as="h3" color="black">
          비슷한 책
          <Icon
            name="redo"
            onClick={otherSubscribers}
            color={"black"}
            size="mini"
            style={{ cursor: "pointer", marginLeft: 3, marginBottom: 5 }}
          />
        </Header>

        <Header style={{ marginTop: -10 }} as="h5" color="grey">
          <p style ={{}}>
            {subLens ? (
              <> {displayName ? `구독자 [${displayName}]님의 관심있는 책` : "구독자 [게스트]님의 관심있는 책"}</>
            ) : (
              <></>
            )}
          </p>
        </Header>

        <Segment style={{}}>
          <div>
            {subLens ? (
              <Grid columns={4} key={``} divided>
                <Grid.Row>
                  {subscribers[randomUser].myBooks.map(
                    (subscriberBooks) => (
                      (subscribers[randomUser].myBooks = [
                        ...subscribers[randomUser].myBooks,
                      ].reverse()),
                      (subscribers[randomUser].myBooks =
                        subscribers[randomUser].myBooks.length > 4
                          ? subscribers[randomUser].myBooks.slice(
                              -subscribers[randomUser].myBooks.length,
                              -(subscribers[randomUser].myBooks.length - 4)
                            )
                          : subscribers[randomUser].myBooks),
                      (subscriberBooks = subscriberBooks.substr(24)),
                      (
                        <>
                          <Link
                            href={`explore/detail/${subscriberBooks
                              .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                              .replace(/\/(?![0-9][0-9a-fA-F]+)/g, "%2F")}`}
                          >
                            <Grid.Column
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <a title="상세페이지로 이동하기">
                                <Icon name="book" size="huge"></Icon>
                              </a>
                              <p
                                style={{
                                  marginLeft: 10,
                                  marginRight: 10,
                                  fontFamily: "Gugi-Regular",
                                  fontSize: 11,
                                }}
                              >
                                {subscriberBooks.length < 50
                                  ? subscriberBooks
                                  : subscriberBooks.slice(0, 50) + "..."}
                              </p>
                            </Grid.Column>
                          </Link>
                          <Divider />
                        </>
                      )
                    )
                  )}
                </Grid.Row>
              </Grid>
            ) : (
              <>
                <div
                  style={{
                    padding: "50px 0",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                >
                  <strong>나만의 구독자를 먼저 만들어 보아요!</strong>
                  <p />
                </div>
              </>
            )}
          </div>
        </Segment>
      </>
      <style jsx>{`
        a {
          color: black;
        }
      `}</style>
    </>
  );
}

export default Explorer;

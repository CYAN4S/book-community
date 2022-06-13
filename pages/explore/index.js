import React from "react";
import {
  Button,
  Header,
  Icon,
  Segment,
  Grid,
  Table,
  Divider,
  Popup,
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
  const [testData, setTestData] = useState([]);
  const [lens, setLens] = useState(0); // 최근 검색한 책 기록 여부
  const [executeOtherSubscribers, setExecuteOtherSubscribers] = useState(false);

  useEffect(() => {
    setKeyword("");
    setLens(0);
    setCheckInitNaming(true);
  }, []);

  // 0523_1103 추가 시작
  const [currentUid, setCurrentUid] = useState(null);
  const [checkInitNaming, setCheckInitNaming] = useState(false);
  const [checkTest, setCheckTest] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    onUserDocSnapshot(currentUid, onUser);
  }, [currentUid]);
  useEffect(() => {
    setDisplayName(testData);
  }, [testData]);

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

      setSubLens(x.length);
      if (x.length) {
        setTestData(x[0].displayName);
        if (checkTest == true) {
          setDisplayName(x[0].displayName);
        }
      }
    } else {
      console.log("실행3-else");
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
    // 밑에 세 줄은 쓰지 않는 코드
    //if (executeOtherSubscribers == true) {
      //setExecuteOtherSubscribers(true);
      //setExecuteOtherSubscribers(false);
      const tempRandomUser = Math.floor(Math.random() * subLens);
      if (randomUser == tempRandomUser) {
        otherSubscribers();
      } else {
        
        
        setRandomUser(tempRandomUser);
        setDisplayName(subscribers[tempRandomUser].displayName);
        }
      
  };
  //테스트용 버튼 (console)
  // const onStatusCheck = () => {
  //   console.log("구독자 display", subscribers[randomUser].displayName);
  //   //console.log(subscribers);
  //   console.log("currentUid", currentUid);
  //   console.log("checkTest", checkTest);
  //   console.log("subLens", subLens);
  //   console.log("testdata", testData);
  //   console.log("displayName", displayName);
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
            name="eraser"
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
                              justifyContent: "left",
                              cursor: "pointer",
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            <a title="상세페이지로 이동하기">
                              <Icon name="book" size="huge" />
                            </a>
                            <p className="print_book">
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
                </div>
              </>
            )}
          </div>
        </Segment>

        <Header
          as="h3"
          color="black"
          style={{ marginTop: "3em", display: "flex" }}
        >
          내 구독자가 관심있어하는 책
          {subLens >= 2 ? (
            <Popup
              content="버튼을 누르면 다른 구독자들을 랜덤으로 검색합니다."
              trigger={
                <Icon
                  name="random"
                  onClick={otherSubscribers}
                  color={"red"}
                  size="mini"
                  style={{ cursor: "pointer", marginLeft: 5, marginTop: -2 }}
                />
              }
            />
          ) : (
            <></>
          )}
        </Header>

        <Header style={{ marginTop: 10, display: "flex" }} as="h5" color="grey">
          <span className="similar_book">
            {subLens ? (
              <>
                <Popup
                  content="페이지 조작 시에는, 자동으로 가장 오래된 구독자의 등록된 책을 불러옵니다."
                  trigger={<Icon name="question circle" size="large" loading />}
                />
                <span style={{ marginLeft: "-0.2em" }}>
                  {displayName
                    ? `구독자 [${displayName}]님의 관심있는 책`
                    : "구독자 [guest]님의 관심있는 책"}{" "}
                </span>
              </>
            ) : (
              <></>
            )}
          </span>
        </Header>

        <Segment>
          <div>
            {subLens ? (
              <Grid columns={4} divided>
                <Grid.Row>
                  {subscribers && subscribers[randomUser].myBooks ? (
                    subscribers[randomUser].myBooks.map(
                      (subscriberBooks) => (
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
                                  justifyContent: "left",
                                  cursor: "pointer",
                                  marginTop: 10,
                                  marginBottom: 10,
                                }}
                              >
                                <a title="상세페이지로 이동하기">
                                  <Icon name="book" size="huge" />
                                </a>
                                <p className="print_book">
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
                    )
                  ) : (
                    <p className="no_books_of_interest">
                      구독자가 등록한 책이 없습니다.
                    </p>
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

        .similar_book {
          font-size: 12px;
          margin-top: 0.2em;
        }

        .print_book {
          margin-left: 10;
          margin-right: 10;
          font-family: "Gugi-Regular";
          font-size: 11px;
        }

        .no_books_of_interest {
          margin-left: 1em;
          font-family: "KaushanScript-Regula";
          font-size: 15px;
          font-weight: bold;
          color: grey;
        }
      `}</style>
    </>
  );
}

export default Explorer;

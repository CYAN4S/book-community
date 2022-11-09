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
  RatingIcon,
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
        // 20221007: substr 24->13 (isbn)
        data.mySearchBooks.map(async (x) => await x.substr(13))
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
    const tempRandomUser = Math.floor(Math.random() * subLens);
    if (randomUser == tempRandomUser) {
      otherSubscribers();
    } else {
      setRandomUser(tempRandomUser);
      setDisplayName(subscribers[tempRandomUser].displayName);
    }
  };

 
  return (
    <>
      <>
        <div className="search_wrap">
          <div className="search_header">
            <Header as="h3" color="black">
              검색하기
            </Header>
          </div>
          <div className="search_icon">
          <Popup
            content="특수문자를 제외한 키워드를 입력해주세요."
            trigger={
              <Icon
                name="question"
                color={"blue"}
                size="large"
                style={{ marginLeft: 3, marginBottom: 5 }}
              />
            }
          />
          </div>

          
        </div>

        <div style={{ marginTop: 5 }} className="ui fluid action input">
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

        <Segment>
          <div>
            {lens ? (
              <Grid columns={4} key={``} divided>
                <Grid.Row>
                  {recentBooks.map((recentBooks) => (
                    <React.Fragment key={recentBooks}>
                      <Link
                        href={`explore/detail/${recentBooks
                          .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                          .replace(/\/(?![0-9][0-9a-fA-F]+)/g, "%2F")}`}
                      >
                        <Grid.Column
                          
                        >
                          <div className="recentBook_wrap">
                            <a title="상세페이지로 이동하기">
                              <Icon name="book" size="huge" />
                            </a>
                            
                            <p className="print_book pr">
                              {recentBooks.length < 15
                                ? recentBooks
                                : recentBooks.slice(0, 15) + "..."}
                            </p>
                          </div>
                          
                        </Grid.Column>
                      </Link>
                      <Divider />
                    </React.Fragment>
                  ))}
                </Grid.Row>
              </Grid>
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
                  content="페이지 첫 로드 시, 자동으로 가장 오래된 구독자의 등록된 책을 불러옵니다."
                  trigger={
                    <Icon
                      name="question circle"
                      size="large"
                      loading
                      color="violet"
                      style={{ marginBottom: 3 }}
                    />
                  }
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
                          <React.Fragment key={subscriberBooks}>
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
                          </React.Fragment>
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
          color: sky;
        }

        .similar_book {
          font-size: 12px;
          margin-top: 0.2em;
        }

        .search_wrap{
          display: flex;
          align-items:center;
        }

        // 최근 검색한 책
        .recentBook_wrap{
          display:flex;
          cursor:pointer;
          margin: 0.5rem 0;
        }

        .print_book {
          margin-left: 0.3rem;
          font-family: "Gugi-Regular";
          font-size: 0.7rem;
        }

        @media screen and (max-width:768px){
          a{
            text-align: center;
          }

          .recentBook_wrap{
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
            margin: 0;
          }

          .print_book {
            padding-top:1rem;
            text-align: center;
          }
        }

        @media screen and (max-width:480px){
          a{
            font-size:0.8rem;
          }

          .print_book {
            font-size:0.4rem;
            line-height:0.8rem;
          }
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

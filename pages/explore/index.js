import React from "react";
import { Button, Header, Icon, Segment, Grid, Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authService } from "../../firebaseConfig";
import { onUserDocSnapshot } from "../../utils/functions";
export default function Explorer() {
  // 0523_1103 추가 시작
  const [keyword, setKeyword] = useState("");
  const [currentUid, setCurrentUid] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUid(user.uid);
      }
      console.log("onAuthStatechanged(user)실행");
    });
  }, []);

  const [mySearchBooks, setMySearchBooks] = useState([]);
  useEffect(() => {
    console.log("onUserDocSnapshot useEffect 실행");
    const unsub = onUserDocSnapshot(currentUid, onUser);

    return () => unsub?.();
  }, [currentUid]);

  const onUser = async (data) => {
    console.log("onUser 실행");
    setLens(mySearchBooks.length);
    if (data?.mySearchBooks) {
      const listMySearchBook = await Promise.all(
        data.mySearchBooks.map(async (x) => await x.substr(24))
      );
      setMySearchBooks(listMySearchBook);
    } else {
      setMySearchBooks([]);
    }
  };
  const [RecentBooks, setRecentBooks] = useState([]);
  useEffect(async () => {
    console.log("네이버 API 테스트 useEffect");
    console.log("useEffect - mySearchBooks", mySearchBooks);
    const text = mySearchBooks;
    setLens(text.length);
    console.log("useEffect - mySearchBooks", text);
    // 기존 코드
    // const res = await fetch(
    //   "https://openapi.naver.com/v1/search/book.json?query=" + text[0],
    //   {
    //     headers: {
    //       "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
    //       "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_SECRET,
    //     },
    //   }
    // );
    // const books = await res.json();

    // 변경 코드
    fetch("/v1/search/book.json?query=" + text[0], {
      headers: {
        "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_ID,
        "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_SECRET,
      },
    })
      .then(async (res) => {
        await res.json();
        setRecentBooks(res);
        RecentBooks.items.title = RecentBooks.items.map((RecentBooks) => {
          RecentBooks.title = RecentBooks.title.replace(
            /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
            ""
          );
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, [mySearchBooks]);

  // 0523_1103 추가 끝
  const [lens, setLens] = useState(0); // 사용자의 책 검색 기록 내용 있는지 여부

  useEffect(() => {
    setKeyword("");
  }, []);
  return (
    <>
      <div className="ui fluid action input">
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
      {/* 0523_1105 내용 추가 시작 */}
      <Header as="h3" color="black">
        최근 검색한 책
      </Header>
      <Segment style={{}}>
        <div>
          {lens ? (
            <>
              {RecentBooks.items.map((book) => (
                <Grid style={{}} columns={4}>
                  <Grid.Row>
                    <Grid.Column key={book.isbn}>
                      <div>
                        <div
                          style={{ marginLeft: 5 }}
                          className="ui two column grid ui center aligned segments"
                        >
                          <div className="columnImage">
                            <div
                              style={{ width: 110, height: 145 }}
                              className="ui orange segment"
                            >
                              <Link
                                href={`explore/detail/${book.title
                                  .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                                  .replace(/\/(?![0-9][0-9a-fA-F]+)/g, "%2F")}`}
                              >
                                <a>
                                  <img
                                    style={{
                                      width: 80,
                                      height: 120,
                                    }}
                                    src={book.image}
                                    alt="DON'T HAVE IMAGE"
                                    className="img_book"
                                  />
                                </a>
                              </Link>
                            </div>
                          </div>
                          <div
                            style={{
                              width: 300,
                              display: "flex",
                              justifyContent: "center",
                            }}
                            className="ui yellow segment"
                          >
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell
                                  style={{
                                    fontSize: 12,
                                  }}
                                >
                                  <div>
                                    {book.title.length < 30
                                      ? book.title
                                      : book.title.slice(0, 30) + "..."}
                                  </div>
                                </Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                          </div>
                        </div>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ))}
            </>
          ) : (
            <>
              <div
                style={{
                  padding: "50px 0",
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
      <Header as="h3" color="black">
        읽고 있는 책
      </Header>
      <div className="ui four column grid">
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/138/038/13803897.jpg?type=m1&udate=20180803"></img>
              책 1
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/209/412/20941240.jpg?type=m1&udate=20211210"></img>
              책 2
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/221/638/22163886.jpg?type=m1&udate=20220309"></img>
              책 3
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/157/676/15767673.jpg?type=m1&udate=20220113"></img>
              책 4
            </a>
          </div>
        </div>
      </div>
      <Header as="h3" color="black">
        추천 장르
      </Header>
      <div className="ui equal width center aligned padded grid">
        <div className="row">
          <div className="grey column">컴퓨터공학</div>
          <div className="grey column">프로그래밍 언어</div>
        </div>
        <div className="row">
          <div className="grey column">예술/에세이</div>
          <div className="grey column">자기계발</div>
        </div>
      </div>
      <Header as="h3" color="black">
        비슷한 책
      </Header>
      <div className="ui four column grid">
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/185/243/18524381.jpg?type=m1&udate=20220218"></img>
              책 5
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/207/152/20715288.jpg?type=m1&udate=20210705"></img>
              책 6
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/205/160/20516042.jpg?type=m1&udate=20210515"></img>
              책 7
            </a>
          </div>
        </div>
        <div className="column">
          <div className="ui segment">
            <a href="https://google.com" className="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/214/247/21424719.jpg?type=m1&udate=20220116"></img>
              책 8
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

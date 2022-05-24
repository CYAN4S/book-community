import React from "react";
import { Button, Header, Segment, Grid, Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Explorer() {
  const [keyword, setKeyword] = useState("");
  const [recentBooks, setRecentBooks] = useState([]);
  const [lens, setLens] = useState(0); // 최근 검색한 책 기록 여부
  const [similarBookLens, setSimilarBookLens] = useState(0); // 비슷한 책 데이터 여부
  useEffect(() => {
    setKeyword("");
    setLens(0);
    setSimilarBookLens(0);
  }, []);

  return (
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
      {/* 0523_1105 내용 추가 시작 */}
      <Header as="h3" color="black">
        최근 검색한 책
      </Header>
      <Segment style={{}}>
        <div>
          {lens ? (
            <>
              {/* {recentBooks.map((recentBooks) => (
                <Grid style={{}} columns={4} key={``}>
                  <Grid.Row>
                    <Grid.Column>
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
                                href={`explore/detail/${recentBooks
                                  .replace(/%(?![0-9][0-9a-fA-F]+)/g, "%25")
                                  .replace(/\/(?![0-9][0-9a-fA-F]+)/g, "%2F")}`}
                              >
                                <a>
                                  <img
                                    style={{
                                      width: 80,
                                      height: 120,
                                    }}
                                    src={"test"}
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
                                    {recentBooks.length < 30
                                      ? recentBooks
                                      : recentBooks.slice(0, 30) + "..."}
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
              ))} */}
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
      </Header>
      <Header style={{ marginTop: -10 }} as="h5" color="grey">
        회원님이 접한 책을 읽은 독자들의 관심 도서
      </Header>
      <Segment style={{}}>
        <div>
          {similarBookLens ? (
            <>{/* 준비 중인 코드 */}</>
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
  );
}

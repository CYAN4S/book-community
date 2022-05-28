import React from "react";
import { Button, Header, Segment, Grid, Table, Icon, Divider } from "semantic-ui-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import withTransition from "../../public/HOC/withTransition";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/hooks";

function Explorer() {
  const [keyword, setKeyword] = useState("");

  // const [recentBooks, setRecentBooks] = useState([]); // 최근 검색한 책

  const [toggleRecentBooks, setToggleRecentBooks] = useState(false);

  const [lens, setLens] = useState(0); // 최근 검색한 책 기록 여부 확인용
  const [similarBookLens, setSimilarBookLens] = useState(0); // 비슷한 책 데이터 여부

  const [currentUser] = useRecoilState(currentUserState);

  let recentBooks = currentUser?.mySearchBooks.length > 4 ? currentUser?.mySearchBooks. : currentUser?.mySearchBooks;
  


  useEffect(() => {
    setKeyword("");
    if (currentUser) {
      if (currentUser.mySearchBooks.length) {
        setLens(currentUser.mySearchBooks.length);
      } else {
        setLens(0);
      }
    }
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
      <Segment>
        <div>
          {lens ? (
            <>
              <Grid columns={4} key={``} divided>
                <Grid.Row>
                  {recentBooks.map((recentBooks) => (
                    <>
                    <Grid.Column style={{display : "flex", justifyContent : "center", }}>
                      <Icon name="book" size="huge"></Icon>
                      <p style={{marginLeft : 10, marginRight: 10, fontFamily : "Gugi-Regular", fontSize : 11}}>{recentBooks.slice(24,).length > 35 ? `${recentBooks.slice(24,).substring(0,35)}...` : recentBooks.slice(24,)}</p>
                    </Grid.Column>
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

export default Explorer;

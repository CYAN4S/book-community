import { Header, Icon, Container, Grid } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import help1 from "../../../public/help/help_searchLib1.jpg";
import help2 from "../../../public/help/help_searchLib2.jpg";
import help3 from "../../../public/help/help_searchLib3.jpg";
import help4 from "../../../public/help/help_searchLib4.jpg";
import help5 from "../../../public/help/help_searchLib5.jpg";

const Help_Search = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <div className="wrap">
        <Container fluid textAlign="center" style={{ width: "90%" }}>
          <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
            <Icon name="database" circular />
            <Header.Content> SEARCH LIB </Header.Content>
          </Header>
          <div>
            <Icon
              name="caret left"
              style={{ cursor: "pointer" }}
              onClick={returnClick}
            ></Icon>
            <strong onClick={returnClick}>뒤로가기</strong>
          </div>
        </Container>

        <Container
          textAlign="left"
          fluid
          style={{ marginTop: 30, width: "95%" }}
        >
          <Header as="h2">
            <Icon name="question" />
            <Header.Content>
              북스탬프에서 특정 책에 대한 도서관을 어떻게 찾을까?
              <Header.Subheader>
                How do I find the library for a specific book in Bookstamp?
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>

        <Container textAlign="center" fluid style={{ marginTop: 10 }}>
          <Header as="h4">
            <Header.Content>
              <Header.Subheader>
                <p className="develop_msg" style={{ marginTop: 30 }}>
                  현재 개발중인 내용으로, 이미지와 설명은 변경될 수 있습니다.
                </p>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>

        <Container textAlign="left" fluid style={{ width: "90%" }}>
          <Grid celled verticalAlign="middle" centered>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={8}>
                <Image src={help1} width={900} height={450} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p className="help_searchLib_text">
                  {`1. 특정 책 검색을 통한 상세페이지에서, 어디에 있을까?" 탭의 지역을 선택할 수 있습니다.`}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={8}>
                <Image src={help2} width={900} height={450} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p className="help_searchLib_text">
                  {`2. 원하는 지역을 선택하면, 선택한 지역을 표시합니다. (뒤로가기 아이콘 클릭 시, 다시 선택할 수 있습니다.)`}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={8}>
                <Image src={help3} width={950} height={400} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p className="help_searchLib_text">
                  3. 소장도서관 확인버튼을 누르면, 지역 내 도서관의 정보와 현재
                  나의위치로부터의 거리를 확인할 수 있습니다.
                </p>

                <p
                  style={{
                    fontSize: 11,
                    textAlign: "left",
                    marginLeft: 10,
                    color: "teal",
                  }}
                >
                  {`Tip) 주소 옆의 맵핀을 누르면, 도서관 위치를 확인할 수 있어요!`}
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={8}>
                <Image src={help4} width={900} height={330} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p className="help_searchLib_text">
                  4. 주소 옆의 맵핀을 누르면, 다음과 같이 선택된 도서관의 지도
                  상 위치를 확인할 수 있습니다.
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={8}>
                <Image src={help5} width={900} height={400} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p className="help_searchLib_text">
                  5. 또한 도서관들의 정보를 출력하는 [3번째 이미지] 화면에서
                  스크롤을 아래로 내려, 화살표 아이콘을 클릭하면, 도서관들의
                  전체 위치를 확인할 수도 있습니다.
                </p>

                <p
                  style={{
                    fontSize: 11,
                    textAlign: "left",
                    marginLeft: 10,
                    color: "teal",
                  }}
                >
                  {`Tip) 특정 책의 소장여부와 대출 가능여부에 따라 필터를 달리 적용할 수 있어요!`}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        .wrap{
          height : 100vh;
        }
        
        .help_searchLib_text {
          font-size: 15px;
          font-family: GothicA1-Medium;
        }

        strong {
          cursor: pointer;
        }

        .develop_msg {
          font-size: 11px;
          color: red;
          font-family: GothicA1-Medium;
        }
      `}</style>
    </>
  );
};

export default Help_Search;

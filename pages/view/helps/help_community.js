import {
  Divider,
  Header,
  Segment,
  Icon,
  Container,
  Grid,
  Card,
  Popup,
} from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Help_Community = () => {
  const router = useRouter();

  // Back: Common to help pages
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
    <div className="wrap">
    <Container fluid textAlign="center" style={{ width: "90%" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
          <Icon name="comment alternate" circular />
          <Header.Content> COMMUNITY </Header.Content>
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

      <Container textAlign="left" fluid style={{ width: "95%", marginTop: 30 }}>
        <Header as="h2">
          <Icon name="question" />
          <Header.Content>
            북스탬프의 커뮤니티는?
            <Header.Subheader>
              What is the community of Bookstamp?
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <Container style={{ width: "90%", marginTop: 30 }}>
        <Segment>
          <Grid columns={2} relaxed="very" style={{ textAlign: "center" }}>
            <Grid.Column>
              <p> first space for you!</p>
              <Icon
                name="hand point down"
                size="big"
                style={{ marginBottom: 15 }}
              ></Icon>
              <Link href="../../explore">
                <a>
                  <Popup
                    trigger={
                      <Card
                        header="이야기 1"
                        meta="책에 집중하기"
                        description="하나의 책에 대해 다른 사람들과 깊은 이야기를 나누어보세요"
                        centered
                      />
                    }
                  >
                    <Popup.Header>MOVE EXPLORE</Popup.Header>
                    <Popup.Content>클릭하여 이동하기</Popup.Content>
                  </Popup>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <p>second space for you!</p>
              <Icon
                name="hand point down outline"
                size="big"
                style={{ marginBottom: 15 }}
              ></Icon>
              <Link href="../../post">
                <a>
                  <Popup
                    trigger={
                      <Card
                        header="이야기 2"
                        meta="장르에 집중하기"
                        description="특정 장르에 대하여 다른 사람들과 넓은 이야기를 나누어보세요"
                        centered
                      />
                    }
                  >
                    <Popup.Header>MOVE POST</Popup.Header>
                    <Popup.Content>클릭하여 이동하기</Popup.Content>
                  </Popup>
                </a>
              </Link>
            </Grid.Column>
          </Grid>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid
              columns={1}
              relaxed="very"
              style={{ textAlign: "center", marginTop: "5em", width: "35%" }}
            >
              <Grid.Column>
                <p> third space for you!</p>
                <Icon
                  name="hand point down"
                  size="big"
                  style={{ marginBottom: 15 }}
                ></Icon>
                <Link href="../../we">
                  <a>
                    <Popup
                      trigger={
                        <Card
                          header="이야기 3"
                          meta="모두의 공간에 집중하기"
                          description="모든 사람이 있는 공간에서 이야기해봐요"
                          centered
                        />
                      }
                    >
                      <Popup.Header>MOVE WE</Popup.Header>
                      <Popup.Content>클릭하여 이동하기</Popup.Content>
                    </Popup>
                  </a>
                </Link>
              </Grid.Column>
            </Grid>
          </div>
        </Segment>
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
        
        p {
          font-family: FredokaOne-Regular;
          font-size: 18px;
        }

        strong {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Help_Community;

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
          <strong onClick={returnClick}>
            뒤로가기
          </strong>
        </div>
      </Container>

      <Container textAlign="left" fluid style={{ width : "95%", marginTop: 30 }}>
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

      <Container style={{ width : "90%", marginTop: 30  }}>
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
          <Divider vertical>And</Divider>
        </Segment>
        </Container>

      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        p {
          font-family: FredokaOne-Regular;
          font-size: 18px;
        }

        strong{
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Help_Community;

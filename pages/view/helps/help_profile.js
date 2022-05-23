import {
  Divider,
  Header,
  Image,
  Segment,
  Icon,
  Container,
  Grid,
} from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
const Help_Profile = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Container fluid textAlign="center" style={{ width: "90%" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
          <Icon name="comment alternate" circular />
          <Header.Content> PROFILE </Header.Content>
        </Header>
        <div>
          <Icon
            name="caret left"
            style={{ cursor: "pointer" }}
            onClick={returnClick}
          ></Icon>
          <strong style={{ cursor: "pointer" }} onClick={returnClick}>
            뒤로가기
          </strong>
        </div>
      </Container>

      <Container textAlign="left" fluid style={{ marginTop: 30 }}>
        <Header as="h2">
          <Icon name="question" />
          <Header.Content>
            {`북스탬프의 프로필 페이지는?`}
            <Header.Subheader>
              {`What is Bookstamp's profile page?`}
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Segment>
          <Grid columns={4} divided>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내 닉네임을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내 상태메시지를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>나를 대표할 수 있는 사진을 업로드 할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내가 구독한 사용자를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider style={{ marginTop: -5 }} />
            <Grid.Row style={{ marginTop: -20 }}>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내가 등록한 책 목록을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내 닉네임을 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>내 상태 메시지를 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div
                  style={{
                    marginTop: 0,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Image src="/bookstamp.png" size="small" />
                  <Icon name="left arrow" style={{ marginLeft: 30 }} />
                  <span>로그아웃 할 수 있습니다.</span>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>

      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        p {
          font-family: FredokaOne-Regular;
        }

        span{
          margin-bottom : -8px;
          margin-left : 10px;
          margin-right: 3px;
          font-size: 17px;
          font-family: "DoHyeon-Regular";
        }
      `}</style>
    </>
  );
};

export default Help_Profile;

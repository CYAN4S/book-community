import {
  Divider,
  Header,
  Segment,
  Icon,
  Container,
  Grid,
} from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import helpProfile from "../../../public/help/help_profile1.png";
import Image from "next/image";

const Help_Profile = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Container fluid textAlign="center" style={{ width: "95%" }}>
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
          <strong onClick={returnClick}>뒤로가기</strong>
        </div>
      </Container>

      <Container textAlign="left" fluid style={{ marginTop: 30, width: "95%" }}>
        <Header as="h2">
          <Icon name="question" />
          <Header.Content>
            {`북스탬프의 프로필 페이지는?`}
            <Header.Subheader>
              {`What is Bookstamp's profile page?`}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p
          style={{
            fontSize: 11,
            color: "red",
            marginTop: 30,
            marginBottom: 15,
            marginLeft: 50,
          }}
        >{`현재 개발중인 내용으로, 이미지와 설명은 변경될 수 있습니다.`}</p>
        <Image src={helpProfile} width={700} height={290} />
      </Container>

      <Container style={{ marginTop: 30, width: "90%" }}>
        <Segment>
          <Grid columns={4} divided>
            <Grid.Row textAlign="center" style={{ border: "2px solid grey" }}>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">1.</span>
                  <span> 내 닉네임을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">2.</span>
                  <span> 내 상태메시지를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">3.</span>
                  <span> 대표이미지를 업로드 할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">4.</span>
                  <span> 나의 구독자를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider style={{ marginTop: -5,  border: "2px solid grey"}} />
            <Grid.Row style={{ marginTop: -20, border: "2px solid grey" }}>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">5.</span>
                  <span> 내가 등록한 책들을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">6.</span>
                  <span> 내 닉네임을 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">7.</span>
                  <span> 내 상태 메시지를 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span className="num_span">8.</span>
                  <span> 로그아웃 할 수 있습니다.</span>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>

      <style jsx>{`
        div {
          margin-top: 0.3em;
          text-align: right;
        }

        span {
          margin-bottom: 0.3em;
          font-size: 15px;
          font-family: "DoHyeon-Regular";
        }

        .num_span {
          font-size: 25px;
          margin-right: 0.5em;
          color: violet;
        }

        strong {
          cursor: pointer;
        }

        .help_Profile_Div {
          text-align: center;
          display: flex;
          align-items: center;
        }

      `}</style>
    </>
  );
};

export default Help_Profile;

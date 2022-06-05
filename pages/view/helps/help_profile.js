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
        <Image src={helpProfile} width={700} height={290} />
      </Container>

      <Container style={{ marginTop: 30, width: "90%" }}>
        <Segment>
          <Grid columns={4} divided>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 1. 내 닉네임을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 2. 내 상태메시지를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span>
                    {" "}
                    3. 나를 대표할 수 있는 사진을 업로드 할 수 있습니다.
                  </span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 4. 내가 구독한 사용자를 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Divider style={{ marginTop: -5 }} />
            <Grid.Row style={{ marginTop: -20 }}>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 5. 내가 등록한 책 목록을 확인할 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 6. 내 닉네임을 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 7. 내 상태 메시지를 바꿀 수 있습니다.</span>
                </div>
              </Grid.Column>
              <Grid.Column style={{ width: "25%" }}>
                <div className="help_Profile_Div">
                  <span> 8. 로그아웃 할 수 있습니다.</span>
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

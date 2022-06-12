import { Header, Icon, Container, Grid } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import help1 from "../../../public/help/help_subscriber1.png";
import help2 from "../../../public/help/help_subscriber2.png";
import help3 from "../../../public/help/help_subscriber3.png";
import help4 from "../../../public/help/help_subscriber4.png";
import Image from "next/image";
const Help_Subscriber = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Container fluid textAlign="center" style={{ width: "90%" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
          <Icon name="users" circular />
          <Header.Content> SUBSCRIBER </Header.Content>
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
            북스탬프에서의 구독자 관리는 어떻게 할까?
            <Header.Subheader>
              How to manage subscribers in Bookstamp?
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <Container textAlign="center" fluid style={{ marginTop: 10 }}>
        <Header as="h4">
          <Header.Content>
            <Header.Subheader>
              <p
                className="develop_msg"
                style={{ marginTop: 30 }}
              >현재 개발중인 내용으로, 이미지와 설명은 변경될 수 있습니다.</p>
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <Container textAlign="left" fluid style={{ width: "90%" }}>
        <Grid celled verticalAlign="middle" centered>
          <Grid.Row style={{ border: "2px solid grey" }}>
            <Grid.Column width={7}>
              <Image src={help1} width={530} height={600} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p>
                1. 채팅 공간에서, 다른 사용자의 프로필을 누를 수 있습니다.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ border: "2px solid grey" }}>
            <Grid.Column width={7}>
              <Image src={help2} width={700} height={220} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p>
                2. 다른 사용자의 프로필을 눌러 사용자 프로필로 이동하면, 구독하기 버튼을 누를 수 있습니다.
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ border: "2px solid grey" }}>
            <Grid.Column width={7}>
              <Image src={help3} width={700} height={220} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p>
                3. 구독하기 버튼을 누를 시, 구독 취소로 버튼 활성화 상태가 변경됩니다.
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row style={{ border: "2px solid grey" }}>
            <Grid.Column width={7}>
              <Image src={help4} width={700} height={360} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p>
                {`4. 다른 사용자를 구독한 후, 나의 프로필로 이동하면 "내가 구독한 사용자" 목록에 해당 사용자가 등록됩니다.`}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>

      

      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        p {
          font-size: 15px;
          font-family: GothicA1-Medium;
        }

        strong {
          cursor: pointer;
        }

        .develop_msg {
          font-size: 11px;
          color: red;
        }
      `}</style>
    </>
  );
};

export default Help_Subscriber;

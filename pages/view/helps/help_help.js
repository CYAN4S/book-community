import { Header, Icon, Container, Grid, Divider } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// inquiry img
import help1 from "../../../public/help/help_inquiry1.png";
import help2 from "../../../public/help/help_inquiry2.png";
import help3 from "../../../public/help/help_inquiry3.png";

// report img
import help4 from "../../../public/help/help_report1.png";
import help5 from "../../../public/help/help_report2.png";
import help6 from "../../../public/help/help_report3.png";

const Help_Help = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  // move inquire page
  function pushInquireClick(e) {
    router.push("/view/inquire");
  }

  // move report page
  function pushReportClick(e) {
    router.push("/view/report");
  }

  return (
    <>
      <div className="wrap">
        <Container fluid textAlign="center" style={{ width: "90%" }}>
          <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
            <Icon name="bullhorn" circular />
            <Header.Content> {`INQUIRE/REPORT`} </Header.Content>
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
              북스탬프에서의 신고, 문의는 어떻게 수행할 수 있을까?
              <Header.Subheader>
                How can I report and inquire at Bookstamp?
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

        <Container
          textAlign="left"
          fluid
          style={{ width: "90%", marginTop: "1.8em" }}
        >
          <Header as="h2">
            <Icon name="envelope outline" size="big" />
            <Header.Content>
              문의
              <Header.Subheader>
                <p className="pushTag" onClick={pushInquireClick}>
                  문의하기 페이지로 이동하려면 이 부분을 클릭해주세요
                </p>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Grid celled verticalAlign="middle" centered>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help1} width={500} height={250} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>1. 어느 상황에서 문의를 할 수 있는가에 대해 알려드립니다.</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help2} width={350} height={120} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>
                  2. 양식을 작성하기 위해 화살표 아이콘을 눌러, 양식을 펼칠 수
                  있습니다.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help3} width={390} height={300} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>
                  3. 양식 내용에 따라 문의 내용을 작성하고 전송할 수 있습니다.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>

        <Container
          textAlign="left"
          fluid
          style={{ width: "90%", marginTop: "3em" }}
        >
          <Header as="h2">
            <Icon name="meh outline" size="big" />
            <Header.Content>
              신고
              <Header.Subheader>
                <p className="pushTag" onClick={pushReportClick}>
                  신고하기 페이지로 이동하려면 이 부분을 클릭해주세요
                </p>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Grid celled verticalAlign="middle" centered>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help4} width={500} height={250} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>1. 어느 상황에서 신고를 할 수 있는가에 대해 알려드립니다.</p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help5} width={360} height={120} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>
                  2. 양식을 작성하기 위해 화살표 아이콘을 눌러, 양식을 펼칠 수
                  있습니다.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ border: "2px solid grey" }}>
              <Grid.Column width={7}>
                <Image src={help6} width={400} height={350} />
              </Grid.Column>
              <Grid.Column centered width={7}>
                <p>
                  3. 양식 내용에 따라 신고 내용을 작성하고 전송할 수 있습니다.
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "red",
                    marginTop: -5,
                    marginLeft: 15,
                  }}
                >
                  - 신고는 자세하게, 당시 상황을 잘 반영한 이미지가 첨부된다면
                  처리에 유용하게 활용될 수 있습니다.
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
        
        strong {
          cursor: pointer;
        }

        .pushTag {
          font-size: 10px;
          margin-left: 3px;
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

export default Help_Help;

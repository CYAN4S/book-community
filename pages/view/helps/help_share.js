import {
  Header,
  Icon,
  Container,
  Grid,
  Segment,
  Divider,
} from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import help1 from "../../../public/help/help_explore1.jpg";
import help2 from "../../../public/help/help_explore2.jpg";
import Image from "next/image";

const Help_Share = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Container fluid textAlign="center" style={{ width: "90%" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
          <Icon name="magic" circular />
          <Header.Content> SHARE EXPERIENCE </Header.Content>
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

      <Container textAlign="left" fluid style={{ marginTop: 30, width: "90%" }}>
        <Header as="h2">
          <Icon name="question" />
          <Header.Content>
            북스탬프에서의 공유 경험은?
            <Header.Subheader>
              What is your sharing experience at Bookstamp?
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p className="develop_msg" style={{marginTop: "3em"}}>
          현재 개발중인 내용으로, 이미지와 설명은 변경될 수 있습니다.
        </p>
      </Container>

      <Container
        textAlign="left"
        fluid
        style={{ width: "90%", marginTop: "3.8em" }}
      >
        <Header as="h2">
          <Icon name="book" size="big" />
          <Header.Content>
            최근 책 검색하기
            <Header.Subheader>
              상단 explore 탭을 눌러 이동할 수 있어요
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Image src={help1} width={1000} height={150} />
      </Container>

      <Container style={{ marginTop: 5, width: "90%" }}>
        <span className="help_explore">
          <Icon name="angle double right" color="purple" />
          <span className="num_span">1.</span>
          <span> 최근 검색한 책이 최대 4권까지 표시됩니다.</span>
        </span>

        <span className="help_explore">
          <Icon name="angle double right" color="purple" />
          <span className="num_span">2.</span>
          <span> 지우개 버튼을 누르면, 검색한 내용이 모두 사라집니다. </span>
        </span>
      </Container>

      <Divider
        style={{ marginTop: "1.8em", width: "60%", marginLeft: "3.6em" }}
      />
      <Container
        textAlign="left"
        fluid
        style={{ width: "90%", marginTop: "1.8em" }}
      >
        <Header as="h2">
          <Icon name="eye" size="big" />
          <Header.Content>
            구독자의 관심있는 책 살펴보기
            <Header.Subheader>
              상단 explore 탭을 눌러 이동할 수 있어요
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Image src={help2} width={1000} height={220} />
      </Container>

      <Container style={{ marginTop: 5, width: "90%" }}>
        <span className="help_explore">
          <Icon name="angle double right" color="purple" />
          <span className="num_span">1.</span>
          <span> 구독자가 등록한 책 목록을 확인할 수 있습니다. </span>
        </span>

        <span className="help_explore">
          <Icon name="angle double right" color="purple" />
          <span className="num_span">2.</span>
          <span> 어떤 구독자의 책 목록인지 확인할 수 있습니다. </span>
        </span>

        <span className="help_explore">
          <Icon name="angle double right" color="purple" />
          <span className="num_span">3.</span>
          <span>
            버튼을 누르면, 내 구독자 목록을 랜덤으로 검색하여 한 명의 책 등록
            목록을 표시합니다.
          </span>
        </span>
      </Container>
      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        strong {
          cursor: pointer;
        }

        .num_span {
          font-size: 30px;
          margin-right: 0.3em;
          color: purple;
        }

        span {
          margin-bottom: 0.3em;
          font-size: 20px;
          font-family: "GamjaFlower-Regular";
        }

        .help_explore {
          text-align: center;
          display: flex;
          justify-content: left;
          transform: translateY(20%);
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

export default Help_Share;

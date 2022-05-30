import { Header, Icon, Container } from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";

const Help_Suggestion = () => {
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
          <Header.Content> SUGGESTION </Header.Content>
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
            {`북스탬프에서의 책 추천을 어떻게 활용할 수 있을까?`}
            <Header.Subheader>
              {`How can I use book recommendations from Bookstamp?`}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        strong {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Help_Suggestion;

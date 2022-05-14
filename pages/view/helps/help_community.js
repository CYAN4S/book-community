import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Segment,
  TextArea,
  Icon,
  Container,
  Accordion,
} from "semantic-ui-react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Help_Community = () => {
  const router = useRouter();

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <Container fluid textAlign="center" style={{ width: "90%" }}>
        <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
          <Icon name="question circle" circular />
          <Header.Content> 도움말</Header.Content>
        </Header>
        <div>
          <Icon
            name="caret left"
            style={{ cursor: "pointer" }}
            onClick={returnClick}
          ></Icon>
          <strong
            style={{ cursor: "pointer" }}
            onClick={returnClick}
          >
            뒤로가기
          </strong>
        </div>
      </Container>
      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default Help_Community;

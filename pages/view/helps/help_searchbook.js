import {
  Button,
  Divider,
  Form,
  Header,
  Input,
  Image,
  Segment,
  TextArea,
  Icon,
  Container,
  Accordion,
  Grid,
  Card,
  Popup,
} from "semantic-ui-react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Help_SearchBook = () => {
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

      </Container>

      <style jsx>{`
        
      `}</style>
    </>
  );
};

export default Help_SearchBook;

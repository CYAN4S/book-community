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
  Grid,
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
          <Icon name="comment alternate" circular />
          <Header.Content> COMMUNITY </Header.Content>
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
            북스탬프의 커뮤니티는?
            <Header.Subheader>
              What is the community of Bookstamp?
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Segment>
          <Grid columns={2} relaxed="very" style={{ textAlign: "center" }}>
            <Grid.Column>
              <p style={{fontSize : 18}}> first space for you</p>
              <Icon name="hand point down" size="big"></Icon>
            </Grid.Column>
            <Grid.Column>
              <p style={{fontSize : 18}}>second space for you</p>
              <Icon name="hand point down outline" size="big"></Icon>
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
        }
      `}</style>
    </>
  );
};

export default Help_Community;

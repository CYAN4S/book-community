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
    Card,
    Popup,
  } from "semantic-ui-react";
  import React from "react";
  import { useState } from "react";
  import { useRouter } from "next/router";
  import Link from "next/link";
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
            <strong style={{ cursor: "pointer" }} onClick={returnClick}>
              뒤로가기
            </strong>
          </div>
        </Container>
  
        <Container textAlign="left" fluid style={{ marginTop: 30 }}>
          <Header as="h2">
            <Icon name="question" />
            <Header.Content>
              {`북스탬프에서의 구독자 관리는 어떻게 할까?`}
              <Header.Subheader>
                {`How to manage subscribers in Bookstamp?`}
              </Header.Subheader>
            </Header.Content>
          </Header>
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
  
  export default Help_Subscriber;
  
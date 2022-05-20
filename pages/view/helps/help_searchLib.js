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

  
  const Help_Search = () => {
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
            <Header.Content> SEARCH LIB </Header.Content>
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
            <Icon name="database" />
            <Header.Content>
              {`북스탬프에서 특정 책에 대한 도서관을 어떻게 찾을까?`}
              <Header.Subheader>
                {`How do I find the library for a specific book in Bookstamp?`}
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>
  
        <style jsx>{`
          div {
            margin-top: 30px;
            text-align: right;
          }
          .help_searchbook_text {
            font-size: 15px;
            font-family: GothicA1-Medium;
          }
        `}</style>
      </>
    );
  };
  
  export default Help_Search;
  
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
import help1 from "../../../public/help/help_searchbook1.jpg";
import help2 from "../../../public/help/help_searchbook2.jpg";
import help3 from "../../../public/help/help_searchbook3.jpg";

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
          <Icon name="search" circular />
          <Header.Content> SEARCH </Header.Content>
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
            {`북스탬프에서 책 검색을 하고싶다면?`}
            <Header.Subheader>
              {`Do you want to search for books in Bookstamp?`}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <Container textAlign="center" fluid style={{ marginTop: 10 }}>
        <Header as="h4">
          <Header.Content>
            <Header.Subheader>
              <p
                style={{ fontSize: 11, color: "red", marginTop : 30 }}
              >{`현재 개발중인 내용으로, 이미지와 설명은 변경될 수 있습니다.`}</p>
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Container>

      <Container textAlign="left" fluid  style={{width : "95%"}}>
        <Grid celled verticalAlign="middle" centered>
          <Grid.Row>
            <Grid.Column width={9}>
              <Image src={help1} width={900} height={120} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p className="help_searchbook_text">
                {`1. Explore 탭을 통해, 검색 창으로 이동할 수 있습니다.`}
              </p>
             
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={9}>
              <Image src={help2} width={900} height={170} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p className="help_searchbook_text">
              {`2. Explore 페이지의 검색박스와 검색 버튼의 클릭을 통해, 특정 도서의
                검색 결과를 확인할 수 있습니다.`}
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={9}>
              <Image src={help3} width={900} height={330} />
            </Grid.Column>
            <Grid.Column centered width={7}>
              <p className="help_searchbook_text">
              {`3. 도서 검색 결과를 필터별로 확인할 수 있으며, 출력된 도서를
                클릭하여, 세부정보를 확인할 수 있습니다.`}
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
        .help_searchbook_text {
          font-size: 15px;
          font-family: GothicA1-Medium;
        }
      `}</style>
    </>
  );
};

export default Help_SearchBook;

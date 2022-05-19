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

        <Grid celled>
          <Grid.Row>
            <Grid.Column width={9}>
              <Image src={help1} width={800} height={100}/>
            </Grid.Column>
            <Grid.Column width={6}>
       
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={9}>
            <Image src={help2} width={800} height={170}/>
            </Grid.Column>
            <Grid.Column width={6}>
            
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={9}>
            <Image src={help3} width={800} height={270}/>
            </Grid.Column>
            <Grid.Column width={6}>
            
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>

      <style jsx>{``}</style>
    </>
  );
};

export default Help_SearchBook;

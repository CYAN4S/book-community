import React from 'react'

import {
  Button,
  Header
  
} from "semantic-ui-react";


export default function explorer() {
  return (
      <>
      
      <div class="ui fluid icon input">
        <input type="text" placeholder="책 이름, 글쓴이, 출판사 등.."></input>
        <Button color="gray">검색</Button>
      </div>
      <Header as="h3" color="black">
        읽고 있는 책 
      </Header>
      <Header as="h3" color="black">
        추천 장르
      </Header>
      <Header as="h3" color="black">
        비슷한 책
      </Header>
    </>
  );
}

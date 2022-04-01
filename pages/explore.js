import React from "react";

import { Button, Header } from "semantic-ui-react";

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
      <div class="ui four column grid">
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/138/038/13803897.jpg?type=m1&udate=20180803"></img>
              책 1
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/209/412/20941240.jpg?type=m1&udate=20211210"></img>
              책 2
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/221/638/22163886.jpg?type=m1&udate=20220309"></img>
              책 3
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/157/676/15767673.jpg?type=m1&udate=20220113"></img>
              책 4
            </a>
          </div>
        </div>
      </div>
      <Header as="h3" color="black">
        추천 장르
      </Header>
      <div class="ui equal width center aligned padded grid">
        <div class="row">
          <div class="grey column">컴퓨터공학</div>
          <div class="grey column">프로그래밍 언어</div>
        </div>
        <div class="row">
          <div class="grey column">예술/에세이</div>
          <div class="grey column">자기계발</div>
        </div>
      </div>
      <Header as="h3" color="black">
        비슷한 책
      </Header>
      <div class="ui four column grid">
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/185/243/18524381.jpg?type=m1&udate=20220218"></img>
              책 5
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/207/152/20715288.jpg?type=m1&udate=20210705"></img>
              책 6
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/205/160/20516042.jpg?type=m1&udate=20210515"></img>
              책 7
            </a>
          </div>
        </div>
        <div class="column">
          <div class="ui segment">
            <a href="https://google.com" class="ui medium image">
              <img src="https://bookthumb-phinf.pstatic.net/cover/214/247/21424719.jpg?type=m1&udate=20220116"></img>
              책 8
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

import {
  Divider,
  Icon,
  Item,
} from "semantic-ui-react";
import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div style={{ width: 300 }}>
        <Item.Group style={{ marginLeft: 10 }}>
          <Link href={`/view/inquire`}>
            <Item style={{ marginTop: 10, cursor: "pointer" }}>
              <Icon
                loading
                size="big"
                name="question circle"
                style={{ marginRight: 15, marginBottom: 10 }}
              />
              <Item.Content>
                <Item.Header> 문의하기 </Item.Header>
                <Item.Meta>
                  <span>질문하고 싶은 부분이 있다면?</span>
                </Item.Meta>
              </Item.Content>
            </Item>
          </Link>
          <Divider horizontal>Or</Divider>
          <Link href={`/view/report`}>
            <Item style={{ marginTop: 10, cursor: "pointer" }}>
              <Icon
                loading
                size="big"
                name="warning circle"
                style={{ marginRight: 15, marginBottom: 10 }}
              />
              <Item.Content>
                <Item.Header> 신고하기 </Item.Header>
                <Item.Meta>
                  <span>불법/비도덕적 사용자를 신고해주세요!</span>
                </Item.Meta>
              </Item.Content>
            </Item>
          </Link>
          <Divider horizontal>Or</Divider>
          <Link href={`/view/help`}>
            <Item style={{ marginBottom: 30, cursor: "pointer" }}>
              <Icon
                size="big"
                name="info circle"
                style={{ marginRight: 15, marginBottom: 10 }}
              />
              <Item.Content>
                <Item.Header> 도움말 </Item.Header>
                <Item.Meta>
                  <span>북스탬프 이용에 궁금한 게 있다면?</span>
                </Item.Meta>
              </Item.Content>
            </Item>
          </Link>
        </Item.Group>
      </div>

      <Divider horizontal>FOOTER</Divider>

      <div className="footer">
        <p>Editor : ABC</p>
        <address>Contact webmaster for more information. 000-1234-5678</address>
      </div>

      <style jsx>{`
        .img_wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer {
          display: flex;
          flex-direction: column;
          justify-content: right;
          align-items: right;
        }
      `}</style>
    </>
  );
}

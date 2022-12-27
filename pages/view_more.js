import { Button, Divider, Icon, Item } from "semantic-ui-react";
import React from "react";
import Link from "next/link";
import withTransition from "../public/HOC/withTransition";
import { useRouter } from "next/router";

function View_more() {
  const router = useRouter();

  // 메인화면으로 이동하기
  const onClick = () => {
    router.push("/main");
  };

  return (
    <>
      <div style={{ width: 300 }}>
        <Item.Group style={{ marginLeft: 10 }}>
          <Link href={`/view/inquire`}>
            <Item style={{ marginTop: 10, cursor: "pointer" }}>
              <Icon
                size="big"
                name="envelope"
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
                name="question circle"
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

      <Divider />
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button animated="vertical" color="black" onClick={onClick}>
          <Button.Content hidden>
            <p>메인으로</p>
          </Button.Content>
          <Button.Content visible>
            <Icon name="power" />
          </Button.Content>
        </Button>
      </div>

      <style jsx>{`
        .img_wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        p {
          font-size: 11px;
          font-family: "GothicA1-Bold";
        }
      `}</style>
    </>
  );
}

export default View_more;

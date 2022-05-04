import {
  Button,
  Card,
  Divider,
  Form,
  Header,
  Input,
  List,
  Placeholder,
  Segment,
  Sidebar,
  TextArea,
  Image,
  Menu,
  Icon,
  Label,
  Grid,
  Checkbox,
  Item,
} from "semantic-ui-react";
import React from "react";

export default function About() {
  return (
    <>
      <div>
        <Item.Group style={{ marginLeft: 10 }}>
          <Item style={{ marginBottom: 30 }}>
            <Icon
              loading
              size="big"
              name="question circle"
              style={{ marginRight: 15 }}
            />
            <Item.Content>
              <Item.Header> 문의하기 </Item.Header>
              <Item.Meta>
                <span >질문하고 싶은 부분이 있다면?</span>
              </Item.Meta>
            </Item.Content>
          </Item>

          <Item style={{ marginBottom: 30 }}>
            <Icon
              loading
              size="big"
              name="warning circle"
              style={{ marginRight: 15 }}
            />
            <Item.Content>
              <Item.Header> 신고하기 </Item.Header>
              <Item.Meta>
                <span >불법/비도덕적 사용자를 신고해주세요!</span>
              </Item.Meta>
            </Item.Content>
          </Item>

          <Item style={{ marginBottom: 30 }}>
            <Icon
              size="big"
              name="info circle"
              style={{ marginRight: 15 }}
            />
            <Item.Content>
              <Item.Header> 도움말 </Item.Header>
              <Item.Meta>
                <span >북스탬프 이용에 궁금한 게 있다면?</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider/>
        <div className="footer">
          <p>Editor : ABC</p>
          <address>Contact webmaster for more information. 000-1234-5678</address>
        </div>

      </div>
      <style jsx>{`
        .img_wrap {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .footer{
          display : flex;
          flex-direction : column;
          justify-content: right;
          align-items : right;
        }
      `}</style>
    </>
  );
}

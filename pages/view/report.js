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
  Container,
  Accordion,
  Select,
} from "semantic-ui-react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
const Report = () => {
  const [formOpen, setFormOpen] = useState(false);
  const router = useRouter();
  const panels = [
    {
      key: "misuse",
      title: "불량 이용",
      content: {
        content: (
          <div style={{ marginLeft: 30 }}>
            <p style={{ fontSize: 13 }}>
              - 불량 이용 : 불건전 언어 사용, 불법프로그램 사용 등 커뮤니티 이용
              피해
            </p>
          </div>
        ),
      },
    },
    {
      key: "account_hijacking",
      title: "계정 도용",
      content: {
        content: (
          <div style={{ marginLeft: 30 }}>
            <p style={{ fontSize: 13 }}>
              - 계정 도용으로 인한 피해를 받으셨거나, 목격하셨을 때
              신고해주세요!
            </p>
          </div>
        ),
      },
    },
    {
      key: "other",
      title: "기타",
      content: {
        content: (
          <div style={{ marginLeft: 30 }}>
            <p style={{ fontSize: 13 }}>
              - 그 외의 사용자 기망행위가 목격되면 신고해주세요!
            </p>
          </div>
        ),
      },
    },
  ];

  const onToggleForm = () => {
    setFormOpen((prev) => !prev);
  };

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <div>
      <Container textAlign="center">
        <Header as="h2" icon>
          <Icon name="meh outline" />
          report
        </Header>
      </Container>
      <Container textAlign="justified">
        <b>when to report?</b>
        <Divider />
        <Accordion defaultActiveIndex={0} panels={panels} />
        <Divider />
      </Container>
      <Container textAlign="right">
        <Icon
          name="caret left"
          style={{ cursor: "pointer" }}
          onClick={returnClick}
        ></Icon>
        <strong style={{ cursor: "pointer" }} onClick={returnClick}>
          뒤로가기
        </strong>
      </Container>

      <Container textAlign="center" style={{ marginTop: 50 }}>
        <Header as="h2" icon>
          <Icon name="edit" />
          <Header.Subheader>
            <p style={{ marginTop: 20 }}>
              아래 화살표 버튼을 눌러 양식을 펼쳐 작성해주세요.
            </p>
          </Header.Subheader>
        </Header>
        <div>
          {formOpen ? (
            <>
              <Icon name="caret up" onClick={onToggleForm} size="big"></Icon>
              <Segment>
                <Form>
                  <Form.Group widths="equal">
                    <Form.Field
                      id="form-input-control-report-name"
                      control={Input}
                      label="신고자 닉네임"
                      placeholder="신고자 닉네임"
                    />

                    <Form.Field
                      id="form-input-control-target-name"
                      control={Input}
                      label="신고 대상 닉네임"
                      placeholder="신고 대상 닉네임"
                      style={{ marginBottom: 20 }}
                    />

                    <Form.Field
                      id="form-input-control-target-name"
                      control={Input}
                      label="신고 일자"
                      placeholder="2000-01-01"
                      style={{ marginBottom: 20 }}
                    />
                  </Form.Group>
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="신고 내용"
                    placeholder="신고 내용"
                  />
                  <Form.Field
                    id="form-button-control-public"
                    control={Button}
                    content="Confirm"
                    color="red"
                  />
                </Form>
              </Segment>
            </>
          ) : (
            <>
              <Icon name="caret down" onClick={onToggleForm} size="big"></Icon>
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Report;

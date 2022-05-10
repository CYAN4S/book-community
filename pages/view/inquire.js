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
} from "semantic-ui-react";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const Inquire = () => {
  const [formOpen, setFormOpen] = useState(false);
  const router = useRouter();
  const panels = [
    {
      key: "system_inquiry",
      title: "시스템 문의",
      content: {
        content: (
          <div style={{ marginLeft: 30 }}>
            <p style={{ fontSize: 13 }}>
              - 시스템 사용에 방법에 대한 질문이 있을 때 문의하실 수 있어요!
            </p>
          </div>
        ),
      },
    },
    {
      key: "system_improvement",
      title: "시스템 개선",
      content: {
        content: (
          <div style={{ marginLeft: 30 }}>
            <p style={{ fontSize: 13 }}>
              - 시스템 개선에 대한 생각이 있으시거나, 불편한 점이 있으실 때 문의하실 수 있어요!
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
              - 그 외의 사항
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
          <Icon name="envelope outline" />
          Inquire
        </Header>
      </Container>
      <Container textAlign="justified">
        <b>when to inquire?</b>
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
            아래 화살표 버튼을 눌러 양식에 따라 내용을 작성해주세요.
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
                      label="문의자 닉네임"
                      placeholder="문의자 닉네임"
                    />

                    <Form.Field
                      id="form-input-control-target-name"
                      control={Input}
                      label="문의 일자"
                      placeholder="2000-01-01"
                      style={{ marginBottom: 20 }}
                    />
                  </Form.Group>
                  <Form.Field
                    id="form-textarea-control-opinion"
                    control={TextArea}
                    label="문의 내용"
                    placeholder="문의 내용"
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

export default Inquire;

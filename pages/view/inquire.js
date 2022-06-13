import { authService, dbService } from "../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
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
  Select,
} from "semantic-ui-react";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import withTransition from "../../public/HOC/withTransition";

const Inquire = () => {
  // 0515_1623 코드 추가 시작
  const [inquireUserName, setInquireUserName] = useState("");
  const [userContext, setUserContext] = useState("");
  const [category, setCategory] = useState("");
  const categories = [
    { key: "a", text: "시스템 문의", value: "시스템 문의" },
    { key: "b", text: "시스템 개선", value: "시스템 개선" },
    { key: "c", text: "기타", value: "기타" },
  ];

  const [userObj, setUserObj] = useState(null);
  const collectionName = `userInquire`;
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          updateProfile: (args) => updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
    });
  }, []);

  // submit form data (inquire)
  const onNewInquireSubmit = async (e) => {
    e.preventDefault();

    const inquireObj = {
      createdAt: Date.now(),
      createrId: userObj.uid,
      inquireUserName: inquireUserName,
      userContext: userContext,
      category: category,
    };

    console.log(category, userContext);
    await addDoc(collection(dbService, collectionName), inquireObj)
      .then(() => console.log("전송완료"))
      .catch((error) => alert(error));
    setInquireUserName("");
    setUserContext("");
    setCategory("");
  };

  // open or close form
  const [formOpen, setFormOpen] = useState(false);
  const router = useRouter();

  // menu data
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
              - 시스템 개선에 대한 생각이 있으시거나, 불편한 점이 있으실 때
              문의하실 수 있어요!
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
            <p style={{ fontSize: 13 }}>- 그 외의 사항</p>
          </div>
        ),
      },
    },
  ];

  // form state toggle
  const onToggleForm = () => {
    setFormOpen((prev) => !prev);
  };

  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <div className="wrap">
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
                <Icon
                  name="caret up"
                  onClick={onToggleForm}
                  size="big"
                  style={{ cursor: "pointer" }}
                ></Icon>
                <Segment>
                  <Form onSubmit={onNewInquireSubmit}>
                    <Form.Group widths="equal">
                      <Form.Field
                        id="form-input-control-report-name"
                        control={Input}
                        label="문의자 닉네임"
                        placeholder="문의자 닉네임"
                        value={inquireUserName}
                        onChange={(e) => setInquireUserName(e.target.value)}
                        required
                      />

                      <Form.Field
                        id="form-input-control-target-name"
                        label="카테고리"
                        placeholder="카테고리"
                        style={{ marginBottom: 20 }}
                        control={Select}
                        options={categories}
                        value={category}
                        onChange={(e, data) => setCategory(data.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Field
                      id="form-textarea-control-opinion"
                      control={TextArea}
                      label="문의 내용"
                      placeholder="문의 내용"
                      value={userContext}
                      onChange={(e) => setUserContext(e.target.value)}
                      required
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
                <Icon
                  name="caret down"
                  onClick={onToggleForm}
                  size="big"
                  style={{ cursor: "pointer" }}
                ></Icon>
              </>
            )}
          </div>
        </Container>
      </div>
      <style jsx>{`
        .wrap {
          height: 100vh;
        }
      `}</style>
    </>
  );
};

export default withTransition(Inquire);

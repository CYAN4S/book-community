import { authService, dbService, storageService } from "../../firebaseConfig";
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
  Image,
} from "semantic-ui-react";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { v4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import withTransition from "../../public/HOC/withTransition";

const Report = () => {
  const [formOpen, setFormOpen] = useState(false);

  // reportPhotoUpload code start
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImgFileString(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onClearPhotoClick = () => setImgFileString("");
  // reportPhotoUpload code end
  const [reportUserName, setReportUserName] = useState("");
  const [badUserName, setBadUserName] = useState("");
  const [reportUserContext, setReportUserContext] = useState("");
  const [badChatWhy, setBadChatWhy] = useState("");
  const [imgFileString, setImgFileString] = useState("");
  const [saveReportPhoto, setSaveReportPhoto] = useState("");
  const badChatWhys = [
    { key: "i", text: "부적절한 게시글", value: "부적절한 게시글" },
    { key: "u", text: "불건전한 게시글", value: "불건전한 게시글" },
    { key: "c", text: "상업적인 게시글", value: "상업적인 게시글" },
    { key: "a", text: "계정 도용", value: "계정 도용" },
    { key: "p", text: "도배", value: "도배" },
  ];

  const [userObj, setUserObj] = useState(null);
  const collectionName = `userReport`;
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

  // submit form data (report)
  const onNewReportSubmit = async (e, data) => {
    e.preventDefault();
    if (imgFileString !== "") {
      const fileRef = ref(storageService, `${data.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      saveReportPhoto = await getDownloadURL(response.ref);
    }
    console.log("데이터확인", saveReportPhoto);

    const reportObj = {
      createdAt: Date.now(),
      createrId: userObj.uid,
      reportUserName: reportUserName,
      badUserName: badUserName,
      reportUserContext: reportUserContext,
      badChatWhy: badChatWhy,
      reportPhoto: saveReportPhoto,
    };
    console.log(reportObj);
    await addDoc(collection(dbService, collectionName), reportObj)
      .then(() => {
        alert("신고되었습니다!");
      })
      .catch((error) => {
        alert(error);
      });
    setReportUserName("");
    setBadUserName("");
    setReportUserContext("");
    setBadChatWhy("");
    setSaveReportPhoto("");
    setImgFileString("");
    router.push("/view_more");
  };

  const router = useRouter();

  // menu data
  const panels = [
    {
      key: "misuse",
      title: "불량 이용",
      content: {
        content: (
          <div className="panel_div">
            <p className="panel_p">
              - 불량 이용 : 불건전 언어 사용, 부적절한 내용, 불법프로그램 사용
              등 커뮤니티 이용 피해가 발생하였을 때, 신고해주세요!
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
          <div className="panel_div">
            <p className="panel_p">
              - 게시판에서의 상업적 행위가 발생할 때, 신고해주세요!
            </p>
          </div>
        ),
      },
    },
    {
      key: "commercial_use",
      title: "상업적 이용",
      content: {
        content: (
          <div className="panel_div">
            <p className="panel_p">
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
          <div className="panel_div">
            <p className="panel_p">
              - 그 외의 사용자 기망행위가 목격되면 신고해주세요!
            </p>
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
                  <Form onSubmit={onNewReportSubmit}>
                    <Form.Group widths="equal">
                      <Form.Field
                        id="form-input-control-report-name"
                        control={Input}
                        label="신고자 닉네임"
                        placeholder="신고자 닉네임"
                        value={reportUserName}
                        onChange={(e) => setReportUserName(e.target.value)}
                        required
                      />

                      <Form.Field
                        id="form-input-control-target-name"
                        control={Input}
                        label="신고 대상 닉네임"
                        placeholder="신고 대상 닉네임"
                        style={{ marginBottom: 20 }}
                        value={badUserName}
                        onChange={(e) => setBadUserName(e.target.value)}
                        required
                      />
                      <Form.Field
                        control={Select}
                        options={badChatWhys}
                        label="신고 사유"
                        placeholder="신고 사유"
                        value={badChatWhy}
                        onChange={(e, data) => setBadChatWhy(data.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Field
                      id="form-textarea-control-opinion"
                      control={TextArea}
                      label="세부 신고 내용"
                      placeholder="세부 신고 내용"
                      value={reportUserContext}
                      onChange={(e) => setReportUserContext(e.target.value)}
                    />
                    <strong>
                      <p>파일 업로드</p>
                    </strong>
                    <div
                      style={{ marginTop: 5, marginBottom: 10 }}
                      className="ui segment"
                    >
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        id="attach-file"
                        icon="file image"
                      />
                    </div>

                    {imgFileString && (
                      <div
                        style={{ marginTop: 10, marginBottom: 20 }}
                        className="ui segment"
                      >
                        <Image
                          label={{
                            color: "red",
                            onClick: onClearPhotoClick,
                            icon: "remove circle",
                            size: "medium",
                            ribbon: true,
                          }}
                          src={imgFileString}
                          style={{
                            backgroundImage: imgFileString,
                            flex: 1,
                            width: "50%",
                            height: "50%",
                            marginLeft: 20,
                          }}
                        />
                      </div>
                    )}

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
      <style jsx>{
        `
        .panel_p{
          font-size : 13px;
        }

        .panel_div{
          margin-left : 30px;
        }
        `
      }</style>
    </>
  );
};

export default withTransition(Report);

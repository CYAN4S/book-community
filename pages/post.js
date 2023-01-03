import {
  Button,
  Card,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
} from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";
import withTransition from "../public/HOC/withTransition";
import {kdc, kdc_history, kdc_literature, kdc_lng, kdc_art, kdc_technology_science, kdc_natural_science, kdc_social_science, kdc_religion, kdc_philosophy, kdc_general} from "./src/KDC";

const Post = () => {
  // 대표장르가 선택되었는가?
  const [representative_KDC, setRepresentative_KDC] = useState(false);

  // 세부장르가 선택되었는가?
  const [detail_KDC, setDetail_KDC] = useState(false);

  // 대표장르가 선택되었을 때, track 이름을 가진 value 값의 배열이 저장됨
  const [representative_KDC_Track, setRepresentative_KDC_Track] = useState([]);

  // 선택된 대표장르에 해당하는 obj 전체를 저장하는 배열
  const [representative_KDC_Element, setRepresentative_KDC_Element] = useState(
    []
  );

  // 선택된 세부장르의 이름
  const [detail_KDC_Element, setDetail_KDC_Element] = useState("");

  // 세부 장르 출력을 위한 배열명 저장 (map으로 다루어짐)
  const [kdc_Arr, setKdc_Arr] = useState([]);

  const handleItemClick = (e) => {
    const target = kdc.filter((item) => {
      return item.name === e.target.outerText;
    });
    setRepresentative_KDC_Element(target[0]);
    setRepresentative_KDC_Track(target[0].track);
    setRepresentative_KDC((prev) => !prev);

    // 사용자가 선택한 분류 탐색
    if (target[0].name === "총류") {
      setKdc_Arr(kdc_general);
    } else if (target[0].name === "철학") {
      setKdc_Arr(kdc_philosophy);
    } else if (target[0].name === "종교") {
      setKdc_Arr(kdc_religion);
    } else if (target[0].name === "사회과학") {
      setKdc_Arr(kdc_social_science);
    } else if (target[0].name === "자연과학") {
      setKdc_Arr(kdc_natural_science);
    } else if (target[0].name === "기술과학") {
      setKdc_Arr(kdc_technology_science);
    } else if (target[0].name === "예술") {
      setKdc_Arr(kdc_art);
    } else if (target[0].name === "언어") {
      setKdc_Arr(kdc_lng);
    } else if (target[0].name === "문학") {
      setKdc_Arr(kdc_literature);
    } else if (target[0].name === "역사") {
      setKdc_Arr(kdc_history);
    } else {
      alert("오류 발생");
    }
  };

  const handleDetailItemClick = (e) => {
    setDetail_KDC_Element(e.target.outerText);
    setDetail_KDC(true);
  };

  // 총류 다시선택
  const retrySelect = () => {
    setRepresentative_KDC(false);
    setDetail_KDC(false);
    setRepresentative_KDC_Track([]);
    setRepresentative_KDC_Element([]);
    setDetail_KDC_Element("");
    setKdc_Arr([]);
  };

  return (
    <>
      <Container textAlign="center" style={{ marginBottom: 20 }}>
        <Header as="h2" icon>
          <Icon name="paste" />
          게시글 작성하기
          <Header.Subheader>
            작성할 게시글의 장르를 먼저 선택해주세요.
          </Header.Subheader>
        </Header>
      </Container>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid columns={1} divided>
          <Grid.Row>
            <Grid.Column>
              {representative_KDC ? (
                <Grid.Row></Grid.Row>
              ) : (
                <Grid.Row>
                  <Grid.Column>
                    <Menu vertical size="massive">
                      <Dropdown item text="1단계 : 장르 선택하기">
                        <Dropdown.Menu>
                          {kdc.map((item) => (
                            <Dropdown.Item
                              key={item.id}
                              onClick={handleItemClick}
                            >
                              {item.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu>
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {detail_KDC ? (
                <></>
              ) : (
                <>
                  {representative_KDC ? (
                    <>
                      <Menu vertical size="massive">
                        <Dropdown item text="2단계 : 세부 장르 선택하기">
                          <Dropdown.Menu>
                            <Dropdown.Header
                              icon="tags"
                              content={` 선택된 대표장르 : ${representative_KDC_Element.name}`}
                            />
                            {kdc_Arr.map((item) => (
                              <Dropdown.Item
                                key={item.id}
                                onClick={handleDetailItemClick}
                              >
                                {item.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Menu>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      {representative_KDC && detail_KDC && (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid centered columns={2}>
              <Grid.Row column={2}>
                <Grid.Column width={5} centered>
                  <Card>
                    <Image src="./represent.jpg" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>선택된 장르</Card.Header>
                      <Card.Meta>대표</Card.Meta>
                      <Card.Description>
                        {representative_KDC_Element.name}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column width={5} centered style={{ marginLeft: 15 }}>
                  <Card>
                    <Image src="./detail.jpg" wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>선택된 장르</Card.Header>
                      <Card.Meta>세부</Card.Meta>
                      <Card.Description>{detail_KDC_Element}</Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop : 20 }}>
            <Grid columns={2} >
              <Grid.Row>
                <Grid.Column>
                  <Button
                    onClick={retrySelect}
                    content="다시 선택하기"
                    labelPosition="left"
                    icon="redo"
                    inverted
                    color="red"
                    style={{ marginTop: "5em" }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Link
                    href={`./post/${representative_KDC_Element.name}/${detail_KDC_Element}`}
                  >
                    <Button
                      content="선택 완료하기"
                      labelPosition="left"
                      icon="redo"
                      inverted
                      color="violet"
                      style={{ marginTop: "5em" }}
                    />
                  </Link>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;

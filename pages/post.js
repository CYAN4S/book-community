import {
  Button,
  Card,
  Container,
  Dropdown,
  Form,
  Grid,
  GridColumn,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Menu,
  Segment,
} from "semantic-ui-react";
import { useState } from "react";

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

  // 총류
  const kdc_general = [
    { id: 10, name: "도서학, 서지학" },
    { id: 20, name: "문헌정보학" },
    { id: 30, name: "백과사전" },
    { id: 40, name: "강연집, 수필집, 연설문집" },
    { id: 50, name: "일반연속간행물" },
    { id: 60, name: "일반학회, 단체, 협회, 기관" },
    { id: 70, name: "신문, 언론, 저널리즘" },
    { id: 80, name: "일반전집, 총서" },
    { id: 90, name: "향토자료" },
  ];

  // 철학
  const kdc_philosophy = [
    { id: 110, name: "형이상학" },
    { id: 120, name: "인식론, 인과론, 인간학" },
    { id: 130, name: "철학의 체계" },
    { id: 140, name: "경학" },
    { id: 150, name: "동양철학, 사상" },
    { id: 160, name: "서양철학" },
    { id: 170, name: "논리학" },
    { id: 180, name: "심리학" },
    { id: 190, name: "윤리학, 도덕철학" },
  ];

  // 종교
  const kdc_religion = [
    { id: 210, name: "비교종교" },
    { id: 220, name: "불교" },
    { id: 230, name: "기독교" },
    { id: 240, name: "도교" },
    { id: 250, name: "천도교" },
    { id: 260, name: "신도" },
    { id: 270, name: "힌두교, 브라만교" },
    { id: 280, name: "이슬람교(회교)" },
    { id: 290, name: "기타 제종교" },
  ];

  // 사회과학
  const kdc_social_science = [
    { id: 310, name: "통계학" },
    { id: 320, name: "경제학" },
    { id: 330, name: "사회학, 사회문제" },
    { id: 340, name: "정치학" },
    { id: 350, name: "행정학" },
    { id: 360, name: "법학" },
    { id: 370, name: "교육학" },
    { id: 380, name: "풍속, 예절, 민속학" },
    { id: 390, name: "국방, 군사학" },
  ];

  // 자연과학
  const kdc_natural_science = [
    { id: 410, name: "수학" },
    { id: 420, name: "물리학" },
    { id: 430, name: "화학" },
    { id: 440, name: "천문학" },
    { id: 450, name: "지학" },
    { id: 460, name: "광물학" },
    { id: 470, name: "생명과학" },
    { id: 480, name: "식물학" },
    { id: 490, name: "동물학" },
  ];

  // 기술과학
  const kdc_technology_science = [
    { id: 510, name: "의학" },
    { id: 520, name: "농업, 농학" },
    { id: 530, name: "공학, 공업일반, 토목공학, 환경공학" },
    { id: 540, name: "건축공학" },
    { id: 550, name: "기계공학 " },
    { id: 560, name: "전기공학, 전자공학" },
    { id: 570, name: "화학공학" },
    { id: 580, name: "제조업" },
    { id: 590, name: "생활과학" },
  ];

  // 예술
  const kdc_art = [
    { id: 610, name: "건축물" },
    { id: 620, name: "조각, 조형예술" },
    { id: 630, name: "공예, 장식미술" },
    { id: 640, name: "서예" },
    { id: 650, name: "회화, 도화" },
    { id: 660, name: "사진예술" },
    { id: 670, name: "음악" },
    { id: 680, name: "공연예술, 매체예술" },
    { id: 690, name: "오락, 스포츠" },
  ];

  // 언어
  const kdc_lng = [
    { id: 710, name: "한국어" },
    { id: 720, name: "중국어" },
    { id: 730, name: "일본어" },
    { id: 740, name: "영어" },
    { id: 750, name: "독일어" },
    { id: 760, name: "프랑스어" },
    { id: 770, name: "스페인어, 포르투갈어" },
    { id: 780, name: "이탈리아어" },
    { id: 790, name: "기타제어" },
  ];

  // 문학
  const kdc_literature = [
    { id: 810, name: "한국문학" },
    { id: 820, name: "중국문학" },
    { id: 830, name: "일본문학, 기타아시아문학" },
    { id: 840, name: "영미문학" },
    { id: 850, name: "독일문학" },
    { id: 860, name: "프랑스문학" },
    { id: 870, name: "스페인, 포르투갈문학" },
    { id: 880, name: "이탈리아문락" },
    { id: 890, name: "기타제문학" },
  ];

  // 역사
  const kdc_history = [
    { id: 910, name: "아시아" },
    { id: 920, name: "유럽" },
    { id: 930, name: "아프리카" },
    { id: 940, name: "북아메리카" },
    { id: 950, name: "남아메리카" },
    { id: 960, name: "오세아니아" },
    { id: 970, name: "양극지방" },
    { id: 980, name: "지리" },
    { id: 990, name: "전기" },
  ];

  // 도서관 책 분류표 - 한국 십진분류표 KDC
  const kdc = [
    { id: 0, name: "총류", track: kdc_general },
    { id: 100, name: "철학", track: kdc_philosophy },
    { id: 200, name: "종교", track: kdc_religion },
    { id: 300, name: "사회과학", track: kdc_social_science },
    { id: 400, name: "자연과학", track: kdc_natural_science },
    { id: 500, name: "기술과학", track: kdc_technology_science },
    { id: 600, name: "예술", track: kdc_art },
    { id: 700, name: "언어", track: kdc_lng },
    { id: 800, name: "문학", track: kdc_literature },
    { id: 900, name: "역사", track: kdc_history },
  ];

  const handleItemClick = (e) => {
    const target = kdc.filter((item) => {
      return item.name === e.target.outerText;
    });
    setRepresentative_KDC_Element(target[0]);
    setRepresentative_KDC_Track(target[0].track);
    setRepresentative_KDC((prev) => !prev);

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
      alert("치명적인 오류");
    }
  };

  const handleDetailItemClick = (e) => {
    setDetail_KDC_Element(e.target.outerText);
    setDetail_KDC(true);
  };

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
      <Container textAlign="center">
        <Header as="h2" icon>
          <Icon name="book" />
          게시글 작성하기
          <Header.Subheader>
            작성할 게시글의 장르를 먼저 선택해주세요.
          </Header.Subheader>
        </Header>

        {representative_KDC ? (
          <>
          </>
        ) : (
          <>
            <Menu vertical size="massive" style={{marginLeft : "15%"}}>
              <Dropdown item text="1단계 : 장르 선택하기">
                <Dropdown.Menu>
                  {kdc.map((item) => (
                    <Dropdown.Item key={item.id} onClick={handleItemClick}>
                      {item.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </>
        )}
        {detail_KDC ? (
          <>
          </>
        ) : (
          <>
            {representative_KDC ? (
              <>
                <Menu vertical size="massive" style={{marginLeft : "55%"}}>
                  <Dropdown item text="2단계 : 세부 장르 선택하기">
                    <Dropdown.Menu>
                    <Dropdown.Header icon='tags' content={` 선택된 대표장르 : ${representative_KDC_Element.name}`} />
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
      </Container>
        {representative_KDC && detail_KDC && (
          <div style={{margin:30, textAlign:"center"}}>
            <Grid centered columns={2}>
              <Grid.Row Column={2}>
                <Grid.Column width = {3} centered >
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
                <Grid.Column width = {3} centered style={{marginLeft:15}}>
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
            <Button
              onClick={retrySelect}
              content="다시 선택하기"
              labelPosition="left"
              icon="redo"
              inverted
              color="red"
              style={{marginTop:100,marginLeft : 8}}
            />
            <Button
              onClick={retrySelect}
              content="선택 완료하기"
              labelPosition="left"
              icon="redo"
              inverted
              color="violet"
              style={{marginTop:100, marginLeft:50}}
            />
          </div>
        )}

    </>
  );
};

export default Post;

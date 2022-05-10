import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  Message,
  Popup,
} from "semantic-ui-react";
import { Image} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function PostArea({
  representative_KDC_Name,
  detail_KDC_Name,
}) {
  const router = useRouter();

  // 서버의 현재시간을 담을 state
  const [time, setTime] = useState(0);

  // 뒤로가기 버튼 click event
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  useEffect(() => {
    // 서버 현재시간
    setTime(new Date().getTime());
  }, []);

  return (
    <>
      <Message
        info
        header={`선택된 대표 장르는 "${representative_KDC_Name}" 입니다.`}
        content={`선택된 세부 장르는 "${detail_KDC_Name}" 입니다.`}
      />

      <Message warning>
        <Message.Header>혹시 다른 장르를 선택하시고 싶으신가요?</Message.Header>
        <p>돌아가시려면 버튼을 클릭해주세요!</p>
        <Button
          content="돌아가기"
          icon="undo"
          labelPosition="left"
          onClick={returnClick}
          inverted
          color="black"
        />
      </Message>

      <Divider horizontal style={{ marginTop: 20 }}>
        <Header as="h4">
          <Icon name="clipboard" />
          게시하기
        </Header>
      </Divider>

      {/* 게시글 */}
      <Grid style={{ marginLeft: 10 }}>
        <Grid columns={3}>
          <Grid.Row centered columns={4} color="white" textAlign="center">
            <Grid.Column>
              <div style={{ display: "flex" }}>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>게시글 제목</Card.Header>
                        <Card.Description>게시글 작성자</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header>클릭으로 확인하기</Popup.Header>
                </Popup>
                {/*

               : 게시시간이 1분 미만인 것에 대해 new
               : 서버시간 - 작성시간이 60만 밀리초(10분) 이하이면 new
              */}

                {new Date().getTime() - time < 600000 ? (
                  <>
                    <Label
                      as="a"
                      color="red"
                      tag
                      style={{ width: 60, height: "5%", textAlign: "center" }}
                    >
                      new
                    </Label>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps({ params: { params } }) {
  let [representative_KDC_Element, detail_KDC_Element] = params;

  console.log(params);
  return {
    props: {
      representative_KDC_Name: representative_KDC_Element,
      detail_KDC_Name: detail_KDC_Element,
    },
  };
}

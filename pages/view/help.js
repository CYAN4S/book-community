import {
  Card,
  Container,
  Divider,
  Header,
  Image,
  Icon,
  Grid,
  Popup,
  Rating,
} from "semantic-ui-react";
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Help = () => {
  const router = useRouter();
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }
  return (
    <>
      <div>
        <Container fluid textAlign="center" style={{ width: "90%" }}>
          <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
            <Icon name="question circle" circular />
            <Header.Content> 도움말</Header.Content>
          </Header>
          <div>
            <Icon
              name="caret left"
              style={{ cursor: "pointer" }}
              onClick={returnClick}
            ></Icon>
            <strong style={{ cursor: "pointer" }} onClick={returnClick}>
              뒤로가기
            </strong>
          </div>
          <Divider horizontal style={{ marginBottom: 30 }}>
            <Header as="h4">
              <Icon name="tag" />
              Kinds
            </Header>
          </Divider>
          <Grid columns={3} style={{ marginLeft: 10 }}>
            <Grid.Row centered columns={4} color="black" textAlign="center">
              <Link href="./helps/help_community">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>COMMUNITY</Card.Header>
                          <Card.Description>사용자와 대화하기</Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      커뮤니티 이용 방법에 대해 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도{" "}
                      <Rating icon="star" defaultRating={5} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>

              <Link href="./helps/help_profile">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>PROFILE</Card.Header>
                          <Card.Description>프로필 설정</Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      내 프로필 설정을 위한 내용을 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도{" "}
                      <Rating icon="star" defaultRating={4} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
              <Link href="./helps/help_searchbook">
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>SEARCH BOOK</Card.Header>
                        <Card.Description>책 검색</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>
                    특정 책의 검색과 그의 내용을 안내합니다.
                  </Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              </Link>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>BOOK SUGGESTION</Card.Header>
                        <Card.Description>책 추천</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>
                    책 추천 시스템에 대한 내용을 안내합니다.
                  </Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={4} color="black" textAlign="center">
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>SEARCH LIB</Card.Header>
                        <Card.Description>도서관 검색</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 270 }}>
                    특정 책과 관련된 도서관 확인에 대한 내용을 안내합니다.
                  </Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={3} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>INQUIRE/REPORT</Card.Header>
                        <Card.Description>문의/신고</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 270 }}>
                    문의/신고에 대한 내용을 안내합니다.
                  </Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={2} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>SUBSCRIBER</Card.Header>
                        <Card.Description>구독자 관리</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 310 }}>
                    구독자 관리에 대한 방법에 대해 안내합니다.
                  </Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={3} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered columns={4} color="black" textAlign="center">
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>NONE</Card.Header>
                        <Card.Description>NONE</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>NONE</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={5} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>NONE</Card.Header>
                        <Card.Description>NONE</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>NONE</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>NONE</Card.Header>
                        <Card.Description>NONE</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>NONE</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={
                    <Card>
                      <Image src="/bookstamp.png" />
                      <Card.Content>
                        <Card.Header>NONE</Card.Header>
                        <Card.Description>NONE</Card.Description>
                      </Card.Content>
                    </Card>
                  }
                >
                  <Popup.Header style={{ width: 300 }}>NONE</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right" />
                    추천도{" "}
                    <Rating icon="star" defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default Help;

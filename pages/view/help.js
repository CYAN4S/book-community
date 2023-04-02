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
import withTransition from "../../public/HOC/withTransition";

const Help = () => {
  const router = useRouter();
  function returnClick(e) {
    e.preventDefault();
    router.back();
  }

  return (
    <>
      <div className = "wrap">
        <Container fluid textAlign="center" style={{ width: "95%" }}>
          <Header as="h2" icon textAlign="center" style={{ marginBottom: 10 }}>
            <Icon name="question circle" circular />
            <Header.Content> 도움말 </Header.Content>
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
          <Grid columns={3} centered>
            <Grid.Row columns={4} color="black" textAlign="center">
              <Link href="./helps/help_community">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>
                            <p className="guide_name">COMMUNITY</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text"> 사용자와 대화하기</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      커뮤니티 이용 방법에 대해 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
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
                          <Card.Header>
                            <p className="guide_name">PROFILE</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text">프로필 설정</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      내 프로필 설정을 위한 내용을 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
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
                          <Card.Header>
                            <p className="guide_name">SEARCH BOOK</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text"> 책 검색</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      특정 책의 검색과 그의 내용을 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
                      <Rating icon="star" defaultRating={4} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
              <Link href="./helps/help_share">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>
                            <p className="guide_name">SHARE EXPERIENCE</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text">경험 공유</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 300 }}>
                      다른 사용자의 책 관련 정보를 확인할 수 있어요!
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
                      <Rating icon="star" defaultRating={4} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
            </Grid.Row>
            <Grid.Row centered columns={4} color="black" textAlign="center">
              <Link href="./helps/help_searchLib">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>
                            <p className="guide_name">SEARCH LIB</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text"> 도서관 검색</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 270 }}>
                      특정 책과 관련된 도서관 확인에 대한 내용을 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
                      <Rating icon="star" defaultRating={3} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
              <Link href="./helps/help_help">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>
                            <p className="guide_name">
                              INQUIRE
                              <br />
                              REPORT
                            </p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text"> 문의/신고</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 270 }}>
                      문의/신고에 대한 내용을 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
                      <Rating icon="star" defaultRating={2} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
              <Link href="./helps/help_subscriber">
                <Grid.Column>
                  <Popup
                    trigger={
                      <Card>
                        <Image src="/bookstamp.png" />
                        <Card.Content>
                          <Card.Header>
                            <p className="guide_name">SUBSCRIBER</p>
                          </Card.Header>
                          <Card.Description>
                            <p className="guide_text"> 구독자 관리</p>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    }
                  >
                    <Popup.Header style={{ width: 310 }}>
                      구독자 관리에 대한 방법에 대해 안내합니다.
                    </Popup.Header>
                    <Popup.Content>
                      <Icon name="hand point right" />
                      추천도
                      <Rating icon="star" defaultRating={3} maxRating={5} />
                    </Popup.Content>
                  </Popup>
                </Grid.Column>
              </Link>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <style jsx>{`
        div {
          margin-top: 30px;
          text-align: right;
        }

        .wrap{
          height : 100vh;
        }
        .guide_name {
          font-size: 18px;
          text-align: center;
        }

        .guide_text {
          font-size: 10px;
          text-align: center;
        }

        @media (max-width: 1023px) {
          .guide_name {
            font-size: 13px;
            text-align: center;
          }
        }

        @media (max-width: 767px) {
          .guide_name {
            font-size: 9px;
            text-align: center;
          }

          .guide_text {
            font-size: 6px;
            text-align: center;
          }
        }



      `}</style>
    </>
  );
};

export default withTransition(Help);

import {
  Button,
  Card,
  Container,
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
  Popup,
  Rating,
} from "semantic-ui-react";
import React from "react";

const Help = () => {
  return (
    <>
      <div>
        <Container fluid>
          <Header as="h2">도움말 페이지</Header>
          <Grid columns={4}>
            <Grid.Row>
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
                  <Popup.Header style={{width:300}}>커뮤니티 이용에 대한 방법을 안내합니다.</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right"/>추천도  <Rating icon='star' defaultRating={5} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header style={{width:300}}>내 프로필 설정을 위한 내용을 안내합니다.</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right"/>추천도  <Rating icon='star' defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header style={{width:300}}>특정 책의 검색과 그의 내용을 안내합니다.</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right"/>추천도  <Rating icon='star' defaultRating={4} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header style={{width:270}}>특정 책과 관련된 도서관 확인에 대한 내용을 안내합니다.</Popup.Header>
                  <Popup.Content>
                    <Icon name="hand point right"/>추천도  <Rating icon='star' defaultRating={3} maxRating={5} />
                  </Popup.Content>
                </Popup>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
      <style jsx>{`
        div {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Help;

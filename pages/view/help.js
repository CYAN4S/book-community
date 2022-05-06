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
                  <Popup.Header>확인하기</Popup.Header>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header>확인하기</Popup.Header>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header>확인하기</Popup.Header>
                </Popup>
              </Grid.Column>
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
                  <Popup.Header>확인하기</Popup.Header>
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

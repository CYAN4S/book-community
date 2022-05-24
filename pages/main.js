import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";

export default function Main() {
  const HomepageHead = () => (
    <Container text>
      <Header
        as="h1"
        content="We Are Bookstamp"
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
      <Header
        as="h2"
        content="find wider communication"
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1em",
        }}
      />
      <Button inverted size="huge">
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Container>
  );

  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: "100vh", padding: "1em 0em" }}
        vertical
      >
        <HomepageHead />
      </Segment>
    </>
  );
}

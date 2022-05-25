import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import withTransition from "../public/HOC/withTransition";

 function Main() {
  const router = useRouter();

  // When click event occurs, go to WE page
  const onClick = () => {
    router.push("/we");
  }

  // header component
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
          marginBottom: "11.5em",
        }}
      />
      <Button inverted size="huge" onClick={onClick}>
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
        style={{ minHeight: "100vh", padding: "1em 0em", marginTop : -35, marginLeft : -10, marginRight : -10 }}
        vertical
      >
        <HomepageHead />
      </Segment>
    </>
  );
}

export default withTransition(Main);
import {
  Segment,
} from "semantic-ui-react";


import withTransition from "../public/HOC/withTransition";
import HomepageHead from "../Components/HomepageHead";

function Main() {


  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: "100vh",
          padding: "1em 0em",
          marginTop: -35,
          marginLeft: -10,
          marginRight: -10,
        }}
      >
        <HomepageHead />
      </Segment>
    </>
  );
}

export default withTransition(Main);

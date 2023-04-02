import AuthForm from "../Components/AuthForm";
import { Container, Divider, Header, Icon } from "semantic-ui-react";

export default function Sign() {
  return (
    <Container style={{ width: "90%" }}>
      <div>
        <Header as="h3" style={{ paddingTop: 40 }} >
          <Icon name="book" loading />
          <Header.Content style={{marginLeft : 10}}>
          <span style={{fontSize : 35, fontFamily : "Dongle-Bold"}}>북스탬프</span>
            <Header.Subheader style={{marginLeft : 2,marginTop : 5}}><p style={{ fontFamily : "Bangers-Regular", letterSpacing : 2}}>BOOKSTAMP</p></Header.Subheader>
          </Header.Content>
        </Header>
        <Divider />
        <AuthForm />

        <div>
          <img className="ui centered medium image" src="logo.gif" />
        </div>
      </div>
    </Container>
  );
}

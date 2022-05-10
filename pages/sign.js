import AuthForm from "../Components/AuthForm";
import { Divider, Header } from "semantic-ui-react";

export default function Sign() {
  return (
    <div>
      <Header as="h3" style={{ paddingTop: 40 }} color="blue">
        북스탬프
      </Header>
      <Divider />
      <AuthForm />

      <div>
        <img className="ui centered medium image" src="logo.gif" />
      </div>
    </div>
  );
}

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "../Components/AuthForm";
import { authService } from "../firebaseConfig";
import { useRouter } from "next/router";
import { Button, Divider, Header } from "semantic-ui-react";

export default function Sign() {
  const router = useRouter();

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      //google login
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
    }
  };

  return (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <Header as="h3" style={{ paddingTop: 40 }} color="blue">
        북스탬프
      </Header>
      <Divider />

      <AuthForm />
      <div className="authBtns" style={{ marginTop:10 }}>
        <Button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google
        </Button>
      </div>
    </div>
  );
}

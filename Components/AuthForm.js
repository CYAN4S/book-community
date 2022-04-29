import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useState } from "react";
import { authService as auth } from "../firebaseConfig";
import { Button, Form, Header, Message, Divider } from "semantic-ui-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [progress, setProgress] = useState("email"); // email, password, link, signup, both

  const getTitle = () =>
    progress == "email"
      ? "더 넓은 세상이 기다리고 있습니다."
      : progress == "signup"
      ? "새로 오셨군요! 환영합니다."
      : "돌아오셨군요! 환영합니다.";

  const getButtonText = () =>
    progress == "email"
      ? "로그인 또는 회원가입"
      : progress == "signup"
      ? "회원가입"
      : "로그인";

  const getErrorText = (error) => {
    const { code } = error;
    if (code == "auth/invalid-email")
      return ["이메일 오류!", "올바른 이메일 형식이 아닙니다."];
    if (code == "auth/wrong-password")
      return ["비밀번호 오류!", "비밀번호가 올바르지 않습니다."];
    return [`치명적인 오류! (${error.code})`, error.message];
  };

  const showPasswordForm = () =>
    progress == "password" || progress == "signup" || progress == "both";

  const goPrev = (e) => {
    e.preventDefault();
    setProgress("email");
    setPassword("");
    setError(null);
  };

  const onSocialClick = async (e) => {
    e.preventDefault();

    const name = e.target.name;
    if (name === "google") {
      await signInWithPopup(auth, new GoogleAuthProvider());
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (progress == "email") {
      fetchSignInMethodsForEmail(auth, email)
        .then((methods) => {
          console.log(methods);
          if (methods.length == 0) setProgress("signup");
          else if (methods.includes("password")) setProgress("password");
          else setError(["소셜 로그인을 통해 로그인해주세요.", `사용할 수 있는 방법은 다음과 같습니다: ${methods}`])
        })
        .catch((error) => setError(getErrorText(error)));
      return;
    }

    if (progress == "password") {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        setError(getErrorText(error))
      );
      return;
    }

    if (progress == "signup") {
      createUserWithEmailAndPassword(auth, email, password).catch((error) =>
        setError(getErrorText(error))
      );
      return;
    }
  };

  return (
    <>
      <Header>{getTitle()}</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={progress != "email"}
          />
        </Form.Field>

        <Form.Field style={showPasswordForm() ? {} : { display: "none" }}>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>

        {progress == "signup" && (
          <p>회원가입을 진행하게 되면, 이용약관에 동의하게 됩니다.</p>
        )}

        <Button type="submit">{getButtonText()}</Button>

        {showPasswordForm() && (
          <Button onClick={goPrev}>다른 이메일로 시작</Button>
        )}
      </Form>

      <Divider horizontal>또는</Divider>

      <Button name="google" onClick={onSocialClick}>
        Continue with Google
      </Button>

      {error && <Message error header={error[0]} content={error[1]} />}
    </>
  );
}

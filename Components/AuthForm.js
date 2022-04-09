import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authService } from "../firebaseConfig";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      if (newAccount) {
        // create Account
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // sign
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  const toggleAccount = () => setNewAccount(!newAccount);

  return (
    <>
      <Form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="authInput"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="authInput"
          required
        />

        <span style={{display:"flex", alignItems:"center"}}>
          <Button
            type="submit"
            value={newAccount ? "Create Account" : "Log in"}
            style={{ marginTop: 10, marginBottom: 10 }}
            className="authInput authSubmit">
            시작하기
          </Button>
          <p onClick={toggleAccount} style={{marginLeft:5, borderBottom:"1px solid black", cursor : "pointer"}}> {newAccount ? "로그인으로" : "회원가입으로"} </p>
        </span>
      </Form>
      <strong>오류발생! </strong> {error && <span className="authError">{error}</span>}
    </>
  );
}

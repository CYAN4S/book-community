import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authService } from "../firebaseConfig";
import { useRouter } from "next/router";
import { Button, Form, Header } from "semantic-ui-react";

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
      <div>
        <Header
          as="h3"
          style={{ color: "white", background: "black", borderRadius: 10 }}
        >
          {newAccount ? "CreateAccount" : "Login"}
        </Header>
        <Form
          onSubmit={onSubmit}
          className="container"
          style={{ marginBottom: 10 }}
        >
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

          <span style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              value={newAccount ? "Create Account" : "Log in"}
              style={{ marginTop: 10, marginBottom: 10 }}
              className="authInput authSubmit"
            >
              시작하기
            </Button>
            <p onClick={toggleAccount} className="changeBtn">
              {newAccount ? "로그인으로" : "회원가입으로"}{" "}
            </p>
          </span>
        </Form>

        {error && (
          <>
            <strong style={{ color: "red" }}>오류발생!</strong>{" "}
            <p style={{ marginLeft: 10 }}>{error}</p>
          </>
        )}
      </div>
      <style jsx>{`
              .changeBtn {
                margin-left : 5px;
                border-Bottom : 1px solid black;
                cursor : pointer;
                font-size : 15px;
              }

              .changeBtn:hover {
                font-weight : bold;
              }
            `}</style>
      
    </>
  );
}

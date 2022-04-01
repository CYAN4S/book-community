import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import AuthForm from "../Components/AuthForm";
import { authService } from "../firebaseConfig";

export default function Sign() {
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
    <div>
      <AuthForm />
      <div className="authBtns">
        <button name="google" onClick={onSocialClick} className="authBtn">
          Continue with Google
        </button>
      </div>
    </div>
  );
}

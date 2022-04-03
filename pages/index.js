import { useState, useEffect } from "react";
import { authService } from "../firebaseConfig";
import Sign from "./sign";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isSigned, setIsSigned] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 로그인 되어 있다면
        setIsSigned(true);
        router.push("/home");
      } else {
        // 로그인 되어있지 않다면
        setIsSigned(false);
      }
      setInit(true);
    }, []);
  });

  return (
  <>
    {init ? <Sign /> : "Loading..."}
  </>
  );
}

import { useState, useEffect } from "react";
import { authService } from "../firebaseConfig";
import Sign from "./sign";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isSigned, setIsSigned] = useState(false);
  const [init, setInit] = useState(false);

  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 로그인 되어 있다면
        setIsSigned(true);
        
        // push를 사용하지 않음 : https://sunny921.github.io/posts/vuejs-router-03/
        router.replace("/main");
      } else {
        // 로그인 되어있지 않다면
        setIsSigned(false);
      }
      setInit(true);
    }, []);
  });

  return <>{init ? <Sign /> : "Loading..."}</>;
}

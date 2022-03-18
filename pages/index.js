
import { useState, useEffect } from "react";
import { authService } from "../firebaseConfig";
import Sign from "./sign";

export default function Home() {
  const [isSigned, setIsSigned] = useState(false);
  const [init, setInit] = useState(true);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      console.log(authService.currentUser);
      if(user){
        // 로그인 되어 있다면
        setIsSigned(true);
      }else{
        // 로그인 되어있지 않다면
        setIsSigned(false);
      }
      setInit(true);
    })
  }, [])

  return (
   <>
    {init ? <Sign/> : "Initializing.."}
   </>
  )
}
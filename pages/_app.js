import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";

import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { currentUserState } from "../utils/hooks";
import { getUserDoc } from "../utils/functions";
import { authService as auth, dbService as db } from "../firebaseConfig";

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <RecoilComponent />
      <div style={{ margin: "10px" }}>
        <Navigation />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

function RecoilComponent() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserDoc(user.uid);
        setCurrentUser({ uid: user.uid, ...userData });
      }
    });

    return () => unsub();
  }, []);

  return <></>;
}

export default MyApp;

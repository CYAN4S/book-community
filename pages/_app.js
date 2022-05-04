import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";

// React
import React from "react";
import { useState, useEffect } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { authService as auth, dbService as db } from "../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import { onUserDocSnapshot } from "../utils/functions";

// Recoil
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { currentUserState } from "../utils/hooks";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <RecoilComponent />
        <div style={{ margin: "10px" }}>
          <Navigation />
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </React.StrictMode>
  );
}

function RecoilComponent() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    let docUnsub, authUnsub;

    authUnsub = onAuthStateChanged(auth, async (user) => {
      docUnsub = onMeta(user?.uid, setCurrentUser);
    });

    return () => {
      authUnsub?.();
      docUnsub?.();
    };
  }, []);

  return <></>;
}

// TODO
const onMeta = (uid, setCurrentUser) => {
  if (!uid) return null;
  return onUserDocSnapshot(uid, setCurrentUser);
};

export default MyApp;

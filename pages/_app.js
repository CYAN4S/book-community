import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";
import Script from "next/script";
import { Header } from "semantic-ui-react";
import "../public/static/fonts/style.css";
// React
import React from "react";
import { useState, useEffect } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { authService as auth, dbService as db } from "../firebaseConfig";

import { onUserDocSnapshot } from "../utils/functions";

// Recoil
import { RecoilRoot, useRecoilState } from "recoil";
import { currentUserState } from "../utils/hooks";

function MyApp({ Component, pageProps }) {
  const key = process.env.NEXT_PUBLIC_KAKAO_AUTHKEY;
  return (
    <RecoilRoot>
      <RecoilComponent />
      <div >
        <div className="main">
          <Header as="h1" inverted color="blue" style={{marginTop : 30, marginLeft : 10}}>
          <Header.Content style={{marginLeft : -50, fontSize: 20, fontFamily : "Gugi-Regular"}}>새로운 소통을 꿈꾸는</Header.Content>
            <p style = {{fontFamily: "GamjaFlower-Regular", marginTop : -15, marginBottom:30, fontSize: 40}}>BOOKSTAMP</p>
            
          </Header>
        </div>

        {/* 카카오 맵 API를 사용하기 위함 */}
        <Script
          type="text/javascript"
          src={
            "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
            key +
            `&libraries=services,clusterer&autoload=false`
          }
        ></Script>
        <div style={{ margin: 10 }}>
          <Navigation />
          <div style={{ marginTop: 35 }}>
            <Component {...pageProps} style={{ marginTop: 10 }} />
          </div>
        </div>
        <style jsx>{`
          .main {
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            align-items: center;
            height: 80px;
          }
        `}</style>
      </div>
    </RecoilRoot>
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

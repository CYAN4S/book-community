import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";
import Script from "next/script";
import { Header } from "semantic-ui-react";
import "../public/static/fonts/style.css";

// React
import React from "react";
import { useEffect } from "react";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import { authService as auth, dbService as db } from "../firebaseConfig";

import { onUserDocSnapshot } from "../utils/functions";

// Recoil
import { RecoilRoot, useRecoilState } from "recoil";
import { currentUserState } from "../utils/hooks";

import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  const key = process.env.NEXT_PUBLIC_KAKAO_AUTHKEY;
  const router = useRouter();
  return (
    <AnimatePresence>
      <RecoilRoot>
        <RecoilComponent />

        {/*By dividing router.pathname, 
          _app.js manages the parts that need to be output and those that don't.*/}
        <div>
          {router.pathname === "/main" ? (
            <></>
          ) : (
            <>
              <div className="main">
                <Header
                  as="h1"
                  inverted
                  color="violet"
                  style={{ marginTop: 50, marginLeft: -30 }}
                >
                  <Header.Content
                    style={{
                      marginLeft: -50,
                      fontSize: 20,
                      fontFamily: "Gugi-Regular",
                    }}
                  >
                    새로운 소통을 꿈꾸는
                  </Header.Content>
                  <p
                    style={{
                      fontFamily: "GamjaFlower-Regular",
                      marginTop: -15,
                      marginLeft: 70,
                      marginBottom: 30,
                      fontSize: 40,
                    }}
                  >
                    BOOKSTAMP
                  </p>
                </Header>
              </div>
            </>
          )}

          {/* To use the Kakao Map API */}
          <Script
            type="text/javascript"
            src={
              "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
              key +
              `&libraries=services,clusterer&autoload=false`
            }
          ></Script>
          <div style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
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
    </AnimatePresence>
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

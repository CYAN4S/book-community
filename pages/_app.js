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

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div style={{ margin: "10px" }}>
        <Navigation />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
export default MyApp;

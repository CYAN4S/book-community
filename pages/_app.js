import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebaseConfig";
import Script from "next/script";

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  const key = process.env.NEXT_PUBLIC_KAKAO_AUTHKEY;
  return (
    <>
      <Script
        type="text/javascript"
        src={
          "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
          key +
          `&libraries=services,clusterer&autoload=false`
        }
      ></Script>
      <div style={{ margin: "10px" }}>
        <Navigation />
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;

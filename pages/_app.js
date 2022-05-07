import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebaseConfig";
import Script from "next/script";
import { Header, Image } from "semantic-ui-react";

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  const key = process.env.NEXT_PUBLIC_KAKAO_AUTHKEY;
  return (
    <div>
      <div className="main">
      <Header as='h1' inverted color='blue'>
        BOOKSTAMP
      </Header>
    

      </div>
      
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
          margin-top : 20px;
          display : flex;
          justify-content : space-around;
          text-align : center;
          align-items : center;
          height : 80px;
        }
      `}</style>
    </div>
  );
}
export default MyApp;

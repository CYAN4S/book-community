import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Navigation from "../Components/Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "../firebaseConfig";
import Script from "next/script";
import { Image } from "semantic-ui-react";

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  const key = process.env.NEXT_PUBLIC_KAKAO_AUTHKEY;
  return (
    <div>
      <div className="img_wrap">
        <Image 
          src="bookstamp.png"
          width = '25%'
          height = '25%'
          />
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
        <Navigation/>
        <div style={{marginTop: 35}}>
          <Component {...pageProps} style={{marginTop: 10}}/>
        </div>
      </div>
      <style jsx>{`
        .img_wrap {
          display:flex;
          justify-content: center;
          align-items : center;
        }

      `}</style>
    </div>
  );
}
export default MyApp;

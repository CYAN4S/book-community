import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Navigation from "../Components/Navigation"

// TODO: Replace the following with your app's Firebase project configuration
function MyApp({ Component, pageProps }) {
  return (
    <div style={{margin : '10px'}}>
      <Navigation />
      <Component {...pageProps} />
    </div>
    
  )
}
export default MyApp

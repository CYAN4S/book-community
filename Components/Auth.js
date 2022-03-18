import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = () => {
    const onSocialClick = async(event) =>{
        const {
            target : {name}
        } = event;

        let provider;
        if(name === "google"){
            //google login
            provider = new GoogleAuthProvider();
        }else if(name === "github"){
            //google github
            provider = new GithubAuthProvider();
        }

        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <div className="authBtns">
                <button name = "google" onClick={onSocialClick} className="authBtn">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button name = "github" onClick={onSocialClick} className="authBtn">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}



export default Error404;
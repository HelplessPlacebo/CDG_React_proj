import React, {useState} from "react";
import {SignIn} from "./SignIn/SignIn";
import LS from "./AuthModal.module.css";
import {SignUp} from "./SignUp/SignUp";
import {TShowSnackBar} from "../../App";

type TAuthPageProps = {
    showSnackBar: TShowSnackBar
    onAuth: () => void
    onUnAuth: () => void
}

export const AuthPage: React.FC<TAuthPageProps> = (props) => {
    const [componentToDraw, setComponentToDraw] = useState("login")
    const componentIsSignIn = () => setComponentToDraw("login")
    const componentIsSignUp = () => setComponentToDraw("registration")
    return <div className={LS.modal}>
        {
            componentToDraw === "login"
                ? <SignIn componentIsSignUp={componentIsSignUp} onAuth={props.onAuth}/>
                : <SignUp componentIsSignIn={componentIsSignIn} showSnackBar={props.showSnackBar}/>
        }
    </div>
}


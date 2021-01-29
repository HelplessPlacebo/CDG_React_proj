import React, {useState} from "react";
import {SignIn} from "./SignIn/SignIn";
import LS from "./AuthModal.module.css";
import {SignUp} from "./SignUp/SignUp";
import {TShowSnackBar} from "../../App";

type TAuthPageProps = {
    ShowSnackBar: TShowSnackBar
    onAuth: () => void
    onUnAuth: () => void
}

export const AuthPage: React.FC<TAuthPageProps> = (props) => {
    const [ComponentToDraw, SetComponentToDraw] = useState("login")
    const ComponentIsSignIn = () => SetComponentToDraw("login")
    const ComponentIsSignUp = () => SetComponentToDraw("registration")
    return <div className={LS.modal}>
        {
            ComponentToDraw === "login"
                ? <SignIn ComponentIsSignUp={ComponentIsSignUp} onAuth={props.onAuth}/>
                : <SignUp ComponentIsSignIn={ComponentIsSignIn} ShowSnackBar={props.ShowSnackBar}/>
        }
    </div>
}


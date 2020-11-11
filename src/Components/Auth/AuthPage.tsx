import React,{useState} from "react";
import SignIn from "./Login/SignIn";
import LS from "./Login/LoginModal.module.css";
import SignUp from "./Registartion/SignUp";
import {TShowSnackBar} from "../../App";
type TAuthPageProps = {
    ShowSnackBar: TShowSnackBar
}

const AuthPage : React.FC<TAuthPageProps> = (props) =>{
    const [ComponentToDraw,SetComponentToDraw] =useState("login")
    const ComponentIsSignIn = ()=>SetComponentToDraw("login")
    const ComponentIsSignUp =() => SetComponentToDraw("registration")
    return <div className="AuthWrapper">
            <div className={LS.modal}>
                {
                    ComponentToDraw === "login"
                        ?  <SignIn ComponentIsSignUp={ComponentIsSignUp}
                        />
                        : <SignUp ComponentIsSignIn={ComponentIsSignIn} ShowSnackBar={props.ShowSnackBar}/>
                }
            </div>
            <div className={LS.bg}/>
    </div>
}
export default AuthPage
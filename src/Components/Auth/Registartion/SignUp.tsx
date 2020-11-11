import React, {useState} from "react";
import AuthForm from "../AuthForm";
import {TShowSnackBar} from "../../../App";

type TRegistrationProps = {
    ComponentIsSignIn: () => void
    ShowSnackBar: TShowSnackBar
}
const SignUp: React.FC<TRegistrationProps> = (props) => {
    const [RegistrationErr, SetRegistrationErr] = useState<string | null>(null)
    const onSignUp = (EmailFieldValue: string, PasswordFieldValue: string) => {
        // here will be request on server for make a new account
        if (true) {
            // check response from server , if ok - show confirm window, else - show error
            props.ShowSnackBar({
                position: {horizontal: "center", vertical: "top"},
                HideDuration: 5000,
                severity: "success",
                message: "account was created, please check your email"
            })
        } else {
            SetRegistrationErr("someErr")
        }
    }
    return <div className="SignUp">
        <AuthForm ConfirmButtonHandler={onSignUp} GoBackButtonHandler={props.ComponentIsSignIn}
                  ConfirmButtonText={"Confirm"} GoBackButtonText={"Sign in"}
                  ConfirmButtonStyles={{color: "secondary", variant: "contained"}}
                  GoBackButtonStyles={{color: "primary", variant: "outlined"}}
                  CustomErr={RegistrationErr}/>

    </div>
}
export default SignUp
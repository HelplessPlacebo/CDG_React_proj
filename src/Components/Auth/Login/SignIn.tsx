import React,{useState} from "react";
import AuthForm from "../AuthForm";

type TLoginProps = {
    ComponentIsSignUp: () => void
}

const SignIn: React.FC<TLoginProps> = (props) => {
    const [AuthErr,SetAuthErr] = useState<string | null>(null)
    const EmailHandler = (EmailFieldValue : string,PasswordFieldValue : string) => {
        if (EmailFieldValue === "test" && PasswordFieldValue === "test") {
            SetAuthErr(null)
            localStorage.setItem("IsAuth", "true")
            window.location.reload()
        }else{
            SetAuthErr("incorrect login or password")
        }
    }

    return (<div className="SignInForm">
            <AuthForm ConfirmButtonHandler={EmailHandler} GoBackButtonHandler={props.ComponentIsSignUp}
                      ConfirmButtonText={"Login"} GoBackButtonText={"Sign up"}
                      ConfirmButtonStyles={{color:"primary",variant:"contained"}}
                      GoBackButtonStyles={{color : "secondary",variant:"outlined"}}
                      CustomErr={AuthErr}/>
        </div>
    );
}

export default SignIn
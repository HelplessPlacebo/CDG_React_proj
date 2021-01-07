import React from "react"
import {SignInFormRedux} from "./SignInForm"
import {useHistory} from 'react-router-dom'

type TSignInProps={
    ComponentIsSignUp:()=>void
    onAuth:()=>void
}
export type TLoginFormData={
    email:string,
    password : string
}
const SignIn:React.FC<TSignInProps> = props => {
    const history=useHistory()
    const handleSubmit = (formData : TLoginFormData) => {
        if (formData.email === "test@g.com" && formData.password === "test") {
            localStorage.setItem("IsAuth", "true")
            props.onAuth()
            history.replace("/")
        }
    }

    return <div className="SignInContainer">
        <SignInFormRedux onSubmit={handleSubmit} ComponentIsSignUp={props.ComponentIsSignUp}/>
    </div>
}

export default SignIn
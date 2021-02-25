import React, {useState} from "react"
import {SignInFormRedux} from "./SignInForm"
import {useHistory} from 'react-router-dom'

type TSignInProps={
    componentIsSignUp:()=>void
    onAuth:()=>void
}
export type TLoginFormData={
    email:string,
    password : string
}
export const SignIn:React.FC<TSignInProps> = props => {
    const history=useHistory()
    const [authErr,setAuthErr] = useState<string[]>([])
    const handleSubmit = (formData : TLoginFormData) => {
        if (formData.email === "test@g.com" && formData.password === "test") {
            localStorage.setItem("IsAuth", "true")
            props.onAuth()
            history.replace("/")
        }else setAuthErr([...authErr,"incorrect email or password"])
    }

    return <div className="SignInContainer">
        <SignInFormRedux onSubmit={handleSubmit} componentIsSignUp={props.componentIsSignUp} authErr={authErr}/>
    </div>
}
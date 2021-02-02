import React from "react"
import Grid from "@material-ui/core/Grid"
import {CustomizedButton} from "../../CustomElements/CustomizedButton/CustomizedButton"
import {CreateField, FormInput} from "../../../assets/utils/ValidartorsComponents/ElementsValidators"
import {required, Email} from "../../../assets/utils/validators"
import {reduxForm, InjectedFormProps} from "redux-form"
import {TLoginFormData} from "./SignIn";

export type TOwnProps = {
    componentIsSignUp: () => void
    authErr: string[]
}

const SignInForm: React.FC<InjectedFormProps<TLoginFormData, TOwnProps> & TOwnProps> = (props) => {
    return <form style={{paddingTop: "1.5rem", paddingRight: "2rem", paddingLeft: "2rem"}} onSubmit={props.handleSubmit}
                 className={"SignInFormContainer"}>

        <div style={{fontSize: "1.512rem", fontWeight: 500}} className="SignInFormHeader">
            Sign in
        </div>


        {
            props.authErr.length > 0 &&
            <div style={{color: "#ea1f09", fontSize: "1.275rem", padding: "1rem"}} className="SubmitAuthFormErr">
                <span>
                    {props.authErr[0]}
                </span>
            </div>
        }

        <div className="SignInEmailInput">
            {CreateField("Enter your email", "email", [required, Email],
                FormInput, {label: "email", fullWidth: true, helperText: "test@g.com - for tests"})}
        </div>

        <div className="SignInPassWordInput">
            {CreateField("Enter your password", "password", [required],
                FormInput, {label: "password", type: "password", fullWidth: true, helperText: "test - for tests"})}
        </div>

        <div style={{paddingTop: "1rem"}} className="SignInControlButton">
            <Grid container direction="row" justify="space-evenly" alignItems="center">

                <Grid item>
                    <CustomizedButton onClick={props.handleSubmit} text="enter"
                                      variant="contained" bgColor="green"
                                      fontSize="1.11rem"/>
                </Grid>

                <Grid item>
                    <CustomizedButton onClick={props.componentIsSignUp} text="sign up"
                                      variant="contained" bgColor="blue" fontSize="1.11rem"/>
                </Grid>
            </Grid>
        </div>

        {props.error
            ?
            <div style={{paddingTop: "2rem", paddingLeft: "1.12rem", fontSize: "1.125rem", color: "#ea1f09"}}>
                {props.error}
            </div>
            : null
        }
    </form>
}

export const SignInFormRedux = reduxForm<TLoginFormData, TOwnProps>({
    form: 'loginForm',
})(SignInForm);
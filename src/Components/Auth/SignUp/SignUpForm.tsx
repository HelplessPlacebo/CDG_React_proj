import React from "react"
import Grid from "@material-ui/core/Grid"
import {CustomizedButton} from "../../CustomElements/CustomizedButton/CustomizedButton"
import {CreateField, FormInput} from "../../../assets/utils/ValidartorsComponents/ElementsValidators"
import {required, Email, PassMinLength} from "../../../assets/utils/validators"
import DoneIcon from '@material-ui/icons/Done'
import {InjectedFormProps, reduxForm} from "redux-form";
import {TSignUpFormData} from "./SignUp";

type TOwnProps={
    componentIsSignIn :()=>void
}

const SignUpForm: React.FC<InjectedFormProps<TSignUpFormData, TOwnProps> & TOwnProps> = (props) => {
    return <form style={{paddingTop: "1.5rem",paddingRight:"2rem",paddingLeft:"2rem"}}  className="SignUpFormContainer"
                 onSubmit={props.handleSubmit}>

        <div style={{fontSize: "1.512rem", fontWeight: 500}} className="SignUpFormHeader">
            Sign up
        </div>

        <div className="SignUpFormNameInput">
            {CreateField("Enter your name", "name", [required],
                FormInput, {label: "name", fullWidth: true})}
        </div>

        <div className="SignUpFormEmailInput">
            {CreateField("Enter your email", "email", [required, Email],
                FormInput, {label: "email", fullWidth: true})}
        </div>

        <div className="SignUpFormPassWordInput">
            {CreateField("Enter your password", "password", [required, PassMinLength],
                FormInput, {
                    label: "password", fullWidth: true,
                    type: "password", helperText: "password must be more then 6 letters"
                })}
        </div>

        <div style={{paddingTop: "1rem"}} className="SignUpControlButtonsContainer">
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <Grid item>
                    <CustomizedButton onClick={props.handleSubmit} text="complete"
                                      variant="contained" bgColor="purple"
                                      fontSize="1.11rem" startIcon={<DoneIcon/>}/>
                </Grid>
                <Grid item>
                    <CustomizedButton onClick={props.componentIsSignIn} text="sign in"
                                      variant="contained" bgColor="teal"
                                      fontSize="1.11rem"/>
                </Grid>
            </Grid>
        </div>

        {props.error
            ?
            <div style={{paddingTop:"2rem",paddingLeft:"1.12rem", fontSize: "1.125rem", color: "#ea1f09"}}>
                {props.error}
            </div>
            : null
        }
    </form>
}

export const SignUpFormRedux = reduxForm<TSignUpFormData,TOwnProps>({form: 'SignUpForm'})(SignUpForm)

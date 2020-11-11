import React, {useState} from "react";
import LS from "./Login/LoginModal.module.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

type TRegistrationProps = {
    ConfirmButtonHandler: (EmailInputValue : string, PasswordInputValue : string) => void
    GoBackButtonHandler: () => void
    ConfirmButtonText: string
    GoBackButtonText: string
    CustomErr : string | null
    ConfirmButtonStyles :{
        variant: "contained" | "outlined"  | "text"
        color: "primary" | "secondary" | "default" | "inherit"
    }
    GoBackButtonStyles :{
        variant: "contained" | "outlined"  | "text"
        color: "primary" | "secondary" | "default" | "inherit"
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
}));

const AuthForm: React.FC<TRegistrationProps> = (props) => {
    const classes = useStyles();
    const [EmailInputValue, SetEmailInputValue] = useState("")
    const [PasswordInputValue, SetPasswordInputValue] = useState("")
    const [EmailErrText, SetEmailErrText] = useState<string | null>()
    const [PasswordErrText, SetPasswordErrText] = useState<string | null>()
    const OnEmailFieldChange = (e: any) => SetEmailInputValue(e.target.value)
    const OnPasswordFieldChange = (e: any) => SetPasswordInputValue(e.target.value)
    const onConfirm = () => {
        // this handler create for create validations to inputs and call prop confirm handler
        if(EmailInputValue.length <1 || PasswordInputValue.length <1){
            if(EmailInputValue.length < 1) SetEmailErrText("this field is required")
            else SetEmailErrText(null)
            if(PasswordInputValue.length < 1) SetPasswordErrText("this field is required")
            else SetPasswordErrText(null)
        }else{
            if(props.CustomErr){
                SetEmailErrText(props.CustomErr)
                SetPasswordErrText(props.CustomErr)
            }
            else{
                props.ConfirmButtonHandler(EmailInputValue,PasswordInputValue)
                SetEmailInputValue("")
                SetPasswordInputValue("")
                SetEmailErrText(null)
                SetPasswordErrText(null)
            }
        }

    }
    return <div className="AuthForm">
        <form className={classes.root} autoComplete="off">
            <div className={LS.InputsContainer}>
                <div className="LoginInput">

                    <TextField
                        onChange={OnEmailFieldChange}
                        error={!!EmailErrText}
                        id="standard-error-helper-text"
                        label="email"
                        value={EmailInputValue}
                        placeholder="Please, enter the login"
                        helperText={EmailErrText}
                    />

                </div>

                <div className={LS.PasswordContainer}>

                    <TextField
                        onChange={OnPasswordFieldChange}
                        error={!!PasswordErrText}
                        type={"password"}
                        id="standard-error-helper-text"
                        label="password"
                        value={PasswordInputValue}
                        placeholder="Please, enter the password"
                        helperText={PasswordErrText}
                    />

                </div>

                <Grid container style={{paddingTop: "50px", paddingLeft: "10px"}}>
                    <Grid item xs={12} sm={6}>
                        <Button style={{width: "120px"}} onClick={onConfirm} variant={props.ConfirmButtonStyles.variant}
                                color={props.ConfirmButtonStyles.color}>
                            {props.ConfirmButtonText}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button style={{width: "120px"}} onClick={props.GoBackButtonHandler}
                                variant={props.GoBackButtonStyles.variant} color={props.GoBackButtonStyles.color}>
                            {props.GoBackButtonText}
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </form>
    </div>
}
export default AuthForm
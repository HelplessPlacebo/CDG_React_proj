import React, {useState} from "react";
import LS from "./LoginModal.module.css";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
}));



const LoginModal = () => {
    const classes = useStyles();
    let [LoginFieldValue, SetLoginFieldValue] = useState("")
    let [PasswordFieldValue, SetPasswordFieldValue] = useState("")
    let [ErrorText,SetErrorText] = useState<string>()

    const onLoginInputChange = (e: any) => {
            SetLoginFieldValue(e.target.value)
    }

    const onPasswordInputChange = (e: any) => {
            SetPasswordFieldValue(e.target.value)
    }

    const LoginHandler = () => {
        if(LoginFieldValue === "test" && PasswordFieldValue === "test"){
            localStorage.setItem("IsAuth","true")
            SetErrorText(undefined)
            SetLoginFieldValue("")
            SetPasswordFieldValue("")
            window.location.reload()
        }
        else {
            SetErrorText("Incorrect login or password ")

        }
    }

    return (<div className="login-modal">
            <div className={LS.modal}>
                <form className={classes.root} autoComplete="off">
                    <div className={LS.InputsContainer}>
                        <div className={LS.LoginContainer}>

                            <TextField
                                onChange={onLoginInputChange}
                                error={!!ErrorText}
                                id="standard-error-helper-text"
                                label="login"
                                value={LoginFieldValue}
                                placeholder="Please, enter the login"
                                helperText={ErrorText}
                            />

                        </div>

                        <div className={LS.PasswordContainer}>

                            <TextField
                                onChange={onPasswordInputChange}
                                error={!!ErrorText}
                                type={"password"}
                                id="standard-error-helper-text"
                                label="password"
                                value={PasswordFieldValue}
                                placeholder="Please, enter the password"
                                helperText={ErrorText}
                            />

                        </div>

                        <div style={{paddingTop: "45px", paddingLeft: "110px"}}>
                            <Button style={{width : "120px"}} onClick={LoginHandler} variant="outlined" color="secondary">
                                Login
                            </Button>
                        </div>

                    </div>
                </form>
            </div>
            <div className={LS.bg}/>
        </div>
    );
}

export default LoginModal
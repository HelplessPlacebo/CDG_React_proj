import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export type TSnackBarOptions = {
    HideDuration? : number
    severity : "error" | "info" | "warning" | "success"
    position : {
        vertical : "bottom" | "top"
        horizontal : "left" | "right" | "center"
    }
    message : string
}
export type TSnackBarProps = {
    isShowing : boolean
    onHide : (event?: React.SyntheticEvent, reason?: string) => void
    options : TSnackBarOptions
}
const  SnackBar : React.FC<TSnackBarProps>= (props)=> {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar  open={props.isShowing} autoHideDuration={props.options.HideDuration ? props.options.HideDuration : 3000}
                      onClose={props.onHide} anchorOrigin={props.options.position}>

                <Alert onClose={props.onHide} severity={props.options.severity}>
                    {props.options.message}
                </Alert>

            </Snackbar>
        </div>
    )
}
export default SnackBar
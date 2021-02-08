import React from 'react'
import EVS from "./ElementsValidators.module.css"
import {Field} from "redux-form";
import { makeStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField/index';
import {IssuesSelectInput} from "../../../Components/Issues/Inputs/IssuesSelectInput";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            color :"#393939"
        }
    },
}));

export const FormInput = ({input,meta,...props}) =>{
    const classes = useStyles();
    return <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
        <TextField  className={classes.root}  placeholder={props.placeholder}
                    variant="outlined" {...input} {...props}/>
        {meta.error && meta.touched ?   <div style={{padding : "1rem",color : "#b20400"}}> {meta.error}</div> : ""}
    </div>
}
export const IssuesFormInput = ({input,meta,...props}) =>{
    const classes = useStyles();
    return <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
        <IssuesSelectInput  className={classes.root}
                    variant="outlined" {...input} {...props} />
        {meta.error && meta.touched ?   <div style={{padding : "1rem",color : "#b20400"}}> {meta.error}</div> : ""}
    </div>
}

export const CreateField = (placeholder,name,validators,component,props ={},text ="") => {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators}
               component={component}  {...props}/> {text}
    </div>
}
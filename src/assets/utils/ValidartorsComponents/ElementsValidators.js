import React, {useState} from 'react'
import EVS from "./ElementsValidators.module.css"
import {Field} from "redux-form";
import {makeStyles} from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField/index';
import {IssuesSelectInput} from "../../../Components/CustomElements/CustomInputs/IssuesSelectInput";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            color: "#393939"
        }
    },
    FileInput: {
        display: "none"
    },
}))


export const FormInput = ({input, meta, ...props}) => {
    const classes = useStyles();
    return <div className={meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""}>
        <TextField className={classes.root} placeholder={props.placeholder}
                   variant="outlined" {...input} {...props}/>
        {meta.error && meta.touched ? <div style={{padding: "1rem", color: "#b20400"}}> {meta.error}</div> : ""}
    </div>
}
export const IssuesFormInput = ({input, meta, ...props}) => {
    const classes = useStyles();
    return <div className={meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""}>
        <IssuesSelectInput className={classes.root}
                           variant="outlined" {...input} {...props} />
        {meta.error && meta.touched ? <div style={{padding: "1rem", color: "#b20400"}}> {meta.error}</div> : ""}
    </div>
}

export const ImgsInput = ({input, meta, ...props}) => {
    const classes = useStyles();
    const [tempImg, setTempImg] = useState(input.value)

    const onChange = (e) => {
        const file = e.target.files[0]
        if (file.type.match("image")) {
            const reader = new FileReader()
            reader.onloadend = () => setTempImg({
                file,
                prevUrl: reader.result
            })
            reader.readAsDataURL(file)
        }
    }

    return <div className={meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""}>
        <input onChange={onChange} accept="image/*" className={classes.FileInput} id="contained-button-file"
               multiple type="file" />

        <label id="contained-img" htmlFor="contained-button-file">
            <img style={{width: 100, height: 100, borderRadius: "50%", cursor: "pointer"}}
                 src={input.value ? input.value : tempImg? tempImg.prevUrl : props.defaultImg}
                 alt="user avatar"/>
        </label>
        {meta.error && meta.touched ? <div style={{padding: "1rem", color: "#b20400"}}> {meta.error}</div> : ""}
    </div>
}


export const CreateField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators}
               component={component}  {...props}/> {text}
    </div>
}
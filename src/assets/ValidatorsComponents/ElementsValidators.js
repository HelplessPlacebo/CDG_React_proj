import React from 'react'
import EVS from "./ElementsValidators.module.css"
import {Field} from "redux-form";

export const TextArea = ({input,meta,...props}) =>{

    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
         <textarea className={EVS.textarea} {...input} {...props}/>
            {meta.error && meta.touched ?  <span> &nbsp;&nbsp; {meta.error}</span> : ""}
            </div>
    )

}
export const TextAreaAboutMe = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
            <textarea className={EVS.textareaAboutMe} {...input} {...props}/>
            {meta.error && meta.touched ?  <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )

}
export const TextAreaMessage = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
            <textarea className={EVS.TextAreaMessage} {...input} {...props}/>
            {meta.error && meta.touched ?  <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )

}

export const TextAreaDialogsMessage = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
            <textarea className={EVS.TextAreaDialogsMessage} {...input} {...props}/>
            {meta.error && meta.touched ?  <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )

}



export const Input = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
            <div>
            <input className={EVS.input} {...input} {...props}/>
            </div>
            {meta.error && meta.touched ?   <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )
}

export const InputName = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >

                <input className={EVS.input} {...input} {...props}/>

            {meta.error && meta.touched ?   <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )
}
export const ContactFormInput = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
                <input className={EVS.ContactFormInput} {...input} {...props} />
            {meta.error && meta.touched ?   <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )
}
export const TaskFormInput = ({input,meta,...props}) =>{
    return(
        <div className={ meta.error && meta.touched ? EVS.formControl + " " + EVS.error : ""} >
            <input  className={EVS.TaskFormInput} {...input} {...props}/>
            {meta.error && meta.touched ?   <span> &nbsp;&nbsp; {meta.error}</span> : ""}
        </div>
    )
}

export const CreateField = (placeholder,name,validators,component,props ={},text ="") =>{
  return  <div>
        <Field   placeholder={placeholder} name={name} validate={validators}
        component={component} {...props}/> {text}

    </div>
}
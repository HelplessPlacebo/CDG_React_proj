import React from "react"

export const required = (value) => {
    if (value) {
        return undefined
    } else return <div>
        This field is required
    </div>
}

export const PhoneNumber =(value)=>{
    if(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value)) return undefined
    else return <div>
        Please,enter the correct phone number
    </div>
}
export const Email = (value)=>{
    if(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]) |(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return undefined
    else return <div>Please,enter the correct email </div>
}
export const PassMinLength = (value)=>{
    if(value.length < 6) return <div> Password must be more then 6 symbols! </div>
    else return undefined
}

export const MaxLengthCreator = (MaxLengthValue) => (value) => {
    if (value && value.length > MaxLengthValue) {
        return `Maximal length is a ${MaxLengthValue} symbols`
    } else return undefined
}
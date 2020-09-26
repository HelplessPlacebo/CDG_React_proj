import React from "react"
export type TFieldValidator = (value : string) => string | undefined | JSX.Element

export const required : TFieldValidator= (value : string) =>{
if(value ){
    return undefined
}
else return <div>
    This field is required
</div>
}


// export const MaxLengthCreator = (MaxLengthValue : number) : TFieldValidator => (value) =>{
// if(value && value.length > MaxLengthValue) {
//     return `Maximal length is a ${MaxLengthValue} symbols`
// }
// else return undefined
//     }


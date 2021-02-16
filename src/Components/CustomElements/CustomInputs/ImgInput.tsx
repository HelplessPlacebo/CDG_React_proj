import React, {Dispatch} from "react";

export type TImgValue = {
    file: object | null
    url: string | null
}
export type TImgInputProps = {
    value: TImgValue | null
    setValue: Dispatch<any>
    defaultImgUrl: string
    options?: {
        imgSize: {
            width: string
            height: string
        }
    }

}

export const ImgInput: React.FC<TImgInputProps> = (props) => {

    const onChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
        const file = e.target.files && e.target.files[0]
        if (file && file.type.match("image")) {
            const reader = new FileReader()
            reader.onloadend = () => props.setValue({
                file,
                url: reader.result
            })
            reader.readAsDataURL(file)
        }
    }

    return <div className="FileInputContainer">
        <input onChange={onChange} accept="image/*" style={{display: "none"}} id="contained-button-file"
               multiple type="file"/>

        <label id="contained-img" htmlFor="contained-button-file">
            <img style={{
                width: props.options?.imgSize.width ? props.options.imgSize.width : 100,
                height: props.options?.imgSize.height ? props.options.imgSize.height : "100px",
                borderRadius: "50%", cursor: "pointer"
            }}
                 src={props.value?.url ? props.value.url : props.defaultImgUrl}
                 alt="user avatar"/>
        </label>
    </div>
}
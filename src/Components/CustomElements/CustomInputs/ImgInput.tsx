import React, {Dispatch} from "react"
import {Grid, IconButton} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import CS from "./Inputs.module.css"
import {grey} from '@material-ui/core/colors'

export type TImgValue = {
    file: object | null
    url: string | null
}
export type onDeleteClick= (e:React.MouseEvent<HTMLElement>) => any

export type TImgInputProps = {
    value: TImgValue | null
    setValue: Dispatch<any>
    defaultImgUrl: string
    options?: {
        imgSize?: {
            width: string
            height: string
        }
        withDeleting?: boolean
        onDeleteClick?: onDeleteClick
    }
}


export const ImgInput: React.FC<TImgInputProps> = (props) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return <div className="ImgInputContainer">

        <input onChange={onChange} accept="image/*" className={CS.fileInput} id="contained-button-file"
               multiple type="file"/>

        <label id="contained-img" htmlFor="contained-button-file">
            <Grid container alignItems="center" justify="center"
                  className={props.value?.url && props.options?.withDeleting ? CS.imgContainer : undefined}>

                <img className={CS.userPhoto} style={{
                    width: props.options?.imgSize?.width ? props.options.imgSize.width : "6.25rem",
                    height: props.options?.imgSize?.height ? props.options.imgSize.height : "6.25rem",
                }} src={props.value?.url ? props.value.url : props.defaultImgUrl} alt="user avatar"/>

                {
                    props.options?.withDeleting &&
                    <IconButton onClick={props.options.onDeleteClick} className={CS.deletePhotoIcon} size="small" color="primary">
                        <DeleteIcon style={{color: grey[900]}}/>
                    </IconButton>
                }

            </Grid>
        </label>
    </div>
}
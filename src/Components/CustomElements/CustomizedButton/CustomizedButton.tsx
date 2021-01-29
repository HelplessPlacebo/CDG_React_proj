import React from 'react';
import {
    createStyles,
    withStyles,
    makeStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple,blue,grey,red,common,teal,yellow,deepOrange,orange,blueGrey,cyan,indigo} from '@material-ui/core/colors'

interface ColorType {
    [key : string] : string
}
type color = "green" | "purple" | "grey" | "red" | "blue" | "common"
    | "teal" | "yellow"| "white" | "indigo" |"cyan" |"blueGrey" | "orange" | "deepOrange"

type TCustomizedButtonProps = {
    bgColor? : color
    text : string
    variant  : "outlined" | "contained" | "text"
    fontSize : number | string
    fontColor ? : color
    startIcon ? : JSX.Element
    width ?: number
    disabled ?: boolean
    onClick?: (data : any)=>void
}

const findColorObject = (colorName:string) : ColorType  =>{
    switch (colorName) {
        case "green" : return green
        case "purple" : return purple
        case "grey" : return grey
        case "red" : return red
        case "blue" : return blue
        case "teal" : return teal
        case "common" : return common
        case "yellow" : return yellow
        case "deepOrange" : return deepOrange
        case "orange" : return orange
        case "blueGrey" : return blueGrey
        case "cyan" : return cyan
        case "indigo" : return indigo
        default : return common
    }

}

export const  CustomizedButton : React.FC<TCustomizedButtonProps>  = (props) => {

    const useStyles = makeStyles((theme) =>
        createStyles({
            margin: {
                margin: theme.spacing(1),
                width : props.width && props.width
            },
        }),
    )

    const color = findColorObject(props.bgColor ?props.bgColor :"white")
    const ColorButton = withStyles((theme) => ({
        root: {
            color: props.fontColor
                ? props.fontColor === "white" ? red[50] :findColorObject(props.fontColor)[500]
                :theme.palette.getContrastText(color[500]),
            backgroundColor: color[500],
            fontSize : props.fontSize,
            '&:hover': {
                backgroundColor: color[700],
            },
            borderRadius : "0.6rem"
        },
    }))(Button)

    const classes = useStyles();
    return <ColorButton  disabled={props.disabled} onClick={props.onClick}
                         color={"inherit"} startIcon={props.startIcon ? props.startIcon : undefined} variant={props.variant}
                         className={classes.margin}>
        {props.text}
    </ColorButton>
}

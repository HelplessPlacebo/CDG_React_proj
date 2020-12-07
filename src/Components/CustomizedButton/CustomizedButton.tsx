import React from 'react';
import {
    createStyles,
    withStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple,blue,grey,red,common,teal,yellow} from '@material-ui/core/colors'

interface ColorType {
    [key : string] : string
}
type color = "green" | "purple" | "grey" | "red" | "blue" | "common" | "teal" | "yellow"| "white"

const findColorObject = (colorName : string) : ColorType =>{
    switch (colorName) {
        case "green" : return green
        case "purple" : return purple
        case "grey" : return grey
        case "red" : return red
        case "blue" : return blue
        case "teal" : return teal
        case "common" : return common
        case "yellow" : return yellow
        default : return common
    }

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
        },
    }),
);

type TCustomizedButtonProps = {
    bgColor : color
    text : string
    variant  : "outlined" | "contained" | "text"
    fontSize : number
    fontColor ? : color
    startIcon ? : JSX.Element
}
 const  CustomizedButton : React.FC<TCustomizedButtonProps> = (props) => {
     const color = findColorObject(props.bgColor)
     const ColorButton = withStyles((theme: Theme) => ({
         root: {
             color: props.fontColor
                 ? props.fontColor === "white" ? red[50] :findColorObject(props.fontColor)[500]
                 :theme.palette.getContrastText(color[500]),
             backgroundColor: color[500],
             fontSize : props.fontSize,
             '&:hover': {
                 backgroundColor: color[700],
             },
         },
     }))(Button);
    const classes = useStyles();
    return <ColorButton startIcon={props.startIcon ? props.startIcon : undefined} variant={props.variant}
                         color="primary" className={classes.margin} >
                {props.text}
            </ColorButton>
}
export default CustomizedButton
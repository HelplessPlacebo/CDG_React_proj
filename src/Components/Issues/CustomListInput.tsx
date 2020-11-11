import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export  type TCustonListInputProps = {
    value : string
    classes : {AddIssueInput : string}
    onChange : (event: React.ChangeEvent<HTMLInputElement>)=>void
    onSubmit : ()=> void
    onCancel : () => void
    SubmitButtonText : string
    CancelButtonText : string
}

const CustomListInput : React.FC<TCustonListInputProps> = (props) =>{
    return <div className={props.classes.AddIssueInput}>
        <TextField
            id="filled-multiline-flexible"
            label="New issue"
            multiline
            value={props.value}
            onChange={props.onChange}
            placeholder="Please enter the new issue"
        />
        <Grid style={window.innerWidth > 1400 ? {paddingTop : "10px",paddingLeft :"15%"}: {paddingTop : "10px"}} container>
            <Grid item >
                <Button onClick={props.onSubmit} color={"primary"} size={"small"} variant={"contained"} >
                    {props.SubmitButtonText}
                </Button>
            </Grid>

            <Grid item >
                <Button onClick={props.onCancel} style={{marginLeft : "20%"}} color={"inherit"} size={"small"} variant={"contained"} >
                    {props.CancelButtonText}
                </Button>
            </Grid>

        </Grid>
    </div>
}

export default CustomListInput
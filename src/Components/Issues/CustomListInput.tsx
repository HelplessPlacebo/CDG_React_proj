import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export  type TCustonListInputProps = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    onCancel: () => void
    SubmitButtonText: string
    CancelButtonText: string
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        AddIssueInput: {
            '& .MuiTextField-root': {
                margin: theme.spacing(0),
            },
            paddingBottom: "10px"
        }
    })
)

const CustomListInput: React.FC<TCustonListInputProps> = (props) => {
    const classes = useStyles()
    return <div className={classes.AddIssueInput}>
        <Grid container justify="center" alignItems="center" direction="column">

            <Grid item>
                <TextField
                    id="filled-multiline-flexible"
                    label="New issue"
                    multiline
                    value={props.value}
                    onChange={props.onChange}
                    placeholder="Please enter the new issue"
                />
            </Grid>

            <Grid item style={{paddingTop:"1rem"}}>
                <Grid container justify="space-around" alignItems="center">
                    <Grid item>
                        <Button onClick={props.onSubmit} color={"primary"} size={"small"} variant={"contained"}>
                            {props.SubmitButtonText}
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button onClick={props.onCancel} style={{marginLeft: "20%"}} color={"inherit"} size={"small"}
                                variant={"contained"}>
                            {props.CancelButtonText}
                        </Button>
                    </Grid>

                </Grid>
            </Grid>

        </Grid>
    </div>
}

export default CustomListInput
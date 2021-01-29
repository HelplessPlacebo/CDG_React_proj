import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField/TextField"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"

export type TIssuesSelectInputProps = {
    Issues: string[]
    onChange: (event: React.ChangeEvent<{ value: unknown; }>) => void
    value?: string
    width: number
}

export const IssuesSelectInput: React.FC<TIssuesSelectInputProps> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(1),
                width: props.width,
            },
            root: {
                '& .MuiTextField-root': {
                    margin: theme.spacing(1),
                }
                },
            Item: {
                color: "#393a3a",
            }
        })
    )

    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-select-issues"
                    select
                    label="Issues"
                    value={props.value}
                    onChange={props.onChange}
                    variant="outlined"
                    fullWidth={true}
                >
                    {props.Issues.map((issue) => (
                        <MenuItem key={issue} value={issue}>
                            {issue}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </form>
    );
}

import React, {ChangeEvent} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField/TextField"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"

export type TIssuesSelectInputProps = {
    Issues: string[]
    onChange: (event: React.ChangeEvent<{ value: unknown; }>) => void
    value?: string
    width: number
}

const IssuesSelectInput: React.FC<TIssuesSelectInputProps> = (props) => {
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
        // {/*<div>*/}
        // {/*    <FormControl className={classes.formControl}>*/}
        // {/*        <InputLabel htmlFor="grouped-native-select">Issues</InputLabel>*/}
        // {/*        <Select value={props.value} onChange={props.onChange} native defaultValue="" id="grouped-native-select">*/}
        // {/*            <option value={"no issue"}> no issue</option>*/}
        // {/*            <optgroup label="Issues">*/}
        // {/*                {props.Issues.map(Issue => <option key={Issue} className={classes.Item}*/}
        // {/*                                                   value={Issue}>{Issue}</option>)}*/}
        // {/*            </optgroup>*/}
        // {/*        </Select>*/}
        // {/*    </FormControl>*/}
        // {/*</div>*/}
    );
}

export default IssuesSelectInput
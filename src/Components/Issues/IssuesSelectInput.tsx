import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export type TIssuesSelectInputProps = {
    Issues : string[]
    handleChange : (event: React.ChangeEvent<{  value: unknown; }>) =>void
    value? : string
    width : number
}

const IssuesSelectInput : React.FC<TIssuesSelectInputProps> = (props) =>{
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            formControl: {
                margin: theme.spacing(1),
                minWidth: props.width,
            },
            Item : {
                color : "#393a3a",
            }
        }),
    );

    const classes = useStyles()

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">Issues</InputLabel>
                <Select  value={props.value} onChange={props.handleChange} native defaultValue="" id="grouped-native-select">
                    <option aria-label="None" value="" />
                    <optgroup label="Issues">
                        {props.Issues.map(Issue=>      <option key={Issue} className={classes.Item} value={Issue}>{Issue}</option>)}
                    </optgroup>
                </Select>
            </FormControl>
        </div>
    );
}

export default IssuesSelectInput
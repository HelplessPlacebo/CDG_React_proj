import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export type TCustomInputProps = {
    value : string
    onChange : (event: React.ChangeEvent<HTMLInputElement>) =>void
    placeholder : string
    label : string
    width : number
}

export const CustomInput: React.FC<TCustomInputProps> = (props) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                '& .MuiTextField-root': {
                    margin: theme.spacing(1),
                    width: props.width,
                },
            },
        }),
    );

    const classes = useStyles()
    return <div className={classes.root}>
        <TextField
            value={props.value}
            onChange={props.onChange}
            id="standard-textarea"
            label={props.label}
            placeholder={props.placeholder}
            multiline
        />
    </div>
}

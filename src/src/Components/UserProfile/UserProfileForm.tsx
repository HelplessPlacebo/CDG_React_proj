import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import avatar from "../../assets/imgs/avatar.jpg"
import CustomInput from "../ChangeWorklogModal/CustomInput"
import {useInput} from "../hooks/useInput"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        list: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(1),
        },
        FileInput: {
            display: "none"
        },
        GridItem: {
            paddingTop: 35
        }
    }),
);

type TUserProfileFormProps = {}

const UserProfileForm: React.FC<TUserProfileFormProps> = (props) => {
    const classes = useStyles();
    const NewUserNameInput = useInput("")
    const NewUserKLastNameInput = useInput("")

    return <div className={classes.list}>
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <input
                    accept="image/*"
                    className={classes.FileInput}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label id="contained-img" htmlFor="contained-button-file">
                    <img style={{width: 100, height: 100, borderRadius: "50%", cursor: "pointer"}}
                         src={avatar} alt="user avatar"/>
                </label>
            </Grid>
            <Grid item className={classes.GridItem}>
                <CustomInput {...NewUserNameInput.bind}
                             label={"name"}
                             placeholder={"Please, enter your name"}
                             width={250}
                />
            </Grid>
            <Grid item className={classes.GridItem}>
                <CustomInput {...NewUserKLastNameInput.bind}
                             label={"last name"}
                             placeholder={"Please, enter your last name"}
                             width={250}
                />
            </Grid>
        </Grid>
    </div>
}

export default UserProfileForm
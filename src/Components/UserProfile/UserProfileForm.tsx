import React, {Dispatch, SetStateAction} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import {TProfileInfo} from "../../Redux/ProfileReducer"
import {CreateField, FormInput} from "../../assets/utils/ValidartorsComponents/ElementsValidators"
import {required} from "../../assets/utils/validators"
import {CustomizedButton} from "../CustomElements/CustomizedButton/CustomizedButton"
import {InjectedFormProps, reduxForm} from "redux-form"
import {ImgInput, onDeleteClick, TImgValue} from "../CustomElements/CustomInputs/ImgInput"
import EmptyAvatar from "../../assets/imgs/EmptyAvatar.jpg"
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
        FileInput: {
            display: "none"
        },
    }),
);

type TOwnProps = {
    profileInfo: TProfileInfo
    onClose: () => void
    value: TImgValue
    setValue: Dispatch<SetStateAction<TImgValue>>
    onDeleteClick?: onDeleteClick
}

export const UserProfileForm: React.FC<InjectedFormProps<TProfileInfo, TOwnProps> & TOwnProps> = (props) => {
    const classes = useStyles()

    return <div className={classes.list}>

        <form style={{paddingRight: "2rem", paddingLeft: "2rem"}} onSubmit={props.handleSubmit}
              className={"SignInFormContainer"}>
            <Grid container direction="column" justify="center" alignItems="center">

                <ImgInput value={props.value} setValue={props.setValue} defaultImgUrl={EmptyAvatar}
                          options={{withDeleting: true, onDeleteClick: props.onDeleteClick}}/>


                <Grid style={{paddingTop: "2rem"}} item className="ProfileFormInputs">
                    {CreateField("Enter your fist name", "firstName", [required],
                        FormInput, {label: "fist name", fullWidth: true})}

                    {CreateField("Enter your last name", "lastName", [required],
                        FormInput, {label: "last name", fullWidth: true})}

                </Grid>


                <Grid style={{paddingTop: "1rem"}} container direction="row" justify="space-evenly" alignItems="center"
                      className="ProfileFormControlButtons">

                    <Grid item>
                        <CustomizedButton onClick={props.handleSubmit} text="save"
                                          variant="outlined" fontColor="blue"
                                          fontSize=".9rem" startIcon={<SaveIcon/>}/>
                    </Grid>

                    <Grid item>
                        <CustomizedButton onClick={props.onClose} text="close"
                                          variant="outlined" fontColor="red"
                                          fontSize=".9rem" startIcon={<CloseIcon/>}/>
                    </Grid>
                </Grid>

            </Grid>

            {props.error
                ?
                <div style={{paddingTop: "2rem", paddingLeft: "1.12rem", fontSize: "1.125rem", color: "#ea1f09"}}>
                    {props.error}
                </div>
                : null
            }
        </form>

    </div>
}

export const UserProfileReduxForm = reduxForm<TProfileInfo, TOwnProps>({
    form: 'ProfileForm',
})(UserProfileForm)
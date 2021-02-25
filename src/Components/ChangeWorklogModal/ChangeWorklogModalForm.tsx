import React from "react"
import Grid from "@material-ui/core/Grid"
import {CustomizedButton} from "../CustomElements/CustomizedButton/CustomizedButton"
import {CreateField, FormInput, IssuesFormInput} from "../../assets/utils/ValidartorsComponents/ElementsValidators"
import {required} from "../../assets/utils/validators"
import {InjectedFormProps, reduxForm} from "redux-form"
import SaveIcon from "@material-ui/icons/Save"
import CloseIcon from '@material-ui/icons/Close'
import {TWorkLog} from "../../Redux/WorkLogsReducer"

type TOwnProps = {
    onClose: () => void
    issues: string[]
}

const ChangeWorklogForm: React.FC<InjectedFormProps<TWorkLog | null, TOwnProps> & TOwnProps> = (props) => {
    return <div style={{paddingTop: "1.5rem", paddingRight: "2rem", paddingLeft: "2rem"}}
                className="SignUpFormContainer"
                onSubmit={props.handleSubmit}>

        <div className="ChangeWorklogFormTaskFieldInput">
            {CreateField("Enter the task name", "TaskField", [required], FormInput, {
                label: "task name",
                fullWidth: true
            })}
        </div>

        <div className="ChangeWorklogFormIssuesInput">
            {CreateField("chose issue", "Issue", [required], IssuesFormInput,
                {label: "issues", fullWidth: true, issues: props.issues})}
        </div>

        <div style={{paddingTop: "1rem"}} className="SignUpControlButtonsContainer">
            <Grid container direction="row" justify="space-evenly" alignItems="center">
                <Grid item>
                    <CustomizedButton onClick={props.handleSubmit} fontColor="blue" bgColor="white" text="save"
                                      variant="outlined" fontSize=".9rem" startIcon={<SaveIcon/>}/>
                </Grid>
                <Grid item>
                    <CustomizedButton onClick={props.onClose} text="close"
                                      variant="outlined" fontColor="red"
                                      fontSize=".9rem" startIcon={<CloseIcon/>}/>
                </Grid>
            </Grid>
        </div>

        {props.error
            ?
            <div style={{paddingTop: "2rem", paddingLeft: "1.12rem", fontSize: "1.125rem", color: "#ea1f09"}}>
                {props.error}
            </div>
            : null
        }
    </div>
}

export const ChangeWorklogModalReduxForm = reduxForm<TWorkLog | null, TOwnProps>({form: 'ChangeWorklogModalForm'})(ChangeWorklogForm)

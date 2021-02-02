import React, {Dispatch, useState} from "react"
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CardHeader from "@material-ui/core/CardHeader/CardHeader"
import AddBoxIcon from '@material-ui/icons/AddBox';
import {CustomListInput} from "../Inputs/CustomListInput";
import {useInput} from "../../hooks/useInput";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TAddIssue} from "../../../Redux/IssuesReducer";
import {CustomizedButton} from "../../CustomElements/CustomizedButton/CustomizedButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardHeader: {
            padding: theme.spacing(1, 2),
        },

        AddIssueInput: {
            '& .MuiTextField-root': {
                margin: theme.spacing(0),
                maxWidth: "30rem"
            },
            paddingLeft: "30%",
            paddingBottom: "10px"
        }
    })
)

type TCardHeaderProps = {
    checked: string[]
    setChecked: Dispatch<string[]>
    addIssue: TAddIssue
    items: string[]
    el: "Issue" | "CompletedIssue"
    title: React.ReactNode
}
export const ListHeader: React.FC<TCardHeaderProps> = (props) => {
    const classes = useStyles()
    const [AddIssueOpened, SetAddIssueOpened] = useState(false)
    const AddNewIssueInput = useInput('')

    const numberOfChecked = (items: string[]) => intersection(props.checked, items).length

    const intersection = (a: string[], b: string[]) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const handleToggleAll = (items: string[]) => () => {
        if (numberOfChecked(items) === items.length) props.setChecked(not(props.checked, items))
        else props.setChecked(union(props.checked, items))
    }

    const onShowAddIssueInput = () => {
        SetAddIssueOpened(true)
    }

    const not = (a: string[], b: string[]) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const union = (a: string[], b: string[]) => {
        return [...a, ...not(b, a)];
    }


    const OnConfirmAddNewIssue = () => {
        props.addIssue(AddNewIssueInput.value)
        AddNewIssueInput.clear()
        SetAddIssueOpened(false)
    }
    const OnCancelAddNewIssue = () => {
        AddNewIssueInput.clear()
        SetAddIssueOpened(false)
    }

    return <div className="CardHeaderContainer">
        <Grid container justify="space-between" alignItems="center">

            <Grid item>
                <CardHeader className={classes.cardHeader}
                            avatar={
                                <Checkbox
                                    onClick={handleToggleAll(props.items)}
                                    checked={numberOfChecked(props.items) === props.items.length && props.items.length !== 0}
                                    indeterminate={numberOfChecked(props.items) !== props.items.length && numberOfChecked(props.items) !== 0}
                                    disabled={props.items.length === 0}
                                    inputProps={{'aria-label': 'all items selected'}}
                                />
                            }
                            title={props.title}
                            subheader={`${numberOfChecked(props.items)}/${props.items.length} selected`}
                />
            </Grid>

            <Grid item style={{paddingRight: "0.5rem"}}>
                {
                    props.el === "Issue" &&
                        <CustomizedButton onClick={onShowAddIssueInput} fontColor="teal" bgColor="white"
                                          fontSize="0.8rem"
                                          variant={"outlined"} startIcon={<AddBoxIcon/>} text="add issue"/>
                }
            </Grid>

        </Grid>
        {
            AddIssueOpened && props.el === "Issue" && <CustomListInput {...AddNewIssueInput.bind}
                                                                       onSubmit={OnConfirmAddNewIssue}
                                                                       onCancel={OnCancelAddNewIssue}
                                                                       submitButtonText={"Add"}
                                                                       cancelButtonText={"cancel"}/>
        }
    </div>
}
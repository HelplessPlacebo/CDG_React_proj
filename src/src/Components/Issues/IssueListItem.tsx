import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import {blue, blueGrey} from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import {TChangeIssue, TDeleteIssue} from "../../Data/IssuesReducer";
import CustomListInput from "./CustomListInput";
import {useInput} from "../hooks/useInput";

export type TIssueListItemProps = {
    Issue: string
    el: "Issue" | "CompletedIssue"
    checked: string[]
    handleToggle: (value: string) => void
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
}

const IssueListItem: React.FC<TIssueListItemProps> = (props) => {
    const [EditInputIsShowing, SetEditInputIsShowing] = useState(false)
    const EditInputValue = useInput('')

    const OnSaveNewValue = () => {
        props.ChangeIssue(props.Issue, EditInputValue.value)
        SetEditInputIsShowing(false)
        EditInputValue.clear()
    }
    const onCancelInput = () =>{
        SetEditInputIsShowing(false)
    }




    const labelId = `transfer-list-all-item-${props.Issue}-label`

    return (<div className="IssueListItem">
            {
                EditInputIsShowing
                    ? <CustomListInput onSubmit={OnSaveNewValue}
                             {...EditInputValue.bind} onCancel={onCancelInput} SubmitButtonText={"Save"}
                                       CancelButtonText={"cancel"}
                                             />
                    : <Grid key={props.Issue} container alignItems="center" justify="space-around">

                        <Grid item  style={{width:"85%"}}>

                            <ListItem role="listitem" button
                                      //@ts-ignore
                                      onClick={props.handleToggle(props.Issue)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={props.checked.indexOf(props.Issue) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={props.Issue}/>
                            </ListItem>
                        </Grid>

                        <Grid item  >

                            <Grid container justify="space-between" alignItems="center" style={{paddingRight : "1rem"}}>

                                {
                                    props.el === "Issue" && <Grid item style={{paddingRight : ".5rem"}}>
                                        <Tooltip title="Edit" arrow placement="top">
                                            <EditIcon onClick={() => SetEditInputIsShowing(true)}
                                                      style={{color: blue[400], cursor: "pointer"}}
                                                      fontSize="default"/>
                                        </Tooltip>
                                    </Grid>
                                }


                                <Grid item >
                                    <Tooltip title="Delete" arrow placement="top">
                                        <DeleteIcon
                                            onClick={() => props.DeleteIssue(props.Issue, props.el)}
                                            style={props.el === "Issue"
                                                ? {color: blueGrey[600], cursor: "pointer"}
                                                : {color: blueGrey[600], cursor: "pointer"}}
                                            fontSize="default"/>
                                    </Tooltip>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
            }
        </div>
    )
}

export default IssueListItem
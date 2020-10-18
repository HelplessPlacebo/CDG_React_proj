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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomListInput from "./CustomListInput";

export type TIssueListItemProps = {
    Issue: string
    el: "Issue" | "CompletedIssue"
    checked: string[]
    handleToggle: (value: string) => void
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
    classes :any
}

const IssueListItem: React.FC<TIssueListItemProps> = (props) => {
    const [EditInputIsShowing, SetEditInputIsShowing] = useState(false)
    const [EditInputValue, SetEditInputValue] = useState("")

    const OnEditInoutValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetEditInputValue(event.target.value)
    }
    const OnSaveNewValue = () => {
        props.ChangeIssue(props.Issue, EditInputValue)
        SetEditInputIsShowing(false)
        SetEditInputValue("")
    }
    const onCancelInput = () =>{
        SetEditInputIsShowing(false)
    }
    const labelId = `transfer-list-all-item-${props.Issue}-label`

    return (<div className="IssueListItem">
            {
                EditInputIsShowing
                    ? <CustomListInput classes={props.classes} value={EditInputValue} onSubmit={OnSaveNewValue}
                                        handler={OnEditInoutValueChange} onCancel={onCancelInput} SubmitButtonText={"Save"}
                                       CancelButtonText={"cancel"}
                                             />
                    : <Grid key={props.Issue} container>

                        <Grid item  sm={10}>
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

                        <Grid item  sm={2}>

                            <Grid style={{marginTop: "11px"}} container>

                                {
                                    props.el === "Issue" && <Grid item sm={4}>
                                        <Tooltip title="Edit" arrow placement="top">
                                            <EditIcon onClick={() => SetEditInputIsShowing(true)}
                                                      style={{color: blue[400], cursor: "pointer", marginLeft: "40%"}}
                                                      fontSize="default"/>
                                        </Tooltip>
                                    </Grid>
                                }


                                <Grid item sm={4}>
                                    <Tooltip title="Delete" arrow placement="top">
                                        <DeleteIcon
                                            onClick={() => props.DeleteIssue(props.Issue, props.el)}
                                            style={props.el === "Issue"
                                                ? {color: blueGrey[600], cursor: "pointer", marginLeft: "40%"}
                                                : {color: blueGrey[600], cursor: "pointer", marginLeft: "90%"}}
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
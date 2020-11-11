import React, {Dispatch, useState} from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {TAddIssue, TChangeIssue, TDeleteIssue} from "../../Data/IssuesReducer";
import IssueListItem from "./IssueListItem";
import CustomListInput from "./CustomListInput";
import {useInput} from "../hooks/useInput";




export type TIssuesListProps = {
    title: React.ReactNode
    items: string[]
    el: "Issue" | "CompletedIssue"
    classes : any
    checked : string[]
    setChecked : Dispatch<any>
    AddIssue : TAddIssue
    DeleteIssue : TDeleteIssue
    ChangeIssue: TChangeIssue
}

const IssuesList : React.FC<TIssuesListProps> = (props) =>{

    const [AddIssueOpened, SetAddIssueOpened] = useState(false)
    const AddNewIssueInput = useInput('')


     const not = (a: string[], b: string[]) => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const  intersection = (a: string[], b: string[]) => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }


    const  union = (a: string[], b: string[]) => {
        return [...a, ...not(b, a)];
    }

    const handleToggle = (value: string) => () => {
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        props.setChecked(newChecked);
    }

    const numberOfChecked = (items: string[]) => intersection(props.checked, items).length;

    const handleToggleAll = (items: string[]) => () => {
        if (numberOfChecked(items) === items.length) {
            props.setChecked(not(props.checked, items));
        } else {
            props.setChecked(union(props.checked, items));
        }
    }

    const onShowAddIssueInput = () => {
        SetAddIssueOpened(true)
    }


    const OnConfirmAddNewIssue = () => {
        props.AddIssue(AddNewIssueInput.value)
        AddNewIssueInput.clear()
        SetAddIssueOpened(false)
    }
    const OnCancelAddNewIssue = () => {
        AddNewIssueInput.clear()
        SetAddIssueOpened(false)
    }

    return  <Card>
        <Grid container>
            <Grid item sm={9}>
                <CardHeader
                    className={props.classes.cardHeader}
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
            <Grid item sm={3}>
                {
                    props.el === "Issue"
                    && <div style={window.innerWidth < 1400 ?{paddingTop : "10%" }
                    :window.innerWidth <1750 ?  {paddingTop : "10%",paddingLeft : "15%"}
                    :{paddingTop : "8%",paddingLeft : "30%"}}>
                        <Tooltip title="Create new issue" arrow placement="top">
                            <Button onClick={onShowAddIssueInput} size="small" color="secondary"
                                    variant={"outlined"} startIcon={<AddOutlinedIcon/>}>
                                add issue
                            </Button>
                        </Tooltip>
                    </div>
                }
            </Grid>

        </Grid>
        {
            AddIssueOpened && props.el === "Issue" && <CustomListInput {...AddNewIssueInput.bind} classes={props.classes}
                                                                       onSubmit={OnConfirmAddNewIssue}
                                                                       onCancel={OnCancelAddNewIssue} SubmitButtonText={"Add"}
                                                                       CancelButtonText={"cancel"}/>
        }

        <Divider/>

        <List className={props.classes.list} dense component="div" role="list">
            {props.items.map((value: string) => {
                return  (<IssueListItem key={value} Issue={value} el={props.el} checked={props.checked}
                                        handleToggle={handleToggle} DeleteIssue={props.DeleteIssue}
                                        ChangeIssue={props.ChangeIssue} classes={props.classes}/>)

            })}
            <ListItem/>

        </List>
    </Card>
}

export default IssuesList
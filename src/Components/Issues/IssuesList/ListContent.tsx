import React, {Dispatch} from "react"
import List from "@material-ui/core/List";
import {IssueListItem} from "./IssueListItem";
import ListItem from "@material-ui/core/ListItem";
import { TChangeIssue, TDeleteIssue} from "../../../Redux/IssuesReducer";


type TListContentProps={
    checked: string[]
    items: string[]
    el: "Issue" | "CompletedIssue"
    deleteIssue: TDeleteIssue
    changeIssue: TChangeIssue
    setChecked: Dispatch<string[]>
}

export const ListContent :React.FC<TListContentProps> = props=> {

    const handleToggle = (value: string) => () => {
        const currentIndex = props.checked.indexOf(value)
        const newChecked = [...props.checked]
        if (currentIndex === -1) newChecked.push(value)
        else newChecked.splice(currentIndex, 1)
        props.setChecked(newChecked)
    }

    return <div className="CardContentContainer">
        <List dense component="div" role="list">
            {props.items.map((value: string) => {
                return (<IssueListItem key={value} issue={value} el={props.el} checked={props.checked}
                                       handleToggle={handleToggle} deleteIssue={props.deleteIssue}
                                       changeIssue={props.changeIssue}/>)

            })}
            <ListItem/>
        </List>
    </div>
}

import React, {Dispatch} from "react"
import List from "@material-ui/core/List";
import IssueListItem from "../IssueListItem";
import ListItem from "@material-ui/core/ListItem";
import { TChangeIssue, TDeleteIssue} from "../../../Data/IssuesReducer";


type TListContentProps={
    checked: string[]
    items: string[]
    el: "Issue" | "CompletedIssue"
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
    setChecked: Dispatch<string[]>
}

const ListContent :React.FC<TListContentProps> = props=> {

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
                return (<IssueListItem key={value} Issue={value} el={props.el} checked={props.checked}
                                       handleToggle={handleToggle} DeleteIssue={props.DeleteIssue}
                                       ChangeIssue={props.ChangeIssue}/>)

            })}
            <ListItem/>
        </List>
    </div>
}
export default ListContent
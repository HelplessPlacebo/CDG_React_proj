import React, {Dispatch} from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {TAddIssue, TChangeIssue, TDeleteIssue} from "../../../Redux/IssuesReducer";
import {ListHeader} from "./ListHeader";
import {ListContent} from "./ListContent";


export type TIssuesListProps = {
    title: React.ReactNode
    items: string[]
    el: "Issue" | "CompletedIssue"
    checked: string[]
    setChecked: Dispatch<string[]>
    AddIssue: TAddIssue
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
}


export const IssuesList: React.FC<TIssuesListProps> = (props) => {

    return <Card style={{width: "100%", height: "100%"}}>

        <ListHeader checked={props.checked} setChecked={props.setChecked}
                    AddIssue={props.AddIssue} items={props.items}
                    el={props.el} title={props.title}/>

        <Divider/>

        <div style={{paddingTop: "1rem"}}>
            <ListContent checked={props.checked} items={props.items} el={props.el} DeleteIssue={props.DeleteIssue}
                         ChangeIssue={props.ChangeIssue} setChecked={props.setChecked}/>
        </div>


    </Card>
}
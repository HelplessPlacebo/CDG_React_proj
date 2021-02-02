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
    addIssue: TAddIssue
    deleteIssue: TDeleteIssue
    changeIssue: TChangeIssue
}


export const IssuesList: React.FC<TIssuesListProps> = (props) => {

    return <Card style={{width: "100%", height: "100%"}}>

        <ListHeader checked={props.checked} setChecked={props.setChecked}
                    addIssue={props.addIssue} items={props.items}
                    el={props.el} title={props.title}/>

        <Divider/>

        <div style={{paddingTop: "1rem"}}>
            <ListContent checked={props.checked} items={props.items} el={props.el} deleteIssue={props.deleteIssue}
                         changeIssue={props.changeIssue} setChecked={props.setChecked}/>
        </div>


    </Card>
}
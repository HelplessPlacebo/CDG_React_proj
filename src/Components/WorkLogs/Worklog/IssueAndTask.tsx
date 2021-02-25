import React from "react"
import WLS from "../Worklog.module.css";
type TIssueAndTaskProps ={
    onSetWorklogToChange : ()=>void
    issue : string | null | undefined
    taskField : string | null
}
export const IssueAndTask : React.FC<TIssueAndTaskProps> = (props) =>{

    return  <div onClick={props.onSetWorklogToChange} className={WLS.WorklogContentContainer}>
        <div className={WLS.Issue}>
            {props.issue}
        </div>
        <div className={WLS.TaskField}>
            {props.taskField}
        </div>
    </div>
}
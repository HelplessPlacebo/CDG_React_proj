import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {getCompletedIssues, getIssues} from "../Selectors/IssuesSelectors";
import {AddIssue, ChangeIssue, DeleteIssue, SetCompletedIssues, SetIssues} from "../../Redux/IssuesReducer";
import {Issues} from "./Issues";

const IssuesPage = () => {
    const dispatch = useDispatch()

    const issues = useSelector(getIssues)
    const completedIssues = useSelector(getCompletedIssues)

    const addIssues = (Issue: string) => dispatch(AddIssue(Issue))
    const deleteIssue = (Issue: string, From: "Issue" | "CompletedIssue") => dispatch(DeleteIssue(Issue, From))
    const changeIssue = (OldIssue: string, NewIssue: string) => dispatch(ChangeIssue(OldIssue, NewIssue))
    const setIssues = (Issues: string[]) => dispatch(SetIssues(Issues))
    const setCompletedIssues = (CompletedIssues: string[]) => dispatch(SetCompletedIssues(CompletedIssues))

    return <Issues Issues={issues} CompletedIssues={completedIssues} AddIssue={addIssues} DeleteIssue={deleteIssue}
                   ChangeIssue={changeIssue} SetIssues={setIssues} SetCompletedIssues={setCompletedIssues}/>
}
export default IssuesPage
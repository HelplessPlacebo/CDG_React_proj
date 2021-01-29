import {GlobalState} from "../../Redux/redux-store";

export const getIssues = (state : GlobalState) => state.IssuesData.Issues
export const getCompletedIssues = (state : GlobalState) => state.IssuesData.CompletedIssues

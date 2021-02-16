const ADD_ISSUE = "ISSUES/ADD_ISSUE"
const DELETE_ISSUE = "ISSUES/DELETE_ISSUE"
const CHANGE_ISSUE = "ISSUES/CHANGE_ISSUE"
const SET_ISSUES = "ISSUES/SET_ISSUES"
const SET_COMPLETED_ISSUES = "ISSUES/SET_COMPLETED_ISSUES"

let defaultState = {
    Issues: ["Meeting", "QA",
        "API Middleware", "Amendment", "Branding", "Profit increase", "Project Design", "Customer"] as string[],
    CompletedIssues: ["Some Item 1 ", "Some Item 2 ", "Some Item 3 ", "Some Item  4", "Some Item 5 "] as string[]
}

type  DefaultIssuesState = typeof defaultState


type TIssuesReducerActions = ReturnType<TAddIssue> | ReturnType<TDeleteIssue>
    | ReturnType<TChangeIssue> | ReturnType<TSetIssues> | ReturnType<TSetCompletedIssues>

export const issuesReducer = (state = defaultState, action: TIssuesReducerActions): DefaultIssuesState => {

    const GetIssuesCopy = (): Array<string> => {
        return JSON.parse(JSON.stringify(state.Issues))
    }

    switch (action.type) {
        case SET_ISSUES : {
            return {
                ...state,
                Issues: action.Issues
            }
        }
        case SET_COMPLETED_ISSUES : {
            return {
                ...state,
                CompletedIssues: action.CompletedIssues
            }
        }

        case ADD_ISSUE : {
            return {
                ...state,
                Issues: [...state.Issues, action.Issue]
            }
        }
        case DELETE_ISSUE : {
            return {
                ...state,
                Issues: action.From === "Issue"
                    ? state.Issues.filter(Issue => Issue !== action.Issue)
                    : state.Issues
                ,
                CompletedIssues: action.From === "CompletedIssue"
                    ? state.CompletedIssues.filter(CompletedIssue => CompletedIssue !== action.Issue)
                    : state.CompletedIssues
            }
        }
        case CHANGE_ISSUE : {
            let IssuesCopy = GetIssuesCopy()
            IssuesCopy[IssuesCopy.findIndex((value) => value === action.OldIssue)] = action.NewIssue
            return {
                ...state,
                Issues: IssuesCopy
            }
        }

        default :
            return state
    }
}

export const SetIssues = (Issues: string[]) => ({type: SET_ISSUES, Issues} as const)

export const SetCompletedIssues = (CompletedIssues: string[]) =>
    ({type: SET_COMPLETED_ISSUES, CompletedIssues} as const)

export const AddIssue = (Issue: string) => ({type: ADD_ISSUE, Issue} as const)

export const DeleteIssue = (Issue: string, From: "Issue" | "CompletedIssue") =>
    ({type: DELETE_ISSUE, Issue, From} as const)

export const ChangeIssue = (OldIssue: string, NewIssue: string) =>
    ({type: CHANGE_ISSUE, OldIssue, NewIssue} as const)

export type TSetIssues = typeof SetIssues
export type TSetCompletedIssues = typeof SetCompletedIssues
export type TAddIssue = typeof AddIssue
export type TDeleteIssue = typeof DeleteIssue
export type TChangeIssue = typeof ChangeIssue

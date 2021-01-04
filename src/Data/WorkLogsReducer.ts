import store, {GlobalState} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {GetCurrentDate} from "../assets/secondary/GetCurrentDate";

const ADD_WORKLOG = "WORKLOGS/ADD_WORKLOG"
const DEL_WORKLOG = "WORKLOGS/DEL_WORKLOG"
const SET_IS_PLAYING_WORKLOG_BY_ID = "WORKLOGS/SET_IS_PLAYING_WORKLOG_BY_ID"
const CHANGE_WORKLOG = "WORKLOGS/CHANGE_WORKLOG"
const SET_WORKLOG_TO_CHANGE = "WORKLOGS/SET_WORKLOG_TO_CHANGE"
const ADD_TO_FAVORITE = "WORKLOGS/ADD_TO_FAVORITE"
const SET_WORKLOG_STATUS = "WORKLOGS/SET_WORKLOG_STATUS"
const DELETE_FROM_FAVORITES = "WORKLOGS/DELETE_FROM_FAVORITES"
const CHANGE_FAVORITES_WORKLOG = "WORKLOGS/CHANGE_FAVORITES_WORKLOG"
export const CurrentDate = `${GetCurrentDate().DayName + "," + GetCurrentDate().CurrentMonth} ${GetCurrentDate().CurrentDay}`

export const randomInteger = (min: number, max: number): number => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

export type TNestingItem = {
    StartTime: string | null
    EndTime: string | null
    TaskField: string | null
    status: "ok" | "warning" | "danger" | string
    Issue?: string | null
    id: number
    TimerValue: string | null
}

export type TBlockInfo = {
    BlockCreatedDate: string
    SummaryStatus: "ok" | "warning" | "danger" | string
    SummaryTime: string | null
    id: number
}

export type TWorkLog = {
    StartTime: string | null
    EndTime: string | null
    TaskField: string | null
    status: "ok" | "warning" | "danger" | string
    TimerValue: string | null
    NestingItems?: Array<TNestingItem> | null
    id: number
    Issue?: string | null
    ParentId?: number
    IsFavorites?: boolean
}

export type  TWorklogBlock = {
    BlockInfo: TBlockInfo
    Worklogs: Array<TWorkLog>
}

export type TTimerData = {
    TimerValue: string
    TimerIssue: string
    TimerTaskField: string
}
export type TSendWorklogsData = {
    WorkLogsBlocks: TWorklogBlock
}

let DefaultState = {
    WorkLogsBlocks: [{
        BlockInfo: {
            BlockCreatedDate: "Wed,October 7",
            SummaryStatus: "ok",
            SummaryTime: "07:05:00",
            id: 1
        },
        Worklogs: [{
            StartTime: "09:00",
            EndTime: "11:00",
            TaskField: "Team standup",
            status: "warning",
            NestingItems: null,
            TimerValue: "02:00:00",
            id: 444553452341241,
            Issue: "Meeting",
            IsFavorites: false
        }, {
            StartTime: "10:00",
            EndTime: "11:15",
            TaskField: "Meeting with QA",
            status: "ok",
            NestingItems: null,
            TimerValue: "01:15:00",
            id: 213124124125122,
            Issue: "QA",
            IsFavorites: false
        }, {
            StartTime: "09:00",
            EndTime: "10:00",
            TaskField: "Company Branding",
            status: "warning",
            TimerValue: "03:50:00",
            id: 2131241255143,
            NestingItems: null,
            Issue: "Branding",
            IsFavorites: false
        },
            {
                StartTime: "11:30",
                EndTime: "13:00",
                TaskField: "Marketing strategy",
                status: "warning",
                id: 123213213244,
                TimerValue: "01:30:00",
                NestingItems: null,
                Issue: "Profit increase",
                IsFavorites: false
            },
            {
                StartTime: "13:20",
                EndTime: "16:00",
                TaskField: "Moodboarding",
                status: "ok",
                id: 1232312351245,
                TimerValue: "03:20:00",
                NestingItems: null,
                Issue: "Project Design",
                IsFavorites: false
            }]
    },
        {
            BlockInfo: {
                BlockCreatedDate: "Tue,October 6",
                SummaryStatus: "warning",
                SummaryTime: "06:05:00",
                id: 2
            },
            Worklogs: [{
                StartTime: "09:00",
                EndTime: "10:00",
                TaskField: "Team standup",
                status: "danger",
                NestingItems: null,
                TimerValue: "01:00:00",
                id: 444553452341246,
                Issue: "Meeting",
                IsFavorites: false
            }, {
                StartTime: "10:00",
                EndTime: "11:15",
                TaskField: "Design Meeting",
                status: "ok",
                NestingItems: null,
                TimerValue: "01:15:00",
                id: 213124124125127,
                Issue: "Project Design",
                IsFavorites: false
            }, {
                StartTime: "09:00",
                EndTime: "10:00",
                TaskField: "Company Branding",
                status: "warning",
                TimerValue: "04:50:00",
                id: 2131241255148,
                Issue: "Profit increase",
                IsFavorites: false,
                NestingItems: [{
                    StartTime: "11:30",
                    EndTime: "13:00",
                    TaskField: "Marketing strategy",
                    status: "warning",
                    id: 123213213249,
                    TimerValue: "01:30:00",
                    Issue: "Profit increase",
                    IsFavorites: false
                }, {
                    StartTime: "13:20",
                    EndTime: "16:00",
                    TaskField: "Moodboarding",
                    status: "ok",
                    id: 12323123512410,
                    TimerValue: "03:20:00",
                    Issue: "Profit increase",
                    IsFavorites: false
                }]
            }]
        },
        {
            BlockInfo: {
                BlockCreatedDate: "Mon,October 5",
                SummaryStatus: "warning",
                SummaryTime: "06:05:00",
                id: 3
            },
            Worklogs: [{
                StartTime: "09:00",
                EndTime: "10:00",
                TaskField: "Team standup",
                status: "ok",
                NestingItems: null,
                TimerValue: "01:00:00",
                id: 4445534523412411,
                Issue: "Meeting",
                IsFavorites: false
            }, {
                StartTime: "10:00",
                EndTime: "11:15",
                TaskField: "Fixing control buttons on navigation bar",
                status: "ok",
                NestingItems: null,
                TimerValue: "02:45:00",
                id: 2131241241251212,
                Issue: "Amendment",
                IsFavorites: false
            }, {
                StartTime: "09:00",
                EndTime: "10:00",
                TaskField: "Company Branding",
                status: "warning",
                TimerValue: "03:50:00",
                id: 21312412551413,
                NestingItems: null,
                Issue: "Profit increase",
                IsFavorites: false
            },
                {
                    StartTime: "12:00",
                    EndTime: "13:00",
                    TaskField: "Create layout for main menu",
                    status: "danger",
                    id: 1232132132414,
                    TimerValue: "01:00:00",
                    NestingItems: null,
                    Issue: "Project Design",
                    IsFavorites: false
                }, {
                    StartTime: "13:20",
                    EndTime: "16:00",
                    TaskField: "Create layout for inputs",
                    status: "ok",
                    id: 12323123512415,
                    TimerValue: "03:20:00",
                    NestingItems: null,
                    Issue: "Project Design",
                    IsFavorites: false
                }]
        }] as Array<TWorklogBlock>,
    PlayingWorklog: null as TWorkLog | null,
    WorklogToChange: null as TWorkLog | null,
    FavoritesWorklogs: [] as Array<TWorkLog>
}

export const SearchWorklogBlock = (MonthName: string, DayNumber: number): Element | null => {
    let StateCopy: DefaultWorklogsState = JSON.parse(JSON.stringify(store.getState().WorklogsData))
    let WorklogsBlockToBeScrolled: HTMLElement | null = null
    StateCopy.WorkLogsBlocks.map(el => {
        let [Month, Day] = [...el.BlockInfo.BlockCreatedDate?.split(",")[1].split(" ")]
        if (Month === MonthName && Number.parseInt(Day) === DayNumber) {
            WorklogsBlockToBeScrolled = document.getElementById(el.BlockInfo.id.toString())
        }
    })
    return WorklogsBlockToBeScrolled
}


type  DefaultWorklogsState = typeof DefaultState


type TWorklogsReducerActions = ReturnType<TAddWorklog> | ReturnType<TDeleteWorklog>
    | ReturnType<TSetIsPlayingWorklogById> | ReturnType<TChangeWorklog>
    | ReturnType<TSetWorklogToChange> | ReturnType<TAddToFavorite> | ReturnType<TSetWorklogStatus>
    | ReturnType<TDeleteFromFavorites> | ReturnType<TChangeFavoritesWorklog>

type TWorklogsThunks = ThunkAction<Promise<void>, GlobalState, unknown, TWorklogsReducerActions>

const WorklogsReducer = (state = DefaultState, action: TWorklogsReducerActions): DefaultWorklogsState => {

    const GetWorklogsBlockCopy = (): Array<TWorklogBlock> => {
        return JSON.parse(JSON.stringify(state.WorkLogsBlocks))
    }


    const FindWorklogById = (id: number | undefined): {
        SoughtWorklog: TWorkLog
        WorklogBlockIndex: number | undefined
        WorklogIndex: number | undefined
        NestingWorklogIndex: number | undefined
    } => {
        let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()
        let SoughtWorklog = {} as TWorkLog
        let WorklogBlockIndex = undefined as number | undefined
        let WorklogIndex = undefined as number | undefined
        let NestingWorklogIndex = undefined as number | undefined

        WorklogsBlocksCopy.map((WorklogBlock, Index) => {
            WorklogBlock.Worklogs.map((Worklog, WLIndex) => {

                if (Worklog.NestingItems && Worklog.NestingItems.length > 0 && Worklog.id !== id) {
                    Worklog.NestingItems?.map((NestingItem, NestingIndex) => {
                        if (NestingItem.id === id) {

                            SoughtWorklog = {
                                ...NestingItem
                            }
                            WorklogBlockIndex = Index
                            NestingWorklogIndex = NestingIndex
                            WorklogIndex = WLIndex
                        }
                    })
                } else {
                    if (Worklog.id === id) {
                        WorklogBlockIndex = Index
                        SoughtWorklog = Worklog
                        WorklogIndex = WLIndex
                    }
                }
            })
        })
        return {SoughtWorklog, WorklogBlockIndex, WorklogIndex, NestingWorklogIndex}
    }

    switch (action.type) {
        case ADD_WORKLOG: {

            let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()
            let EmptyWorklog: TWorkLog = {
                StartTime: null,
                EndTime: null,
                id: randomInteger(0, 10000),
                NestingItems: null,
                TaskField: null,
                Issue: null,
                TimerValue: "00:00:00",
                status: "danger",
                ParentId: undefined,
                IsFavorites: action.IsFavorites
            }
            let WorklogToCreate = {} as TWorkLog

            action.NewWorklog
                ? WorklogToCreate = action.NewWorklog
                : WorklogToCreate = EmptyWorklog

            if (WorklogsBlocksCopy.some(WBL => WBL.BlockInfo.BlockCreatedDate === CurrentDate)) {
                WorklogsBlocksCopy.map(WBL => {
                    WBL.BlockInfo.BlockCreatedDate === CurrentDate && WBL.Worklogs.unshift(WorklogToCreate)
                })
            } else {
                WorklogsBlocksCopy.unshift({
                    BlockInfo: {
                        id: randomInteger(0, 10000),
                        BlockCreatedDate: CurrentDate,
                        SummaryStatus: "danger",
                        SummaryTime: "00:00:00"
                    }, Worklogs: [
                        WorklogToCreate
                    ]
                })
            }

            return {
                ...state,
                WorkLogsBlocks: WorklogsBlocksCopy,
                PlayingWorklog: WorklogToCreate,
                FavoritesWorklogs: action.IsFavorites ? [...state.FavoritesWorklogs, EmptyWorklog] : []
            }
        }

        case SET_IS_PLAYING_WORKLOG_BY_ID: {
            let SoughtWorklog = FindWorklogById(action.ElementId).SoughtWorklog
            action.IsFavorites ? SoughtWorklog.IsFavorites = true : SoughtWorklog.IsFavorites = false
            return {
                ...state,
                PlayingWorklog: action.IsPlaying ?
                    SoughtWorklog
                    : null
            }
        }
        case CHANGE_WORKLOG: {
            let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()

            WorklogsBlocksCopy.map(WB => WB.Worklogs.map(Worklog => {

                if (WB.BlockInfo.BlockCreatedDate === CurrentDate) {

                    if(Worklog.Issue === action.NewWorklog.Issue){

                        if(Worklog.id !== action.NewWorklog.id){
                            WB.Worklogs = WB.Worklogs.filter(FWorklog=>FWorklog.id !== action.NewWorklog.id)
                            if(Worklog.NestingItems && Worklog.NestingItems?.length > 0){
                                Worklog.NestingItems.map(NestingItem=>{
                                    if(NestingItem.id === action.NewWorklog.id){
                                        if(NestingItem.Issue === action.NewWorklog.Issue)
                                            Object.assign(NestingItem,action.NewWorklog)

                                    } else Worklog.NestingItems?.push(action.NewWorklog)
                                })
                            } else Worklog.NestingItems = [action.NewWorklog]


                        }else Object.assign(Worklog,action.NewWorklog)

                    }else {
                        if(Worklog.id === action.NewWorklog.id) Object.assign(Worklog,action.NewWorklog)

                        else if(Worklog.NestingItems && Worklog.NestingItems?.length > 0){
                            Worklog.NestingItems.map(CNestingItem => {
                                if(CNestingItem.id === action.NewWorklog.id && CNestingItem.Issue !== action.NewWorklog.Issue){
                                    Worklog.NestingItems = Worklog.NestingItems?.filter(FNestingItem=>FNestingItem.id !== action.NewWorklog.id)
                                    WB.Worklogs.push(action.NewWorklog)
                                }
                            })
                        }
                    }
                }

            }))
            return {
                ...state,
                WorkLogsBlocks: WorklogsBlocksCopy
            }
        }
        case DEL_WORKLOG: {
            let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()
            let NewWorklogs: Array<Array<TWorkLog>> = []
            let NewNestingWorklogs: Array<Array<TNestingItem> | undefined> = []
            let FilteredWorklogBlockCopy = [] as Array<TWorklogBlock>

            WorklogsBlocksCopy.map((WBL, index) => {

                if (action.DelParentId) {
                    WBL.Worklogs.map((Worklog, WLIndex) => {
                        if (Worklog.id === action.DelParentId) {
                            NewNestingWorklogs.push(Worklog.NestingItems?.filter(NestingItem => NestingItem.id !== action.DelWorklogId))
                            WorklogsBlocksCopy[index].Worklogs[WLIndex].NestingItems = NewNestingWorklogs[index]
                        }
                    })
                } else {
                    NewWorklogs.push(WBL.Worklogs.filter(WL => WL.id !== action.DelWorklogId))
                    WorklogsBlocksCopy[index].Worklogs = NewWorklogs[index]
                }
                if (WBL.Worklogs.length === 0) {
                    FilteredWorklogBlockCopy = WorklogsBlocksCopy.filter(WBLtrue => WBLtrue !== WBL)
                }
            })
            return {
                ...state,
                WorkLogsBlocks: FilteredWorklogBlockCopy.length > 0 ? FilteredWorklogBlockCopy : WorklogsBlocksCopy
            }
        }
        case SET_WORKLOG_TO_CHANGE : {
            return {
                ...state,
                WorklogToChange: action.WorklogToChange ? action.WorklogToChange : null
            }
        }
        case ADD_TO_FAVORITE : {
            let {SoughtWorklog} = FindWorklogById(action.WorklogId)
            return {
                ...state,
                FavoritesWorklogs: [...state.FavoritesWorklogs, SoughtWorklog]
            }
        }
        case SET_WORKLOG_STATUS: {
            let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()
            if (action.options.target === "worklog") {
                WorklogsBlocksCopy.map(WB => WB.Worklogs.map(Worklog => {
                    if (Worklog.id === action.options.id) Worklog.status = action.options.status
                }))
            } else {
                WorklogsBlocksCopy.map(WB => {
                    if (WB.BlockInfo.id === action.options.id) WB.BlockInfo.SummaryStatus = action.options.status
                })
            }

            return {
                ...state,
                WorkLogsBlocks: WorklogsBlocksCopy
            }
        }
        case DELETE_FROM_FAVORITES : {
            return {
                ...state,
                FavoritesWorklogs: state.FavoritesWorklogs.filter(FavoritesWorklog => FavoritesWorklog.id !== action.WorklogId)
            }
        }
        case CHANGE_FAVORITES_WORKLOG : {
            let WorklogsBlocksCopy: Array<TWorklogBlock> = GetWorklogsBlockCopy()
            let FavoritesWorklogsCopy: Array<TWorkLog> = JSON.parse(JSON.stringify(state.FavoritesWorklogs))
            FavoritesWorklogsCopy.map(FavoritesWorklog => {
                if (FavoritesWorklog.NestingItems && FavoritesWorklog.NestingItems?.length > 0) {
                    FavoritesWorklog.NestingItems.map(NestingItem => {
                        if (NestingItem.id === action.WorklogId)
                            Object.assign(NestingItem, action.NewWorklog)
                    })
                } else Object.assign(FavoritesWorklog, action.NewWorklog)
            })

            WorklogsBlocksCopy.some(WBL => WBL.BlockInfo.BlockCreatedDate === CurrentDate)
                ? WorklogsBlocksCopy.map(WBL => {

                    WBL.Worklogs.some(Worklog => Worklog.id === action.WorklogId
                        || Worklog.NestingItems?.some(Nest => Nest.id === action.WorklogId))

                        ? WBL.Worklogs.some(Worklog => Worklog.NestingItems && Worklog.NestingItems.length > 0)
                        ? WBL.Worklogs.map(Worklog => {
                            Worklog.NestingItems?.map(NestingItem => {
                                if (NestingItem.id === action.WorklogId)
                                    Object.assign(NestingItem, action.NewWorklog)
                            })
                        })
                        : WBL.Worklogs.map(Worklog => {
                            if (Worklog.id === action.WorklogId)
                                Object.assign(Worklog, action.NewWorklog)
                        })
                        : WBL.Worklogs.unshift(action.NewWorklog)
                })
                : WorklogsBlocksCopy.unshift({
                    BlockInfo: {
                        BlockCreatedDate: CurrentDate,
                        SummaryStatus: "danger",
                        id: randomInteger(0, 10000),
                        SummaryTime: "00:00:00"
                    },
                    Worklogs: [
                        action.NewWorklog
                    ]
                })
            return {
                ...state,
                WorkLogsBlocks: WorklogsBlocksCopy,
                FavoritesWorklogs: FavoritesWorklogsCopy
            }
        }

        default :
            return state
    }
}

export const AddWorklog = (NewWorklog ?: TWorkLog, IsFavorites?: boolean) => {
    return {type: ADD_WORKLOG, NewWorklog, IsFavorites} as const
}
export type TAddWorklog = typeof AddWorklog

export const DeleteWorklog = (DelWorklogId: number, DelParentId: number | null = null) => {
    return {type: DEL_WORKLOG, DelWorklogId, DelParentId} as const
}
export type TDeleteWorklog = typeof DeleteWorklog

export const SetIsPlayingWorklogById = (IsPlaying: boolean, ElementId?: number, IsFavorites ?: boolean) => {
    return {type: SET_IS_PLAYING_WORKLOG_BY_ID, IsPlaying, ElementId, IsFavorites} as const
}
export type TSetIsPlayingWorklogById = typeof SetIsPlayingWorklogById

export const ChangeWorklog = (NewWorklog: TWorkLog) => {
    return {type: CHANGE_WORKLOG,  NewWorklog} as const
}
export type TChangeWorklog = typeof ChangeWorklog

export const SetWorklogToChange = (WorklogToChange: TWorkLog | undefined = undefined) => {
    return {type: SET_WORKLOG_TO_CHANGE, WorklogToChange} as const
}
export type TSetWorklogToChange = typeof SetWorklogToChange

export const AddToFavorite = (WorklogId: number) => {
    return {type: ADD_TO_FAVORITE, WorklogId} as const
}
export type TAddToFavorite = typeof AddToFavorite


// export const SendWorklogBlockThunk = (WorklogBlockData: TSendWorklogsData): TWorklogsThunks => async (dispatch) => {
//
//     const SendNewMessageResult = await API.SendWorklogBlock(WorklogBlockData)
//     // if (SendNewMessageResult.resultCode === 0) {
//     //     dispatch(GetWorklogs(WorklogBlockId))
//     // }
// }
// export type TSendWorklogBlockThunk = typeof SendWorklogBlockThunk

export const SetWorklogStatus = (options: {
    target: "worklog" | "worklogblock",
    id: number,
    status: "ok" | "danger" | "warning"
}) => {
    return {type: SET_WORKLOG_STATUS, options} as const
}
export type TSetWorklogStatus = typeof SetWorklogStatus

export const DeleteFromFavorites = (WorklogId: number) => {
    return {type: DELETE_FROM_FAVORITES, WorklogId} as const
}

export type TDeleteFromFavorites = typeof DeleteFromFavorites

export const ChangeFavoritesWorklog = (WorklogId: number, NewWorklog: TWorkLog) => {
    return {type: CHANGE_FAVORITES_WORKLOG, WorklogId, NewWorklog} as const
}

export type TChangeFavoritesWorklog = typeof ChangeFavoritesWorklog

export default WorklogsReducer
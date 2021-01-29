import {TShowSnackBar} from "../App";
import {TTimerData} from "../Redux/WorkLogsReducer";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"

export type TWorklogsContainerOwnProps={
    openWorklogChangeModal: () => void
    ComponentToDraw: TComponentToDraw
    ShowSnackBar: TShowSnackBar
    TimerData: TTimerData | undefined

    closeWorklogChangeModal: () => void
    SetTimerData: (data : TTimerData | undefined) => void
}


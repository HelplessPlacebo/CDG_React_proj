import {TShowSnackBar} from "../App";
import {TTimerData} from "../Redux/WorkLogsReducer";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"

export type TWorklogsContainerOwnProps={

    openWorklogChangeModal: () => void
    componentToDraw: TComponentToDraw
    showSnackBar: TShowSnackBar
    timerData: TTimerData | undefined

    closeWorklogChangeModal: () => void
    setTimerData: (data : TTimerData | undefined) => void
}


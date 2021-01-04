import {TShowSnackBar} from "../App";
import {TTimerData} from "../Data/WorkLogsReducer";
import {TComponentToDraw} from "../Components/WorkLogs/WorkLogsContainer";

export type TWorklogsContainerOwnProps={
    openWorklogChangeModal: () => void
    ComponentToDraw: TComponentToDraw
    ShowSnackBar: TShowSnackBar
    TimerData: TTimerData | undefined

    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    SetTimerData: (data : TTimerData | undefined) => void
}


import React, {Dispatch, SetStateAction, useState} from "react";
import {DifferenceInTime} from "../../assets/secondary/DifferenceInTime";
import WorkLog from "./WorkLog";
import WorklogInfo from "./WorklogInfo/WorklogInfo";
import WLS from "./WorkLog.module.css"
import {
    TAddToFavorite,
    TAddWorklog,
    TBlockInfo, TDeleteFromFavorites,
    TDeleteWorklog,
    TSendWorklogBlockThunk,
    TSetIsPlayingWorklogById,
    TSetWorklogStatus,
    TSetWorklogToChange,
    TTimerData,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import {TComponentToDraw} from "./WorkLogsContainer";
import {TShowSnackBar} from "../../App";


export type TWorklogsBlockProps = {
    BlockInfo?: TBlockInfo
    Worklogs: Array<TWorkLog>
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog | null
    DeleteWorklog: TDeleteWorklog
    SetWorklogToChange: TSetWorklogToChange
    openWorklogChangeModal: () => void
    ComponentToDraw: TComponentToDraw
    AddToFavorite: TAddToFavorite
    AddWorklog: TAddWorklog
    SendWorklogBlockThunk: TSendWorklogBlockThunk
    ShowSnackBar: TShowSnackBar
    SetWorklogStatus: TSetWorklogStatus
    DeleteFromFavorites : TDeleteFromFavorites
    FavoritesWorklogs : Array<TWorkLog>

    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
}

export type TDeleteModalParams = {
    ParentId?: number
    WorkLogToDeleteId: number
}

const WorkLogsBlock: React.FC<TWorklogsBlockProps> = (props) => {
    let [DeleteModalIsOpen, SetDeleteModalIsOpen] = useState(false)
    let [DeleteModalParams, SetDeleteModalParams] = useState<TDeleteModalParams>()

    const OnDeleteModalOpen = (e: React.MouseEvent<HTMLElement>) => {
        SetDeleteModalIsOpen(true)
    }
    const OnDeleteModalClose = () => {
        SetDeleteModalIsOpen(false)
    }

    return (<>
        {props.ComponentToDraw === "Worklogs" && props.BlockInfo &&
        <div id={(props.BlockInfo?.id).toString()} className={WLS.WorklogInfoContainer}>
            <WorklogInfo DateOfCreation={props.BlockInfo.BlockCreatedDate}
                         SummaryTime={props.BlockInfo.SummaryTime}
                         SummaryStatus={props.BlockInfo.SummaryStatus}
                         Worklogs={props.Worklogs}
                         SendWorklogBlockThunk={props.SendWorklogBlockThunk}
                         BlockInfo={props.BlockInfo}
                         ShowSnackBar={props.ShowSnackBar}
                         SetWorklogStatus={props.SetWorklogStatus}
            />
        </div>
        }

        {
                props[props.ComponentToDraw].map(el => {
                    return <div key={el.id} className="worklog">
                        <WorkLog
                            {...el}
                            {...props}
                            TimerValue={el.TimerValue
                                ? el.TimerValue
                                : el.StartTime && el.EndTime
                                    ? DifferenceInTime([el.StartTime, el.EndTime])
                                    : null}
                            DeleteModalIsOpen={DeleteModalIsOpen}
                            OnDeleteModalClose={OnDeleteModalClose}
                            OnDeleteModalOpen={OnDeleteModalOpen}
                            SetDeleteModalParams={SetDeleteModalParams}
                            DeleteModalParams={DeleteModalParams}
                            AddWorklog={props.AddWorklog}
                            DeleteWorklog={props.DeleteWorklog }
                            DeleteFromFavorites={props.DeleteFromFavorites}
                        />
                    </div>
                })
        }

    </>)
}

export default WorkLogsBlock
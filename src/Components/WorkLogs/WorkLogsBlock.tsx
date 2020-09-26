import React, {useState} from "react";
import {DifferenceInTime} from "../../assets/secondary/DifferenceInTime";
import WorkLog from "./WorkLog";
import WorklogInfo from "./WorklogInfo/WorklogInfo";
import WLS from "./WorkLog.module.css"
import {
    TAddToFavorite,
    TAddWorklog,
    TBlockInfo,
    TDeleteWorklog,
    TSendWorklogBlockThunk,
    TSetIsPlayingWorklogById,
    TSetWorklogStatus,
    TSetWorklogToChange,
    TTimerData,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import WorkLogTimeLine from "./SliderTimePicker/WorkLogTimeLine";
import {TComponentToDraw} from "./WorkLogsContainer";
import {TShowTooltip} from "../../App";


export type TWorklogsBlockProps = {
    BlockInfo?: TBlockInfo
    Worklogs: Array<TWorkLog>
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog
    DeleteWorklog: TDeleteWorklog
    SetWorklogToChange: TSetWorklogToChange
    openWorklogChangeModal: () => void
    TimerData: TTimerData | undefined
    ComponentToDraw: TComponentToDraw
    FavoritesWorklogs: Array<TWorkLog>
    AddToFavorite: TAddToFavorite
    AddWorklog: TAddWorklog
    SendWorklogBlockThunk: TSendWorklogBlockThunk
    showTooltip : TShowTooltip
    SetWorklogStatus: TSetWorklogStatus
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
                         FavoritesWorklogs={props.FavoritesWorklogs}
                         Worklogs={props.Worklogs}
                         SendWorklogBlockThunk={props.SendWorklogBlockThunk}
                         BlockInfo={props.BlockInfo}
                         showTooltip={props.showTooltip}
                         SetWorklogStatus={props.SetWorklogStatus}
            />
        </div>
        }


        {props[props.ComponentToDraw] && props[props.ComponentToDraw].map(el => {

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
                />
            </div>
        })}
        <div className={WLS.WorkLogSliderPose}>
            <WorkLogTimeLine/>
        </div>

    </>)
}

export default WorkLogsBlock
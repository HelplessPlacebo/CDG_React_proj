import React from "react";
import FS from "./WorklogInfo.module.css"
import DownloadIcon from "../../../assets/imgs/download.svg"
import ProgressBar from "../../ProgressBar/ProgressBar";
import LineStroke from "../../LineStroke/LineStroke";
import {
    TBlockInfo,
    TSendWorklogBlockThunk,
    TSendWorklogsData,
    TSetWorklogStatus,
    TWorkLog
} from "../../../Data/WorkLogsReducer";
import {TShowTooltip} from "../../../App";

export type TWorklogInfoProps = {
    DateOfCreation: string | null
    SummaryTime: string | null
    SummaryStatus: "ok" | "danger" | "warning" | string
    BlockInfo: TBlockInfo
    Worklogs: Array<TWorkLog>
    SendWorklogBlockThunk: TSendWorklogBlockThunk
    FavoritesWorklogs: Array<TWorkLog>
    showTooltip: TShowTooltip
    SetWorklogStatus: TSetWorklogStatus
}

const WorklogInfo: React.FC<TWorklogInfoProps> = (props) => {

    const OnSendWorklogData = () => {
        props.Worklogs.map(Worklog => {
            if (!Worklog.Issue || Worklog.Issue.length <= 0) {
                props.showTooltip({
                    text: "Issue does not exist.",
                    status: "danger"
                })
                props.SetWorklogStatus({target: "worklog", status: "danger", id: Worklog.id})
            } else if (!Worklog.TaskField || Worklog.TaskField.length <= 0) {
                props.showTooltip({
                    text: "Please, enter the worklog name.",
                    status: "warning"
                })
                props.SetWorklogStatus({target: "worklog", status: "warning", id: Worklog.id})
            } else if (!Worklog.TimerValue || !Worklog.StartTime || !Worklog.EndTime) {
                props.showTooltip({text: "Something goes wrong", status: "danger"})
            } else {
                props.SetWorklogStatus({target: "worklog", status: "ok", id: Worklog.id})
                props.showTooltip({text: "your worklog successfully logged.", status: "ok"})
            }

        })

        if (props.Worklogs.every(Worklog => Worklog.EndTime && Worklog.StartTime && Worklog.TimerValue
            && Worklog.TaskField && Worklog.Issue)) {
            let ObjToSend: TSendWorklogsData = {
                FavoritesWorklogs: props.FavoritesWorklogs,
                WorkLogsBlocks: {
                    BlockInfo: props.BlockInfo,
                    Worklogs: props.Worklogs
                }
            }
            props.SendWorklogBlockThunk(ObjToSend)
            props.SetWorklogStatus({target: "worklogblock", status: "ok", id: props.BlockInfo.id})
            props.showTooltip({text: "your worklog successfully logged.", status: "ok"})
        }
    }


    return (
        <>
            <div className={FS.SummaryWorklogInfo}>
                <div className={FS.DateBlockContainer}>
                    <div className={FS.DateBlockSize}>
                        {props.DateOfCreation}
                    </div>
                </div>
                <div className={FS.DateTime}>
                    <div>
                        {props.SummaryTime}
                    </div>

                    <div className={FS.Progress}>
                        <ProgressBar status={props.SummaryStatus}/>
                    </div>
                </div>
                <div  onClick={OnSendWorklogData} className={FS.DownloadIcon}>
                    <img  src={DownloadIcon} alt="download-icon"/>
                </div>
            </div>
            <div className={FS.WLlineStrokeContainer}>
                <LineStroke/>
            </div>
        </>
    )
}

export default WorklogInfo
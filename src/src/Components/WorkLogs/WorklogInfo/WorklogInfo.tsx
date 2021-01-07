import React from "react";
import FS from "./WorklogInfo.module.css"
import ProgressBar from "../../ProgressBar/ProgressBar";
import LineStroke from "../../LineStroke/LineStroke";
import {
    CurrentDate, TBlockInfo, TSendWorklogsData, TSetWorklogStatus, TWorkLog
} from "../../../Data/WorkLogsReducer";
import {TShowSnackBar} from "../../../App";
import BackupIcon from '@material-ui/icons/Backup';
import CreateSnackBarOptions from "../../../assets/secondary/CreateSnackbarOptions";


export type TWorklogInfoProps = {
    DateOfCreation: string | null
    SummaryTime: string | null
    SummaryStatus: "ok" | "danger" | "warning" | string
    BlockInfo: TBlockInfo
    Worklogs: Array<TWorkLog>
    ShowSnackBar: TShowSnackBar
    SetWorklogStatus: TSetWorklogStatus
}

const WorklogInfo: React.FC<TWorklogInfoProps> = (props) => {

    const OnSendWorklogData = (): void => {
        props.Worklogs.map(Worklog => {
            if (!Worklog.Issue || Worklog.Issue.length <= 0) {
                props.ShowSnackBar(CreateSnackBarOptions("error", "Issue does not exist"))
                props.SetWorklogStatus({target: "worklog", status: "danger", id: Worklog.id})
            } else if (!Worklog.TaskField || Worklog.TaskField.length <= 0) {
                props.ShowSnackBar(CreateSnackBarOptions("warning", "Please, enter the worklog name"))
                props.SetWorklogStatus({target: "worklog", status: "warning", id: Worklog.id})
            } else if (!Worklog.TimerValue || !Worklog.StartTime || !Worklog.EndTime) {
                props.ShowSnackBar(CreateSnackBarOptions("error", "something goes wrong"))
            } else {
                props.SetWorklogStatus({target: "worklog", status: "ok", id: Worklog.id})
                props.ShowSnackBar(CreateSnackBarOptions("success", "your worklog successfully logged"))
            }
        })

        if (props.Worklogs.every(Worklog => Worklog.EndTime && Worklog.StartTime && Worklog.TimerValue
            && Worklog.TaskField && Worklog.Issue)) {
            // let ObjToSend: TSendWorklogsData = {
            //     WorkLogsBlocks: {
            //         BlockInfo: props.BlockInfo,
            //         Worklogs: props.Worklogs
            //     }
            // }
            //props.SendWorklogBlockThunk(ObjToSend)
            props.SetWorklogStatus({target: "worklogblock", status: "ok", id: props.BlockInfo.id})
            props.ShowSnackBar(CreateSnackBarOptions("success", "your worklog successfully logged"))
        } else {
            props.ShowSnackBar(CreateSnackBarOptions("error", "Issue does not exist"))
            props.SetWorklogStatus({target: "worklogblock", status: "danger", id: props.BlockInfo.id})
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

                {
                    props.BlockInfo.BlockCreatedDate === CurrentDate
                        ? <BackupIcon style={{cursor: "pointer"}} color={"primary"} fontSize={"large"}
                                      onClick={OnSendWorklogData}
                                      className={FS.DownloadIcon}/>

                        : <BackupIcon color={"disabled"} fontSize={"large"} className={FS.DownloadIcon}/>
                }

            </div>

            <div className={FS.WLlineStrokeContainer}>
                <LineStroke/>
            </div>

        </>
    )
}

export default WorklogInfo
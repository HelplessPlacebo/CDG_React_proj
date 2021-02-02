import React from "react";
import FS from "./WorklogInfo.module.css"
import ProgressBar from "../../ProgressBar/ProgressBar";
import {LineStroke} from "../../LineStroke/LineStroke";
import {CurrentDate, TBlockInfo, TSetWorklogStatus, TWorkLog} from "../../../Redux/WorkLogsReducer";
import {TShowSnackBar} from "../../../App";
import BackupIcon from '@material-ui/icons/Backup';
import CreateSnackBarOptions from "../../../assets/secondary/CreateSnackbarOptions";


export type TWorklogInfoProps = {
    dateOfCreation: string | null
    summaryTime: string | null
    summaryStatus: "ok" | "danger" | "warning" | string
    blockInfo: TBlockInfo
    worklogs: Array<TWorkLog>
    showSnackBar: TShowSnackBar
    setWorklogStatus: TSetWorklogStatus
}

export const WorklogInfo: React.FC<TWorklogInfoProps> = (props) => {

    const OnSendWorklogData = (): void => {
        props.worklogs.map(Worklog => {
            if (!Worklog.Issue || Worklog.Issue.length <= 0) {
                props.showSnackBar(CreateSnackBarOptions("error", "Issue does not exist"))
                props.setWorklogStatus({target: "worklog", status: "danger", id: Worklog.id})
            } else if (!Worklog.TaskField || Worklog.TaskField.length <= 0) {
                props.showSnackBar(CreateSnackBarOptions("warning", "Please, enter the worklog name"))
                props.setWorklogStatus({target: "worklog", status: "warning", id: Worklog.id})
            } else if (!Worklog.TimerValue || !Worklog.StartTime || !Worklog.EndTime) {
                props.showSnackBar(CreateSnackBarOptions("error", "something goes wrong"))
            } else {
                props.setWorklogStatus({target: "worklog", status: "ok", id: Worklog.id})
                props.showSnackBar(CreateSnackBarOptions("success", "your worklog successfully logged"))
            }
        })

        if (props.worklogs.every(Worklog => Worklog.EndTime && Worklog.StartTime && Worklog.TimerValue
            && Worklog.TaskField && Worklog.Issue)) {
            // let ObjToSend: TSendWorklogsData = {
            //     WorkLogsBlocks: {
            //         BlockInfo: props.BlockInfo,
            //         Worklogs: props.Worklogs
            //     }
            // }
            //props.SendWorklogBlockThunk(ObjToSend)
            props.setWorklogStatus({target: "worklogblock", status: "ok", id: props.blockInfo.id})
            props.showSnackBar(CreateSnackBarOptions("success", "your worklog successfully logged"))
        } else {
            props.showSnackBar(CreateSnackBarOptions("error", "Issue does not exist"))
            props.setWorklogStatus({target: "worklogblock", status: "danger", id: props.blockInfo.id})
        }
    }


    return (
        <>
            <div className={FS.SummaryWorklogInfo}>

                <div className={FS.DateBlockContainer}>
                    {props.dateOfCreation}
                </div>

                <div className={FS.statusContainer}>
                    <div className={FS.DateTime}>

                        <div>
                            {props.summaryTime}
                        </div>

                        <div className={FS.Progress}>
                            <ProgressBar status={props.summaryStatus}/>
                        </div>

                    </div>

                    {
                        props.blockInfo.BlockCreatedDate === CurrentDate
                            ? <BackupIcon style={{cursor: "pointer"}} color={"primary"} fontSize={"large"}
                                          onClick={OnSendWorklogData}
                                          className={FS.DownloadIcon}/>

                            : <BackupIcon color={"disabled"} fontSize={"large"} className={FS.DownloadIcon}/>
                    }
                </div>

            </div>

            <div className={FS.WLlineStrokeContainer}>
                <LineStroke/>
            </div>

        </>
    )
}

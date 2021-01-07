import React, {useState} from "react";
import WorkLog from "./WorkLog";
import WorklogInfo from "./WorklogInfo/WorklogInfo";
import WLS from "./WorkLog.module.css"
import {TBlockInfo, TWorkLog} from "../../Data/WorkLogsReducer";
import {TWorklogsContainerProps} from "./WorkLogsContainer";

export type TWorklogsBlockOwnProps={
    Worklogs: TWorkLog[]
    BlockInfo?: TBlockInfo
}
export type TWorklogsBlockProps = TWorklogsContainerProps & TWorklogsBlockOwnProps

export type TDeleteModalParams = {
    ParentId?: number
    WorkLogToDeleteId: number
}

const WorkLogsBlock: React.FC<TWorklogsBlockProps> = (props) => {
    let [DeleteModalIsOpen, SetDeleteModalIsOpen] = useState(false)
    let [DeleteModalParams, SetDeleteModalParams] = useState<TDeleteModalParams>()

    const OnDeleteModalOpen = () => SetDeleteModalIsOpen(true)
    const OnDeleteModalClose = () => SetDeleteModalIsOpen(false)


    return <>
        {
            props.ComponentToDraw === "Worklogs" && props.BlockInfo &&
            <div id={(props.BlockInfo?.id).toString()} className={WLS.WorklogInfoContainer}>

                <WorklogInfo DateOfCreation={props.BlockInfo.BlockCreatedDate}
                             SummaryTime={props.BlockInfo.SummaryTime}
                             SummaryStatus={props.BlockInfo.SummaryStatus}
                             Worklogs={props.Worklogs}
                             BlockInfo={props.BlockInfo}
                             ShowSnackBar={props.ShowSnackBar}
                             SetWorklogStatus={props.SetWorklogStatus}/>
            </div>
        }

        {
            props[props.ComponentToDraw].map(el =>
                <div key={el.id} className="worklog">
                    <WorkLog
                        WorklogInfo={el}
                        {...props}
                        DeleteModalIsOpen={DeleteModalIsOpen}
                        OnDeleteModalClose={OnDeleteModalClose}
                        OnDeleteModalOpen={OnDeleteModalOpen}
                        SetDeleteModalParams={SetDeleteModalParams}
                        DeleteModalParams={DeleteModalParams}
                        />
                </div>
            )
        }

    </>
}

export default WorkLogsBlock
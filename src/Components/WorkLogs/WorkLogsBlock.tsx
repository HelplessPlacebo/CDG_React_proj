import React, {useState} from "react";
import WorkLog from "./WorkLog";
import {WorklogInfo} from "./WorklogInfo/WorklogInfo";
import WLS from "./WorkLog.module.css"
import {
    TAddToFavorite,
    TAddWorklog,
    TDeleteFromFavorites,
    TDeleteWorklog,
    TSetIsPlayingWorklogById,
    TSetWorklogStatus,
    TSetWorklogToChange,
    TWorkLog,
    TWorklogBlock
} from "../../Redux/WorkLogsReducer";
import {TWorklogsBlockContainerProps} from "./WorklogsBlockContainer";
import {useBooleanState} from "../hooks/useBooleanState";

export type TWorklogsBlockOwnProps = {
    AddWorklog: TAddWorklog
    DeleteWorklog: TDeleteWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    SetWorklogToChange: TSetWorklogToChange
    AddToFavorite: TAddToFavorite
    SetWorklogStatus: TSetWorklogStatus
    DeleteFromFavorites: TDeleteFromFavorites
    WorklogsBlocks: TWorklogBlock[]
    PlayingWorklog: TWorkLog | null
    FavoritesWorklogs: TWorkLog[]
}
export type TWorklogsBlockProps = TWorklogsBlockContainerProps & TWorklogsBlockOwnProps

export type TDeleteModalParams = {
    ParentId?: number
    WorkLogToDeleteId: number
}

export const WorkLogsBlock: React.FC<TWorklogsBlockProps> = (props) => {
    const DeleteModalStatus = useBooleanState(false)
    const [DeleteModalParams, SetDeleteModalParams] = useState<TDeleteModalParams>()

    return <>
        {
            props.ComponentToDraw === "Worklogs"
                ? props.WorklogsBlocks.map(WorklogBlock => <div key={WorklogBlock.BlockInfo.id} className="Worklogs">
                    <div className={WLS.WorklogInfoContainer}>
                        <WorklogInfo DateOfCreation={WorklogBlock.BlockInfo.BlockCreatedDate}
                                     SummaryTime={WorklogBlock.BlockInfo.SummaryTime}
                                     SummaryStatus={WorklogBlock.BlockInfo.SummaryStatus}
                                     Worklogs={WorklogBlock.Worklogs}
                                     BlockInfo={WorklogBlock.BlockInfo}
                                     ShowSnackBar={props.ShowSnackBar}
                                     SetWorklogStatus={props.SetWorklogStatus}/>
                    </div>

                    {
                        WorklogBlock.Worklogs.map(Worklog => <div key={Worklog.id} className="WorklogContainer">
                                <WorkLog
                                    WorklogInfo={Worklog}
                                    {...props}
                                    BlockInfo={WorklogBlock.BlockInfo}
                                    DeleteModalIsOpen={DeleteModalStatus.isDisplayed}
                                    OnDeleteModalClose={DeleteModalStatus.Hide}
                                    OnDeleteModalOpen={DeleteModalStatus.Show}
                                    SetDeleteModalParams={SetDeleteModalParams}
                                    DeleteModalParams={DeleteModalParams}
                                />
                            </div>
                        )
                    }

                </div>
                )
                : <div className="FavoritesWorklogs">
                    {
                        props.FavoritesWorklogs && props.FavoritesWorklogs.length > 0 && props.FavoritesWorklogs.map(
                            FavoritesWorklog => <div key={FavoritesWorklog.id} className="FavoritesWorklogContainer">
                                <WorkLog
                                    WorklogInfo={FavoritesWorklog}
                                    {...props}
                                    DeleteModalIsOpen={DeleteModalStatus.isDisplayed}
                                    OnDeleteModalClose={DeleteModalStatus.Hide}
                                    OnDeleteModalOpen={DeleteModalStatus.Show}
                                    SetDeleteModalParams={SetDeleteModalParams}
                                    DeleteModalParams={DeleteModalParams}
                                />
                            </div>
                        )
                    }
                </div>
        }
    </>
}
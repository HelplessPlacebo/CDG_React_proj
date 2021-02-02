import React, {useState} from "react";
import {WorkLog} from "./WorkLog";
import {WorklogInfo} from "./WorklogInfo/WorklogInfo";
import WLS from "./WorkLog.module.css"
import {useBooleanState} from "../hooks/useBooleanState"
import {useSelector} from "react-redux"
import {getFavoritesWorklog, getPlayingWorklog, getWorklogsBlocks} from "../Selectors/WorklogsSelectors"
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions"
import {TWorklogsContainerOwnProps} from "../../globalTypes/Types"
import {DeleteWorklogConfirmModal} from "../DeleteConfirmModal/DeleteConfirmModal";
import {TWorkLog} from "../../Redux/WorkLogsReducer";


export const WorkLogsBlock: React.FC<TWorklogsContainerOwnProps> = (props) => {
    const worklogsBlocks = useSelector(getWorklogsBlocks)
    const playingWorklog = useSelector(getPlayingWorklog)
    const favoritesWorklogs = useSelector(getFavoritesWorklog)

    const WFS = useWorklogsFunctions()

    const deleteModalStatus = useBooleanState(false)
    const [worklogToDelete, setWorklogToDelete] = useState<TWorkLog | null>(null)
    const onDeleteWorklog = () => {
        if (worklogToDelete) {
            props.componentToDraw === "Worklogs"
                ? WFS.deleteWorklog(worklogToDelete.id, worklogToDelete.ParentId)
                : WFS.deleteFromFavorites(worklogToDelete.id)
            deleteModalStatus.Hide()
        }
    }


    return <div className="WorklogsBlock">
        {
            props.componentToDraw === "Worklogs"
                ? worklogsBlocks.map(WorklogBlock => <div key={WorklogBlock.BlockInfo.id} className="Worklogs">
                    <div className={WLS.WorklogInfoContainer}>
                        <WorklogInfo dateOfCreation={WorklogBlock.BlockInfo.BlockCreatedDate}
                                     summaryTime={WorklogBlock.BlockInfo.SummaryTime}
                                     summaryStatus={WorklogBlock.BlockInfo.SummaryStatus}
                                     worklogs={WorklogBlock.Worklogs}
                                     blockInfo={WorklogBlock.BlockInfo}
                                     showSnackBar={props.showSnackBar}
                                     setWorklogStatus={WFS.setWorklogStatus}/>
                    </div>
                    {
                        WorklogBlock.Worklogs.map(Worklog => <div key={Worklog.id} className="WorklogContainer">
                                <WorkLog
                                    {...props}
                                    worklogInfo={Worklog}
                                    showDeleteModal={deleteModalStatus.Show}
                                    setWorklogToDelete={setWorklogToDelete}
                                    blockInfo={WorklogBlock.BlockInfo}
                                    setWorklogToChange={WFS.setWorklogToChange}
                                    setIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                                    playingWorklog={playingWorklog}
                                    addWorklog={WFS.addWorklog}
                                    addToFavorite={WFS.addToFavorite}
                                />
                            </div>
                        )
                    }
                </div>
                )
                : <div className="FavoritesWorklogs">
                    {
                        favoritesWorklogs.length > 0 && favoritesWorklogs.map(
                            FavoritesWorklog => <div key={FavoritesWorklog.id} className="FavoritesWorklogContainer">
                                <WorkLog
                                    {...props}
                                    worklogInfo={FavoritesWorklog}
                                    showDeleteModal={deleteModalStatus.Show}
                                    setWorklogToChange={WFS.setWorklogToChange}
                                    setWorklogToDelete={setWorklogToDelete}
                                    setIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                                    playingWorklog={playingWorklog}
                                    addWorklog={WFS.addWorklog}
                                    addToFavorite={WFS.addToFavorite}
                                />
                            </div>
                        )
                    }
                </div>
        }
        <DeleteWorklogConfirmModal isOpen={deleteModalStatus.isDisplayed} onClose={deleteModalStatus.Hide}
                                   onSubmit={onDeleteWorklog}/>
    </div>
}
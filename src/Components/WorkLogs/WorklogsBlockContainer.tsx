import React from 'react'
import {useSelector} from "react-redux";
import {TTimerData} from "../../Redux/WorkLogsReducer";
import {WorkLogsBlock} from "./WorkLogsBlock";
import {TShowSnackBar} from "../../App";
import {getFavoritesWorklog, getPlayingWorklog, getWorklogsBlocks} from "../Selectors/WorklogsSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";

export type TWorklogsBlockContainerProps = {
    ComponentToDraw: "Worklogs" | "FavoritesWorklogs"
    TimerData?: TTimerData
    openWorklogChangeModal: () => void
    ShowSnackBar: TShowSnackBar
    closeWorklogChangeModal: () => void
    SetTimerData: (TimerData: TTimerData | undefined) => void
}

export const WorklogsBlockContainer: React.FC<TWorklogsBlockContainerProps> = (props) => {
    const worklogsBlocks = useSelector(getWorklogsBlocks)
    const playingWorklog = useSelector(getPlayingWorklog)
    const favoritesWorklogs = useSelector(getFavoritesWorklog)

    const WFS = useWorklogsFunctions()

    return <div className="WorklogBlockWrapper">
        {
                <WorkLogsBlock AddWorklog={WFS.addWorklog} DeleteWorklog={WFS.deleteWorklog}
                               SetIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                               SetWorklogToChange={WFS.setWorklogToChange} AddToFavorite={WFS.addToFavorite}
                               SetWorklogStatus={WFS.setWorklogStatus}
                               DeleteFromFavorites={WFS.deleteFromFavorites} WorklogsBlocks={worklogsBlocks}
                               PlayingWorklog={playingWorklog}
                               FavoritesWorklogs={favoritesWorklogs}
                               openWorklogChangeModal={props.openWorklogChangeModal}
                               ComponentToDraw={props.ComponentToDraw} ShowSnackBar={props.ShowSnackBar}
                               TimerData={props.TimerData} closeWorklogChangeModal={props.closeWorklogChangeModal}
                               SetTimerData={props.SetTimerData}
                />
        }
    </div>
}
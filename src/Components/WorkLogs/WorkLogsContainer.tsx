import React from 'react'
import {connect} from "react-redux";
import {GlobalState} from "../../Data/redux-store"
import {
    TWorklogBlock,
    AddWorklog,
    SetIsPlayingWorklogById,
    DeleteWorklog, SetWorklogToChange, AddToFavorite,
    SetWorklogStatus,DeleteFromFavorites,
    TDeleteWorklog, TAddWorklog, TSetIsPlayingWorklogById, TWorkLog,
    TSetWorklogToChange, TAddToFavorite, TSetWorklogStatus, TDeleteFromFavorites
} from "../../Data/WorkLogsReducer";
import WorkLogsBlock from "./WorkLogsBlock";
import {TWorklogsContainerOwnProps} from "../../globalTypes/Types";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"


export type T_MSTP_WorkLogsContainer = {
    WorklogsBlocks: Array<TWorklogBlock>
    PlayingWorklog: TWorkLog | null
    FavoritesWorklogs : Array<TWorkLog>
}

export type T_MDTP_WorkLogsContainer = {
    AddWorklog: TAddWorklog
    DeleteWorklog: TDeleteWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    SetWorklogToChange: TSetWorklogToChange
    AddToFavorite: TAddToFavorite
    SetWorklogStatus: TSetWorklogStatus
    DeleteFromFavorites : TDeleteFromFavorites
}


export type TWorklogsContainerProps = T_MDTP_WorkLogsContainer & T_MSTP_WorkLogsContainer & TWorklogsContainerOwnProps

const WorkLogsContainer:React.FC<TWorklogsContainerProps> =(props)=>{
        return (
            <div className="WorklogBlockWrapper">
                {props.ComponentToDraw === "Worklogs"
                    ? props.WorklogsBlocks.map(el => {
                        return <div key={el.BlockInfo.id} className="Worklogs">
                            <WorkLogsBlock BlockInfo={el.BlockInfo}
                                           Worklogs={el.Worklogs}
                                           {...props}
                            />
                        </div>
                    })
                    :
                    <div style={{paddingTop: "52px"}} className="FavoritesWorklogsWrapper">
                        <WorkLogsBlock
                            {...props}
                            Worklogs={props.FavoritesWorklogs}
                        />
                    </div>

                }
            </div>
        )
    }

const StateToProps = (state: GlobalState): T_MSTP_WorkLogsContainer => ({
    WorklogsBlocks: state.WorklogsData.WorkLogsBlocks,
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    FavoritesWorklogs : state.WorklogsData.FavoritesWorklogs
})

export default connect<T_MSTP_WorkLogsContainer, T_MDTP_WorkLogsContainer, TWorklogsContainerOwnProps, GlobalState>
(StateToProps, {
    AddWorklog, DeleteWorklog, SetIsPlayingWorklogById, SetWorklogToChange, AddToFavorite,
    SetWorklogStatus,DeleteFromFavorites
})(WorkLogsContainer)
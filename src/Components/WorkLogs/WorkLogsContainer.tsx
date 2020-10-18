import React, {Dispatch, SetStateAction} from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {GlobalState} from "../../Data/redux-store"
import {
    TWorklogBlock,
    AddWorklog,
    SetIsPlayingWorklogById,
    DeleteWorklog, SetWorklogToChange, AddToFavorite, SendWorklogBlockThunk,
    SetWorklogStatus,DeleteFromFavorites,
    TDeleteWorklog, TAddWorklog, TSetIsPlayingWorklogById, TWorkLog,
    TSetWorklogToChange, TTimerData, TAddToFavorite, TSendWorklogBlockThunk, TSetWorklogStatus, TDeleteFromFavorites
} from "../../Data/WorkLogsReducer";
import WorkLogsBlock from "./WorkLogsBlock";
import {TShowTooltip} from "../../App";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"
export type TWorkLogsContainerOwnProps = {
    openWorklogChangeModal: () => void
    ComponentToDraw: TComponentToDraw
    showTooltip: TShowTooltip

    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
}

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
    SendWorklogBlockThunk: TSendWorklogBlockThunk
    SetWorklogStatus: TSetWorklogStatus
    DeleteFromFavorites : TDeleteFromFavorites
}


type TDialogsContainerProps = T_MDTP_WorkLogsContainer & T_MSTP_WorkLogsContainer & TWorkLogsContainerOwnProps

class WorkLogsContainer extends React.Component<TDialogsContainerProps> {

    render() {
        return (
            <div className="WorklogBlockWrapper">
                {this.props.ComponentToDraw === "Worklogs"
                    ? this.props.WorklogsBlocks.map(el => {
                        return <div key={el.BlockInfo.id} className="Worklogs">
                            <WorkLogsBlock BlockInfo={el.BlockInfo}
                                           Worklogs={el.Worklogs}
                                           {...this.props}
                            />
                        </div>
                    })
                    :
                    <div style={{paddingTop: "52px"}} className="FavoritesWorklogsWrapper">
                        <WorkLogsBlock
                            {...this.props}
                            Worklogs={this.props.FavoritesWorklogs}
                        />
                    </div>

                }
            </div>
        )
    }
}

let StateToProps = (state: GlobalState): T_MSTP_WorkLogsContainer => ({
    WorklogsBlocks: state.WorklogsData.WorkLogsBlocks,
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    FavoritesWorklogs : state.WorklogsData.FavoritesWorklogs
})

export default compose(connect<T_MSTP_WorkLogsContainer, T_MDTP_WorkLogsContainer, TWorkLogsContainerOwnProps, GlobalState>
(StateToProps, {
    AddWorklog, DeleteWorklog,
    SetIsPlayingWorklogById, SetWorklogToChange, AddToFavorite,
    SendWorklogBlockThunk,SetWorklogStatus,DeleteFromFavorites
}))
    //@ts-ignore
    (WorkLogsContainer)
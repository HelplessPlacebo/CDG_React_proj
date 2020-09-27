import React from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
import {GlobalState} from "../../Data/redux-store"
import {
    TWorklogBlock,
    AddWorklog,
    SetIsPlayingWorklogById,
    DeleteWorklog, SetWorklogToChange, AddToFavorite, SendWorklogBlockThunk,
    SetWorklogStatus,
    TDeleteWorklog, TAddWorklog, TSetIsPlayingWorklogById, TWorkLog,
    TSetWorklogToChange, TTimerData, TAddToFavorite, TSendWorklogBlockThunk, TSetWorklogStatus
} from "../../Data/WorkLogsReducer";
import WorkLogsBlock from "./WorkLogsBlock";
import {TShowTooltip} from "../../App";

export type TComponentToDraw = "Worklogs" | "FavoritesWorklogs"

export type TWorkLogsContainerOwnProps = {
    openWorklogChangeModal: () => void
    TimerData: TTimerData | undefined
    ComponentToDraw: TComponentToDraw
    showTooltip: TShowTooltip
}

export type T_MSTP_WorkLogsContainer = {
    WorklogsBlocks: Array<TWorklogBlock>
    PlayingWorklog: TWorkLog
}

export type T_MDTP_WorkLogsContainer = {
    AddWorklog: TAddWorklog
    DeleteWorklog: TDeleteWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    SetWorklogToChange: TSetWorklogToChange
    AddToFavorite: TAddToFavorite
    SendWorklogBlockThunk: TSendWorklogBlockThunk
    SetWorklogStatus: TSetWorklogStatus
}


type TDialogsContainerProps = T_MDTP_WorkLogsContainer & T_MSTP_WorkLogsContainer & TWorkLogsContainerOwnProps

class WorkLogsContainer extends React.Component<TDialogsContainerProps> {


    render() {
        return (
            <div className="WorklogBlockWrapper">
                { this.props.WorklogsBlocks.map(el => {
                        return <div key={el.BlockInfo.id} className="Worklogs">
                            <WorkLogsBlock BlockInfo={el.BlockInfo}
                                           Worklogs={el.Worklogs}
                                           AddWorklog={this.props.AddWorklog}
                                           SetIsPlayingWorklogById={this.props.SetIsPlayingWorklogById}
                                           DeleteWorklog={this.props.DeleteWorklog}
                                           SetWorklogToChange={this.props.SetWorklogToChange}
                                           PlayingWorklog={this.props.PlayingWorklog}
                                           openWorklogChangeModal={this.props.openWorklogChangeModal}
                                           TimerData={this.props.TimerData}
                                           ComponentToDraw={this.props.ComponentToDraw}
                                           AddToFavorite={this.props.AddToFavorite}
                                           SendWorklogBlockThunk={this.props.SendWorklogBlockThunk}
                                           showTooltip={this.props.showTooltip}
                                           SetWorklogStatus={this.props.SetWorklogStatus}
                            />
                        </div>
                    })

                } </div>
        )
    }

}

let StateToProps = (state: GlobalState): T_MSTP_WorkLogsContainer => ({
    WorklogsBlocks: state.WorklogsData.WorkLogsBlocks,
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
})

export default compose(connect<T_MSTP_WorkLogsContainer, T_MDTP_WorkLogsContainer, TWorkLogsContainerOwnProps, GlobalState>
(StateToProps, {
    AddWorklog, DeleteWorklog,
    SetIsPlayingWorklogById, SetWorklogToChange, AddToFavorite, SendWorklogBlockThunk,SetWorklogStatus
}))
    //@ts-ignore
    (WorkLogsContainer)
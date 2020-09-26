import React, {Dispatch, SetStateAction} from 'react'
import {connect} from "react-redux";
import {compose} from "redux";
// import {withRouter} from 'react-router-dom'
import ChangeWorklogModal from "./ChangeWorklogModal";
import {GlobalState} from "../../Data/redux-store";
import {
    TAddWorklog, TChangeWorklog, TSetIsPlayingWorklogById,
    TTimerData, TWorkLog, ChangeWorklog, TSetWorklogToChange,
    SetWorklogToChange
}
    from "../../Data/WorkLogsReducer";
import {AddWorklog, SetIsPlayingWorklogById} from "../../Data/WorkLogsReducer";

export type TModalWindowContainerOwnProps = {
    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
}

export type T_MSTP_ModalWindowContainer = {
    PlayingWorklog: TWorkLog
    WorklogToChange: TWorkLog | undefined
}

export type T_MDTP_ModalWindowContainer = {
    AddWorklog: TAddWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    ChangeWorklog: TChangeWorklog
    SetWorklogToChange: TSetWorklogToChange
}
type TModalWindowContainerProps =
    T_MDTP_ModalWindowContainer
    & T_MSTP_ModalWindowContainer
    & TModalWindowContainerOwnProps

class ChangeWorklogModalContainer extends React.Component<TModalWindowContainerProps> {


    render() {
        return (
            <ChangeWorklogModal closeWorklogChangeModal={this.props.closeWorklogChangeModal}
                                WorklogChangeModalIsOpen={this.props.WorklogChangeModalIsOpen}
                                SetIsPlayingWorklogById={this.props.SetIsPlayingWorklogById}
                                PlayingWorklog={this.props.PlayingWorklog}
                                TimerData={this.props.TimerData}
                                WorklogToChange={this.props.WorklogToChange}
                                ChangeWorklog={this.props.ChangeWorklog}
                                SetTimerData={this.props.SetTimerData}
                                SetWorklogToChange={this.props.SetWorklogToChange}
            />
        )
    }

}

let StateToProps = (state: GlobalState): T_MSTP_ModalWindowContainer => ({
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    WorklogToChange: state.WorklogsData.WorklogToChange
})

export default compose(connect<T_MSTP_ModalWindowContainer, T_MDTP_ModalWindowContainer, TModalWindowContainerOwnProps, GlobalState>
(StateToProps, {
    AddWorklog, SetIsPlayingWorklogById, SetWorklogToChange,
    ChangeWorklog
}))(ChangeWorklogModalContainer)
import React from 'react'
import {connect} from "react-redux";
import ChangeWorklogModal from "./ChangeWorklogModal";
import {GlobalState} from "../../Data/redux-store";
import {
    TAddWorklog, TChangeWorklog, TSetIsPlayingWorklogById,
    TTimerData, TWorkLog, ChangeWorklog, TSetWorklogToChange,
    SetWorklogToChange, ChangeFavoritesWorklog, TChangeFavoritesWorklog
}
    from "../../Data/WorkLogsReducer";
import {AddWorklog, SetIsPlayingWorklogById} from "../../Data/WorkLogsReducer";

export type TModalWindowContainerOwnProps = {
    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: (data :TTimerData | undefined) => void
    Issues: string[]
}

export type T_MSTP_ModalWindowContainer = {
    PlayingWorklog: TWorkLog | null
    WorklogToChange: TWorkLog | null

}

export type T_MDTP_ModalWindowContainer = {
    AddWorklog: TAddWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    ChangeWorklog: TChangeWorklog
    SetWorklogToChange: TSetWorklogToChange
    ChangeFavoritesWorklog: TChangeFavoritesWorklog
}

export type TModalWindowContainerProps =
    T_MDTP_ModalWindowContainer
    & T_MSTP_ModalWindowContainer
    & TModalWindowContainerOwnProps

const ChangeWorklogModalContainer: React.FC<TModalWindowContainerProps> = (props) => {
    return <ChangeWorklogModal {...props}/>
}



let StateToProps = (state: GlobalState): T_MSTP_ModalWindowContainer => ({
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    WorklogToChange: state.WorklogsData.WorklogToChange
})

export default connect<T_MSTP_ModalWindowContainer, T_MDTP_ModalWindowContainer, TModalWindowContainerOwnProps, GlobalState>
(StateToProps, {
    AddWorklog, SetIsPlayingWorklogById, SetWorklogToChange,
    ChangeWorklog, ChangeFavoritesWorklog
})(ChangeWorklogModalContainer)
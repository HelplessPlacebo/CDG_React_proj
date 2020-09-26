import React, {SyntheticEvent, useState} from "react";
import DS from "./DeleteConfirm.module.css"
import ConfirmButton from "../../assets/imgs/confirmButton.svg"
import DeclineButton from "../../assets/imgs/declineButton.svg"
import MS from "../ModalWindow/ModalWindow.module.css";
import {TDeleteWorklog} from "../../Data/WorkLogsReducer";
import {TDeleteModalParams} from "../WorkLogs/WorkLogsBlock";


export type TDeleteWorklogConfirmModalProps = {
  isOpen : boolean
    onClose: ()=> void
    WorkLogToDeleteId : number
    DeleteWorklog : TDeleteWorklog
    DeleteModalParams : TDeleteModalParams | undefined
}

const DeleteWorklogConfirmModal : React.FC<TDeleteWorklogConfirmModalProps> = (props) => {
    const OnModalSubmit = (e: React.MouseEvent<HTMLElement>) => {
        if(props.DeleteModalParams)
        props.DeleteWorklog(props.DeleteModalParams.WorkLogToDeleteId,props.DeleteModalParams.ParentId)
        props.onClose()
        debugger
    }
        if (!props.isOpen) return null

        return (
            <div className="DeleteConfirmModal">
                <div className={DS.modal}>
                    <div className={DS.ModalTextContainer}>
                        Are you sure you want to delete the worklog?
                    </div>
                    <div className={DS.NewWorklogControlButtonsContainer}>
                        <div className={DS.NewWorklogControlButtons}>
                            <div onClick={OnModalSubmit} className="modal-open">
                                <img className={DS.NewWorklogSubmitButtonSize}
                                     src={ConfirmButton} alt={"submit"}/>
                            </div>
                            <div className="modal-close">
                                <img onClick={props.onClose} className={DS.NewWorklogControlButton}
                                     src={DeclineButton} alt={"decline"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={MS.bg} onClick={e => props.onClose}/>
            </div>
        )
    }

export default DeleteWorklogConfirmModal


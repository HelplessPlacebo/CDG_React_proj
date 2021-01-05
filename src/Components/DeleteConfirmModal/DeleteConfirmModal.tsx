import React from "react";
import DS from "./DeleteConfirm.module.css"
import MS from "../ChangeWorklogModal/ModalWindow.module.css";
import {TDeleteFromFavorites, TDeleteWorklog} from "../../Data/WorkLogsReducer";
import {TDeleteModalParams} from "../WorkLogs/WorkLogsBlock";
import {TComponentToDraw} from "../WorkLogs/WorkLogsContainer";
import CustomizedButton from "../CustomizedButton/CustomizedButton";

export type TDeleteWorklogConfirmModalProps = {
    isOpen: boolean
    onClose: () => void
    DeleteWorklog: TDeleteWorklog | TDeleteFromFavorites
    DeleteModalParams: TDeleteModalParams | undefined
    ComponentToDraw: TComponentToDraw
    DeleteFromFavorites: TDeleteFromFavorites
}

const DeleteWorklogConfirmModal: React.FC<TDeleteWorklogConfirmModalProps> = (props) => {
    const OnModalSubmit = () => {
        if (props.DeleteModalParams) {
            props.ComponentToDraw === "Worklogs"
                ? props.DeleteWorklog(props.DeleteModalParams.WorkLogToDeleteId, props.DeleteModalParams.ParentId)
                : props.DeleteFromFavorites(props.DeleteModalParams.WorkLogToDeleteId)
            props.onClose()
        }
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
                            <CustomizedButton bgColor={"teal"} text={"delete"}
                                              variant={"contained"} fontSize={14}/>
                        </div>

                        <div onClick={props.onClose} className="modal-close">
                            <CustomizedButton bgColor={"grey"} text={"go back"}
                                              variant={"contained"} fontSize={14} fontColor={"common"}/>
                        </div>

                    </div>
                </div>
            </div>
            <div className={MS.bg}/>
        </div>
    )
}

export default DeleteWorklogConfirmModal


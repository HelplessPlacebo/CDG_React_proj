import React from "react";
import DS from "./DeleteConfirm.module.css"
import ConfirmButton from "../../assets/imgs/confirmButton.svg"
import DeclineButton from "../../assets/imgs/declineButton.svg"
import MS from "../ChangeWorklogModal/ModalWindow.module.css";
import {TDeleteFromFavorites, TDeleteWorklog} from "../../Data/WorkLogsReducer";
import {TDeleteModalParams} from "../WorkLogs/WorkLogsBlock";
import {TComponentToDraw} from "../WorkLogs/WorkLogsContainer";
import ClearIcon from '@material-ui/icons/Clear';
import { green } from '@material-ui/core/colors';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

export type TDeleteWorklogConfirmModalProps = {
    isOpen : boolean
    onClose: ()=> void
    WorkLogToDeleteId : number
    DeleteWorklog : TDeleteWorklog | TDeleteFromFavorites
    DeleteModalParams : TDeleteModalParams | undefined
    ComponentToDraw : TComponentToDraw
    DeleteFromFavorites : TDeleteFromFavorites
}

const DeleteWorklogConfirmModal : React.FC<TDeleteWorklogConfirmModalProps> = (props) => {
    const OnModalSubmit = (e: React.MouseEvent<HTMLElement>) => {
        if(props.DeleteModalParams){
           props.ComponentToDraw === "Worklogs"
               ? props.DeleteWorklog(props.DeleteModalParams.WorkLogToDeleteId,props.DeleteModalParams.ParentId)
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
                                <CheckOutlinedIcon style={{color: green[500], cursor : "pointer"}}  fontSize="large" />
                               {/* <img className={DS.NewWorklogSubmitButtonSize}
                                     src={ConfirmButton} alt={"submit"}/>*/}
                            </div>
                            <div className="modal-close">
                                <ClearIcon onClick={props.onClose}  style={{cursor : "pointer", marginLeft : "50px"}}  fontSize="large" color="action" />
                        {/*        <img onClick={props.onClose} className={DS.NewWorklogControlButton}
                                     src={DeclineButton} alt={"decline"}/>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={MS.bg} onClick={e => props.onClose}/>
            </div>
        )
    }

export default DeleteWorklogConfirmModal


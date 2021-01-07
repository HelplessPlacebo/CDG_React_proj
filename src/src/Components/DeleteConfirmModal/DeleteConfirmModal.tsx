import React from "react";
import {TDeleteFromFavorites, TDeleteWorklog} from "../../Data/WorkLogsReducer";
import {TDeleteModalParams} from "../WorkLogs/WorkLogsBlock";
import {TComponentToDraw} from "../WorkLogs/WorkLogsContainer";
import CustomizedButton from "../CustomizedButton/CustomizedButton";
import Dialog from "@material-ui/core/Dialog/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import Grid from "@material-ui/core/Grid/Grid"
import DeleteIcon from '@material-ui/icons/Delete';

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

    return <Dialog
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"confirm window"}</DialogTitle>
        <DialogContent>
            <Grid container justify="center" alignItems="center">

                <Grid item style={{fontSize: "1.275rem", fontWeight: 600}}>
                    Are you sure you want to delete the worklog?
                </Grid>

                <Grid style={{paddingTop:"2rem",paddingBottom:"2rem"}} item>
                    <Grid container direction="row" alignItems="center" justify="space-around">

                        <Grid item>
                            <div onClick={OnModalSubmit} className="modal-open">
                                <CustomizedButton bgColor={"teal"} text={"delete"}
                                                  variant={"contained"} fontSize={14} startIcon={<DeleteIcon/>}/>
                            </div>
                        </Grid>

                        <Grid item>
                            <div onClick={props.onClose} className="modal-close">
                                <CustomizedButton bgColor={"grey"} text={"go back"}
                                                  variant={"contained"} fontSize={14} fontColor={"common"}/>
                            </div>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


        </DialogContent>

    </Dialog>

}

export default DeleteWorklogConfirmModal


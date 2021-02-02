import React from "react";
import {CustomizedButton} from "../CustomElements/CustomizedButton/CustomizedButton";
import Dialog from "@material-ui/core/Dialog/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import Grid from "@material-ui/core/Grid/Grid"
import DeleteIcon from '@material-ui/icons/Delete';

export type TDeleteWorklogConfirmModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
}

export const DeleteWorklogConfirmModal: React.FC<TDeleteWorklogConfirmModalProps> = (props) => {
    return <>
        {
            props.isOpen && <Dialog
                open={props.isOpen}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">confirm window</DialogTitle>
                <DialogContent>
                    <Grid container justify="center" alignItems="center">

                        <Grid item style={{fontSize: "1.275rem", fontWeight: 600}}>
                            Are you sure you want to delete the worklog?
                        </Grid>

                        <Grid style={{paddingTop: "2rem", paddingBottom: "2rem"}} item>
                            <Grid container direction="row" alignItems="center" justify="space-around">

                                <Grid item>

                                    <CustomizedButton bgColor={"teal"} text={"delete"} onClick={props.onSubmit}
                                                      variant={"contained"} fontSize={14} startIcon={<DeleteIcon/>}/>

                                </Grid>

                                <Grid item>

                                    <CustomizedButton bgColor={"grey"} text={"go back"} onClick={props.onClose}
                                                      variant={"contained"} fontSize={14} fontColor={"common"}/>


                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </DialogContent>

            </Dialog>
        }
    </>
}



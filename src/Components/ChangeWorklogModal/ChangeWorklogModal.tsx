import React, {SyntheticEvent, useEffect, useState,} from "react"
import MS from "./ModalWindow.module.css"
import {TimeSlider} from "./TimeSlider/TimeSlider"
import {CalculateNewStartTime, ToFullTime} from "../../assets/secondary/CalculateTime"
import {IssuesSelectInput} from "../Issues/Inputs/IssuesSelectInput"
import {CustomInput} from "../CustomElements/CustomInput/CustomInput"
import {useInput} from "../hooks/useInput"
import {TModalWindowContainerProps} from "./ChangeWorklogModalContainer";
import Dialog from "@material-ui/core/Dialog/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import Grid from "@material-ui/core/Grid/Grid"
import SaveIcon from '@material-ui/icons/Save';
import {
    TAddWorklog,
    TChangeFavoritesWorklog,
    TChangeWorklog,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange,
    TWorkLog
} from "../../Redux/WorkLogsReducer";
import {CustomizedButton} from "../CustomElements/CustomizedButton/CustomizedButton";


type TTimerValue = {
    start: string | null
    end: string | null
}
type TChangeWorklogModalProps = TModalWindowContainerProps & {
    issues: string[]
    worklogToChange: TWorkLog | null
    playingWorklog: TWorkLog  | null

    changeFavoritesWorklog: TChangeFavoritesWorklog
    setIsPlayingWorklogById: TSetIsPlayingWorklogById
    setWorklogToChange: TSetWorklogToChange
    changeWorklog: TChangeWorklog
    addWorklog: TAddWorklog
}

const ChangeWorklogModal: React.FC<TChangeWorklogModalProps> = (props) => {

    const modalWorklogInput = useInput(props.worklogToChange && props.worklogToChange.TaskField ? props.worklogToChange.TaskField : "")
    const modalIssueInput = useInput(props.worklogToChange && props.worklogToChange.Issue ? props.worklogToChange.Issue : "")
    const [modalTimeLineValues, setModalTimeLineValues] = useState<TTimerValue>()
    const [newWorklogNameIsFilled, setNewWorklogNameIsFilled] = useState<boolean>(false)
    const [newIssueNameIsFilled, setNewIssueNameIsFilled] = useState<boolean>(false)

    let EmptyWorklogTimerMinutes = props.timerData?.TimerValue.substr(3, props.timerData?.TimerValue.length - 6)
    let EmptyWorklogTimerEndHours = props.timerData?.TimerValue.substr(0, props.timerData?.TimerValue.length - 6)
    let CurrentTime = ToFullTime(new Date().getHours()) + ":" + ToFullTime(new Date().getMinutes())
    let EmptyWorklogTimeValues = {
        start: CalculateNewStartTime(CurrentTime, EmptyWorklogTimerEndHours, EmptyWorklogTimerMinutes) as string | null,
        end: CurrentTime as string | null
    }

    useEffect(() => {

        if (props.timerData) {
            props.timerData.TimerTaskField && modalWorklogInput.forceUpdate(props.timerData.TimerTaskField)
            props.timerData.TimerIssue && modalIssueInput.forceUpdate(props.timerData.TimerIssue)
            if (props.playingWorklog && props.playingWorklog.StartTime && props.playingWorklog.EndTime) {
                setModalTimeLineValues({
                    start: props.playingWorklog.StartTime,
                    end: props.playingWorklog.EndTime
                })
            } else setModalTimeLineValues(EmptyWorklogTimeValues)
        } else if (props.worklogToChange) {
            props.worklogToChange.TaskField && modalWorklogInput.forceUpdate(props.worklogToChange.TaskField)
            props.worklogToChange.Issue && modalIssueInput.forceUpdate(props.worklogToChange.Issue)
            setModalTimeLineValues({
                start: props.worklogToChange.StartTime,
                end: props.worklogToChange.EndTime
            })
        }
    }, [props.timerData?.TimerIssue, props.timerData?.TimerTaskField, props.timerData?.TimerValue,
        props.worklogToChange])

    const OnModalSubmit = (e: SyntheticEvent) => {
        {
            modalWorklogInput.value.length > 0
                ? setNewWorklogNameIsFilled(false)
                : setNewWorklogNameIsFilled(true)
        }
        {
            modalIssueInput.value.length > 0
                ? setNewIssueNameIsFilled(false)
                : setNewIssueNameIsFilled(true)
        }

        if (modalWorklogInput.value.length > 0
            && modalIssueInput.value.length > 0
            && modalTimeLineValues) {

            let Obj : string
            if (props.timerData) Obj = "playingWorklog"; else Obj = "worklogToChange"

            let NewWL = {
                //@ts-ignore
                ...props[Obj],
                StartTime: modalTimeLineValues.start,
                EndTime: modalTimeLineValues.end,
                TaskField: modalWorklogInput.value,
                Issue: modalIssueInput.value,
                //@ts-ignore
                status: props[Obj].status ? props[Obj].status : "warning",

                TimerValue: props.timerData && props.timerData.TimerValue ? props.timerData.TimerValue
                    //@ts-ignore
                    : props[Obj].TimerValue ? props[Obj].TimerValue : "00:00:00"
            }

            if (NewWL.IsFavorites) {
                //@ts-ignore
                props.changeFavoritesWorklog(props[Obj].id, NewWL)
                //@ts-ignore
                props.setIsPlayingWorklogById(false, props[Obj].id)
            } else {
                //@ts-ignore
                props.changeWorklog(NewWL)
                //@ts-ignore
                props.setIsPlayingWorklogById(false, props[Obj].id)
            }
            modalWorklogInput.clear()
            modalIssueInput.clear()
            setNewWorklogNameIsFilled(false)
            setNewIssueNameIsFilled(false)
            close(e)
        }
    }


    const close = (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.closeWorklogChangeModal) {
            props.closeWorklogChangeModal()
        }
        props.setTimerData(undefined)
        props.setWorklogToChange(undefined)
        props.setIsPlayingWorklogById(false)
        modalWorklogInput.clear()
        modalIssueInput.clear()
    }


    if (!props.worklogChangeModalIsOpen) return null;

    return (
        <Dialog
            open={props.worklogChangeModalIsOpen}
            onClose={props.closeWorklogChangeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"New worklog"}</DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center">

                    <Grid item className="TimeSLider" style={{paddingTop: "10%"}}>
                        {
                            modalTimeLineValues?.start && modalTimeLineValues?.end &&
                            <TimeSlider value={modalTimeLineValues} disabled={false}
                                        step={10} SetTimerValue={setModalTimeLineValues}/>
                        }
                    </Grid>

                    <Grid item style={{paddingTop: "3rem"}} className="Inputs">

                        <CustomInput {...modalWorklogInput.bind} label={"Task Field"}
                                     placeholder={"Please, enter the task"} width={500}/>

                        {
                            newWorklogNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter worklog name</div>
                        }

                        <div style={{paddingTop: "1rem"}}>
                            {
                                //@ts-ignore
                                <IssuesSelectInput issues={props.issues}{...modalIssueInput.bind} />
                            }
                        </div>


                        {
                            newIssueNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter issue name</div>
                        }

                    </Grid>

                    <Grid item style={{paddingTop: "3rem", paddingBottom: "1rem"}} className="ContorlButtons">
                        <Grid container direction="row" justify="space-around" alignItems="center">

                            <Grid item onClick={OnModalSubmit}>
                                <CustomizedButton fontColor="blue" bgColor="white" text="save"
                                                  variant="outlined" fontSize={14} startIcon={<SaveIcon/>}/>
                            </Grid>

                            <Grid onClick={props.closeWorklogChangeModal}>
                                <CustomizedButton fontColor="red" text={"go back"}
                                                  variant={"outlined"} fontSize={14}/>
                            </Grid>

                        </Grid>


                    </Grid>

                </Grid>


            </DialogContent>
        </Dialog>

    )
}

export default React.memo(ChangeWorklogModal, (prevProps, nextProps) => {
    if (prevProps.worklogChangeModalIsOpen !== nextProps.worklogChangeModalIsOpen) return false
    else return true
})
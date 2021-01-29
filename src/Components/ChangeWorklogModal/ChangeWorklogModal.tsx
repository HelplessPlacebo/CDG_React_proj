import React, {SyntheticEvent, useState, useEffect,} from "react"
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
    TChangeFavoritesWorklog, TChangeWorklog,
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
    Issues: string[]
    WorklogToChange: TWorkLog | null
    PlayingWorklog: TWorkLog | null

    ChangeFavoritesWorklog: TChangeFavoritesWorklog
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    SetWorklogToChange: TSetWorklogToChange
    ChangeWorklog: TChangeWorklog
    AddWorklog: TAddWorklog
}

const ChangeWorklogModal: React.FC<TChangeWorklogModalProps> = (props) => {

    const ModalWorklogInput = useInput(props.WorklogToChange && props.WorklogToChange.TaskField ? props.WorklogToChange.TaskField : "")
    const ModalIssueInput = useInput(props.WorklogToChange && props.WorklogToChange.Issue ? props.WorklogToChange.Issue : "")
    const [ModalTimeLineValues, SetModalTimeLineValues] = useState<TTimerValue>()
    const [NewWorklogNameIsFilled, SetNewWorklogNameIsFilled] = useState<boolean>(false)
    const [NewIssueNameIsFilled, SetNewIssueNameIsFilled] = useState<boolean>(false)

    let EmptyWorklogTimerMinutes = props.TimerData?.TimerValue.substr(3, props.TimerData?.TimerValue.length - 6)
    let EmptyWorklogTimerEndHours = props.TimerData?.TimerValue.substr(0, props.TimerData?.TimerValue.length - 6)
    let CurrentTime = ToFullTime(new Date().getHours()) + ":" + ToFullTime(new Date().getMinutes())
    let EmptyWorklogTimeValues = {
        start: CalculateNewStartTime(CurrentTime, EmptyWorklogTimerEndHours, EmptyWorklogTimerMinutes) as string | null,
        end: CurrentTime as string | null
    }

    useEffect(() => {

        if (props.TimerData) {
            props.TimerData.TimerTaskField && ModalWorklogInput.forceUpdate(props.TimerData.TimerTaskField)
            props.TimerData.TimerIssue && ModalIssueInput.forceUpdate(props.TimerData.TimerIssue)
            if (props.PlayingWorklog && props.PlayingWorklog.StartTime && props.PlayingWorklog.EndTime) {
                SetModalTimeLineValues({
                    start: props.PlayingWorklog.StartTime,
                    end: props.PlayingWorklog.EndTime
                })
            } else SetModalTimeLineValues(EmptyWorklogTimeValues)
        } else if (props.WorklogToChange) {
            props.WorklogToChange.TaskField && ModalWorklogInput.forceUpdate(props.WorklogToChange.TaskField)
            props.WorklogToChange.Issue && ModalIssueInput.forceUpdate(props.WorklogToChange.Issue)
            SetModalTimeLineValues({
                start: props.WorklogToChange.StartTime,
                end: props.WorklogToChange.EndTime
            })
        }
    }, [props.TimerData?.TimerIssue, props.TimerData?.TimerTaskField, props.TimerData?.TimerValue,
        props.WorklogToChange])

    const OnModalSubmit = (e: SyntheticEvent) => {
        {
            ModalWorklogInput.value.length > 0
                ? SetNewWorklogNameIsFilled(false)
                : SetNewWorklogNameIsFilled(true)
        }
        {
            ModalIssueInput.value.length > 0
                ? SetNewIssueNameIsFilled(false)
                : SetNewIssueNameIsFilled(true)
        }

        if (ModalWorklogInput.value.length > 0
            && ModalIssueInput.value.length > 0
            && ModalTimeLineValues) {

            let Obj: string
            if (props.TimerData) Obj = "PlayingWorklog"; else Obj = "WorklogToChange"
            let NewWL = {
                //@ts-ignore
                ...props[Obj],
                StartTime: ModalTimeLineValues.start,
                EndTime: ModalTimeLineValues.end,
                TaskField: ModalWorklogInput.value,
                Issue: ModalIssueInput.value,
                //@ts-ignore
                status: props[Obj].status ? props[Obj].status : "warning",
                //@ts-ignore
                TimerValue: props.TimerData && props.TimerData.TimerValue ? props.TimerData.TimerValue
                    //@ts-ignore
                    : props[Obj].TimerValue ? props[Obj].TimerValue : "00:00:00"
            }

            if (NewWL.IsFavorites) {
                //@ts-ignore
                props.ChangeFavoritesWorklog(props[Obj].id, NewWL)
                //@ts-ignore
                props.SetIsPlayingWorklogById(false, props[Obj].id)
            } else {
                //@ts-ignore
                props.ChangeWorklog(NewWL)
                //@ts-ignore
                props.SetIsPlayingWorklogById(false, props[Obj].id)
            }
            ModalWorklogInput.clear()
            ModalIssueInput.clear()
            SetNewWorklogNameIsFilled(false)
            SetNewIssueNameIsFilled(false)
            close(e)
        }
    }


    const close = (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.closeWorklogChangeModal) {
            props.closeWorklogChangeModal()
        }
        props.SetTimerData(undefined)
        props.SetWorklogToChange(undefined)
        props.SetIsPlayingWorklogById(false)
        ModalWorklogInput.clear()
        ModalIssueInput.clear()
    }


    if (!props.WorklogChangeModalIsOpen) return null;

    return (
        <Dialog
            open={props.WorklogChangeModalIsOpen}
            onClose={props.closeWorklogChangeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"New worklog"}</DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center">

                    <Grid item className="TimeSLider" style={{paddingTop: "10%"}}>
                        {
                            ModalTimeLineValues?.start && ModalTimeLineValues?.end &&
                            <TimeSlider value={ModalTimeLineValues} disabled={false}
                                        step={10} SetTimerValue={SetModalTimeLineValues}/>
                        }
                    </Grid>

                    <Grid item style={{paddingTop: "3rem"}} className="Inputs">

                        <CustomInput {...ModalWorklogInput.bind} label={"Task Field"}
                                     placeholder={"Please, enter the task"} width={500}/>

                        {
                            NewWorklogNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter worklog
                                name</div>
                        }

                        <div style={{paddingTop: "1rem"}}>
                            {
                                //@ts-ignore
                                <IssuesSelectInput Issues={props.Issues}{...ModalIssueInput.bind} />
                            }
                        </div>


                        {
                            NewIssueNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter issue
                                name</div>
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
    if (prevProps.WorklogChangeModalIsOpen !== nextProps.WorklogChangeModalIsOpen) return false
    else return true
})
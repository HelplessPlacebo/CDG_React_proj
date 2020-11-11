import React, {SyntheticEvent, useState, useEffect, Dispatch, SetStateAction} from "react";
import MS from "./ModalWindow.module.css"
import TimeSlider from "./TimeSlider/TimeSlider";
import {
    TChangeFavoritesWorklog,
    TChangeWorklog,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange,
    TTimerData,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import {CalculateNewStartTime, ToFullTime} from "../../assets/secondary/CalculateTime";
import ClearIcon from '@material-ui/icons/Clear';
import {green} from '@material-ui/core/colors';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import IssuesSelectInput from "../Issues/IssuesSelectInput";
import CustomInput from "./CustomInput";
import {useInput} from "../hooks/useInput";

export type TModalWindowProps = {
    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog | null
    TimerData: TTimerData | undefined
    ChangeWorklog: TChangeWorklog
    WorklogToChange: TWorkLog | null
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
    SetWorklogToChange: TSetWorklogToChange
    ChangeFavoritesWorklog: TChangeFavoritesWorklog
    Issues: string[]
}
type TTimerValue = {
    start: string | null
    end: string | null
}

const ChangeWorklogModal: React.FC<TModalWindowProps> = (props) => {

    let ModalWorklogInput = useInput(props.WorklogToChange && props.WorklogToChange.TaskField ? props.WorklogToChange.TaskField : "")
    let ModalIssueInput = useInput(props.WorklogToChange && props.WorklogToChange.Issue ? props.WorklogToChange.Issue : "")

    let [ModalTimeLineValues, SetModalTimeLineValues] = useState<TTimerValue>()
    let [NewWorklogNameIsFilled, SetNewWorklogNameIsFilled] = useState<boolean>(false)
    let [NewIssueNameIsFilled, SetNewIssueNameIsFilled] = useState<boolean>(false)


    let EmptyWorklogTimerMinutes = props.TimerData?.TimerValue.substr(3, props.TimerData?.TimerValue.length - 6)
    let EmptyWorklogTimerEndHours = props.TimerData?.TimerValue.substr(0, props.TimerData?.TimerValue.length - 6)
    let date = new Date()
    let CurrentTime = ToFullTime(date.getHours()) + ":" + ToFullTime(date.getMinutes())
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
                props.ChangeWorklog(props[Obj].id, NewWL)
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
            props.closeWorklogChangeModal();
        }
        props.SetTimerData(undefined)
        props.SetWorklogToChange(undefined)
        props.SetIsPlayingWorklogById(false)
        ModalWorklogInput.clear()
        ModalIssueInput.clear()
    }


    if (!props.WorklogChangeModalIsOpen) return null;

    return (
        <div className="timer-modal">
            <div className={MS.modal}>
                <div className={MS.ModalTitle}>New worklog</div>
                <div className={MS.ModalSlider}>

                    {ModalTimeLineValues?.start && ModalTimeLineValues?.end &&
                    <TimeSlider value={ModalTimeLineValues}
                                disabled={false}
                                step={10}
                                SetTimerValue={SetModalTimeLineValues}
                    />
                    }


                </div>

                <form name="NewWorklogContent" action="">
                    <div className={MS.ModalTextFields}>
                        <div className={MS.NewWorklogContentContainer}>

                            <CustomInput {...ModalWorklogInput.bind}
                                         label={"Task Field"}
                                         placeholder={"Please, enter the task"}
                                         width={500}
                            />

                            {
                                NewWorklogNameIsFilled &&
                                <div id="new-issue-err" className={MS.ModalInputError}> Please, enter worklog name</div>
                            }
                            <div style={{marginTop : "20px"}} className="issue-select-input">
                                {
                                    //@ts-ignore
                                    <IssuesSelectInput Issues={props.Issues}
                                        {...ModalIssueInput.bind}
                                                       width={500}
                                    />
                                }

                            </div>

                            {
                                NewIssueNameIsFilled &&
                                <div id="new-issue-err" className={MS.ModalInputError}> Please, enter issue name</div>
                            }

                        </div>
                    </div>
                    <div className={MS.NewWorklogControlButtonsContainer}>
                        <div className={MS.NewWorklogControlButtons}>
                            <div onClick={OnModalSubmit} className="modal-open">
                                <CheckOutlinedIcon style={{color: green[500], cursor: "pointer"}} fontSize="large"/>
                            </div>
                            <div className={MS.CloseButtonMargin}>
                                <ClearIcon style={{cursor: "pointer"}} fontSize="large" onClick={close} color="action"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={MS.bg}/>
        </div>
    );
}

export default ChangeWorklogModal
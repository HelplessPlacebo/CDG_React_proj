import React, {SyntheticEvent, useState, useEffect, Dispatch, SetStateAction} from "react";
import MS from "./ModalWindow.module.css"
import ConfirmButton from "../../assets/imgs/confirmButton.svg"
import DeclineButton from "../../assets/imgs/declineButton.svg"
import TimeSlider from "./TimeSlider/TimeSlider";
import {
    TChangeWorklog,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange,
    TTimerData,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import {CalculateNewStartTime, ToFullTime} from "../../assets/secondary/CalculateTime";

export type TModalWindowProps = {
    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog
    TimerData: TTimerData | undefined
    ChangeWorklog: TChangeWorklog
    WorklogToChange: TWorkLog | undefined
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
    SetWorklogToChange: TSetWorklogToChange
}
type TTimerValue = {
    start: string | null
    end: string | null
}

const ChangeWorklogModal: React.FC<TModalWindowProps> = (props) => {

    let [ModalNewWorklogName, SetModalNewWorklogName] = useState("")
    let [ModalNewIssueName, SetModalNewIssueName] = useState("")
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
            props.TimerData.TimerTaskField && SetModalNewWorklogName(props.TimerData.TimerTaskField)
            props.TimerData.TimerIssue && SetModalNewIssueName(props.TimerData.TimerIssue)
            if (props.PlayingWorklog.StartTime && props.PlayingWorklog.EndTime) {
                SetModalTimeLineValues({
                    start: props.PlayingWorklog.StartTime,
                    end: props.PlayingWorklog.EndTime
                })
            } else SetModalTimeLineValues(EmptyWorklogTimeValues)
        } else if (props.WorklogToChange) {
            props.WorklogToChange.TaskField && SetModalNewWorklogName(props.WorklogToChange.TaskField)
            props.WorklogToChange.Issue && SetModalNewIssueName(props.WorklogToChange.Issue)
            SetModalTimeLineValues({
                start: props.WorklogToChange.StartTime,
                end: props.WorklogToChange.EndTime
            })
        }
    }, [props.TimerData?.TimerIssue, props.TimerData?.TimerTaskField, props.TimerData?.TimerValue,
        props.WorklogToChange?.EndTime, props.WorklogToChange?.StartTime,
        props.WorklogToChange?.Issue, props.WorklogToChange?.TaskField])

    const OnModalSubmit = (e: SyntheticEvent) => {
        {
            ModalNewWorklogName.length > 0
                ? SetNewWorklogNameIsFilled(false)
                : SetNewWorklogNameIsFilled(true)
        }
        {
            ModalNewIssueName.length > 0
                ? SetNewIssueNameIsFilled(false)
                : SetNewIssueNameIsFilled(true)
        }

        if (ModalNewWorklogName && ModalNewWorklogName.length > 0
            && ModalNewIssueName
            && ModalNewIssueName.length > 0
            && ModalTimeLineValues) {

            let Obj: string
            if (props.TimerData) Obj = "PlayingWorklog"; else Obj = "WorklogToChange"
            let NewWL = {
                //@ts-ignore
                ...props[Obj],
                StartTime: ModalTimeLineValues.start,
                EndTime: ModalTimeLineValues.end,
                TaskField: ModalNewWorklogName,
                Issue: ModalNewIssueName,
                //@ts-ignore
                status: props[Obj].status ? props[Obj].status : "warning",
                //@ts-ignore
                TimerValue: props.TimerData && props.TimerData.TimerValue ? props.TimerData.TimerValue
                    //@ts-ignore
                    : props[Obj].TimerValue ? props[Obj].TimerValue : "00:00:00"
            }

            //@ts-ignore
            if (props[Obj].ParentId) {
                //@ts-ignore
                props.ChangeWorklog(props[Obj].id, props[Obj].ParentId ,NewWL,  props[Obj].ParentId)
                //@ts-ignore
                props.SetIsPlayingWorklogById(false, props[Obj].id)
            } else {
                //@ts-ignore
                props.ChangeWorklog(props[Obj].id, undefined,NewWL)
                //@ts-ignore
                props.SetIsPlayingWorklogById(false, props[Obj].id)
            }
            SetModalNewWorklogName("")
            SetModalNewIssueName("")
            SetNewWorklogNameIsFilled(false)
            SetNewIssueNameIsFilled(false)
            close(e)
        }
    }

    const OnNewWorklogNameType = (e: React.FormEvent<HTMLInputElement>) => {
        SetModalNewWorklogName(e.currentTarget.value)
    }
    const OnNewIssueNameType = (e: React.FormEvent<HTMLInputElement>) => {
        SetModalNewIssueName(e.currentTarget.value)
    }


    const close = (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.closeWorklogChangeModal) {
            props.closeWorklogChangeModal();
        }
        props.SetTimerData(undefined)
        props.SetWorklogToChange(undefined)
        props.SetIsPlayingWorklogById(false)
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

                            <div className={MS.NewWorklogContentTitle}>Worklog name</div>

                            <div className={MS.marginCheck}>
                                <input
                                    onChange={OnNewWorklogNameType}
                                    value={ModalNewWorklogName}
                                    className={MS.NewWorklogContentInput}
                                    placeholder="Enter the worklog name"
                                    type="text"/>
                            </div>

                            {NewWorklogNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter worklog name</div>
                            }

                            <div style={{marginTop: "37px"}}>
                                <div className={MS.NewWorklogContentTitle}>Issue</div>
                                <div className={MS.marginCheck}>
                                    <input
                                        onChange={OnNewIssueNameType}
                                        value={ModalNewIssueName}
                                        className={MS.NewWorklogContentInput}
                                        placeholder="Enter the issue name"
                                        type="text"/>
                                </div>
                            </div>
                            {NewIssueNameIsFilled &&
                            <div id="new-issue-err" className={MS.ModalInputError}> Please, enter issue name</div>
                            }

                        </div>
                    </div>
                    <div className={MS.NewWorklogControlButtonsContainer}>
                        <div className={MS.NewWorklogControlButtons}>
                            <div onClick={OnModalSubmit} className="modal-open">
                                <img className={MS.NewWorklogSubmitButtonSize}
                                     src={ConfirmButton} alt={"submit"}/>
                            </div>
                            <div className="modal-close">
                                <img onClick={close} className={MS.NewWorklogControlButton}
                                     src={DeclineButton} alt={"decline"}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className={MS.bg} />
        </div>
    );
}

export default ChangeWorklogModal


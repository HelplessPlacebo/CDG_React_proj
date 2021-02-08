import React, {useState, useEffect} from 'react';
import TS from "./Timer.module.css"
import PlayButton from "@material-ui/icons/PlayCircleFilled"
import {ToFullTime} from "../../assets/secondary/CalculateTime"
import {CustomInput} from "../CustomElements/CustomInput/CustomInput";
import {IssuesSelectInput} from "../Issues/Inputs/IssuesSelectInput";
import {useInput} from "../hooks/useInput";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import {red} from "@material-ui/core/colors"
import {useBooleanState} from "../hooks/useBooleanState";
import {parseTimeStr} from "../../assets/secondary/ParseTimeStr";

export const Timer = (props) => {
    const parsedTimerData =  parseTimeStr(props.playingWorklog.TimerValue)
    const [seconds, setSeconds] = useState(parsedTimerData.seconds)
    const [minutes, setMinutes] = useState(parsedTimerData.minutes)
    const [hours, setHours] = useState(parsedTimerData.hours)
    const timerStatusData = useBooleanState(true)
    const worklogInput = useInput(props.playingWorklog.TaskField ? props.playingWorklog.TaskField : "")
    const issueInput = useInput(props.playingWorklog.Issue ? props.playingWorklog.Issue : "")

    const onStopTimer = () => {
        const timerData = {
            TimerValue: ToFullTime(hours) + ":" + ToFullTime(minutes) + ":" + ToFullTime(seconds),
            Issue: issueInput.value ? issueInput.value : props.playingWorklog?.Issue,
            TaskField: worklogInput.value ? worklogInput.value : props.playingWorklog?.TaskField,
        }
        props.openWorklogChangeModal()
        timerStatusData.Hide()
        props.setWorklogToChange({...props.playingWorklog,...timerData})

    }

    useEffect(() => {
        let interval = null;
        if (timerStatusData.isDisplayed) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                if (seconds > 59) {
                    setMinutes(minutes => minutes + 1)
                    setSeconds(0)
                }
                if (minutes > 59) {
                    setHours(hours => hours + 1)
                    setMinutes(0)
                }
                if (hours > 23) {
                    setHours(0)
                    clearInterval(interval);
                }
            }, 1000);
        } else if (timerStatusData.isDisplayed && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerStatusData.isDisplayed, hours,minutes,seconds]);

    return (

        <div className={TS.TimeRContainer}>
            <CustomInput {...worklogInput.bind}
                         label={"Task Field"}
                         placeholder={"Please, enter the task"}
                         width={250}
            />

            <div style={{marginTop: " 10px"}} className={"IssuesSelectinput"}>
                <IssuesSelectInput issues={props.issues}
                                   {...issueInput.bind}
                                   width={250}
                />
            </div>

            <div className={TS.Timer}>
                {ToFullTime(hours)}:{ToFullTime(minutes)}:{ToFullTime(seconds)}
            </div>

            <div className={TS.TimerControlButtonsContainer}>
                <div className={TS.TimerControlButtons}>
                    <div onClick={onStopTimer}>
                        <StopIcon style={{marginTop: "5px", width: "50px",
                            height: "50px", backgroundColor: red[400], borderRadius: "100%", color: red[50]
                        }}/>
                    </div>
                    <div style={{paddingLeft: "5px"}} className="controlButtons" onClick={timerStatusData.Switch}>
                        {timerStatusData.isDisplayed ?
                            <PauseCircleFilledIcon style={{width: "60px", height: "60px"}} color={"primary"}/>
                            : <PlayButton style={{width: "60px", height: "60px"}} color={"primary"}/>
                        }
                    </div>
                </div>
            </div>
        </div>)
}
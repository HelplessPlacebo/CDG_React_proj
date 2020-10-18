import React, {useState, useEffect} from 'react';
import TS from "./Timer.module.css"
import TTStopButton from "../../assets/imgs/TT-stop-button.svg"
import TTPauseButton from "../../assets/imgs/TT-pause-button.svg"
import PlayButton from "@material-ui/icons/PlayCircleFilled"
import {ToFullTime} from "../../assets/secondary/CalculateTime"
import CustomInput from "../ChangeWorklogModal/CustomInput";
import IssuesSelectInput from "../Issues/IssuesSelectInput";


const Timer = (props) => {
    const [seconds, setSeconds] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(6, props.PlayingWorklog.TimerValue.length)))
    const [minutes, setMinutes] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(3, props.PlayingWorklog.TimerValue.length - 6)))
    const [hours, setHours] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(0, props.PlayingWorklog.TimerValue.length - 6)))
    const [isActive, setIsActive] = useState(false);
    const [WorklogInputValue, SetWorklogInputValue] = useState()
    const [IssueInputValue, SetIssueInputValue] = useState()

    const OnWorklogInputValueChange = (e) => {
        SetWorklogInputValue(e.target.value)
    }
    const OnIssueInputValueChange = (e) => {
        SetIssueInputValue(e.target.value)
    }


    const toggle = () => {
        setIsActive(!isActive);
    }
    const OnStopTimer = () => {
        props.openWorklogChangeModal()
        setIsActive(!isActive)
        let TimerData = {
            TimerValue: ToFullTime(hours) + ":" + ToFullTime(minutes) + ":" + ToFullTime(seconds),
            TimerIssue: IssueInputValue ? IssueInputValue : props.PlayingWorklog?.Issue,
            TimerTaskField: WorklogInputValue ? WorklogInputValue : props.PlayingWorklog?.TaskField,
        }
        props.SetTimerData(TimerData)
    }

    useEffect(() => {
        let interval = null;
        if (!isActive) {
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
        } else if (isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds, minutes, hours]);

    return (

        <div className={TS.TimeRContainer}>
            <CustomInput value={WorklogInputValue}
                         handleChange={OnWorklogInputValueChange}
                         label={"Task Field"}
                         placeholder={"Please, enter the task"}
                         width={250}
            />
            <IssuesSelectInput Issues={props.Issues}
                               handleChange={OnIssueInputValueChange}
                               value={IssueInputValue}
                               width={250}
            />

            <div className={TS.Timer}>
                {ToFullTime(hours)}:{ToFullTime(minutes)}:{ToFullTime(seconds)}
            </div>

            <div className={TS.TimerControlButtonsContainer}>
                <div className={TS.TimerControlButtons}>
                    <div onClick={OnStopTimer}>
                        <img src={TTStopButton} alt=""/>
                    </div>
                    <div className="controlButtons" onClick={toggle}>
                        {!isActive ?
                            <img src={TTPauseButton} alt=""/>
                            : <PlayButton style={{width: "50px", height: "50px"}} color={"primary"}/>
                        }
                    </div>
                </div>
            </div>
        </div>)
}

export default Timer
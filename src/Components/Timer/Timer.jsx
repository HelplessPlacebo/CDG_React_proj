import React, {useState, useEffect} from 'react';
import TS from "./Timer.module.css"
import PlayButton from "@material-ui/icons/PlayCircleFilled"
import {ToFullTime} from "../../assets/secondary/CalculateTime"
import CustomInput from "../ChangeWorklogModal/CustomInput";
import IssuesSelectInput from "../Issues/IssuesSelectInput";
import {useInput} from "../hooks/useInput";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import {red} from "@material-ui/core/colors"

const Timer = (props) => {
    const [seconds, setSeconds] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(6, props.PlayingWorklog.TimerValue.length)))
    const [minutes, setMinutes] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(3, props.PlayingWorklog.TimerValue.length - 6)))
    const [hours, setHours] = useState(Number.parseInt(props.PlayingWorklog.TimerValue.substr(0, props.PlayingWorklog.TimerValue.length - 6)))
    const [isActive, setIsActive] = useState(false);
    const WorklogInput= useInput("")
    const IssueInput = useInput(props.Issues ? props.Issues : "")



    const toggle = () => {
        setIsActive(!isActive);
    }
    const OnStopTimer = () => {
        props.openWorklogChangeModal()
        setIsActive(!isActive)
        let TimerData = {
            TimerValue: ToFullTime(hours) + ":" + ToFullTime(minutes) + ":" + ToFullTime(seconds),
            TimerIssue: IssueInput.value ? IssueInput.value : props.PlayingWorklog?.Issue,
            TimerTaskField: WorklogInput.value ? WorklogInput.value : props.PlayingWorklog?.TaskField,
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
            <CustomInput {...WorklogInput.bind}
                         label={"Task Field"}
                         placeholder={"Please, enter the task"}
                         width={250}
            />

            <div style={{marginTop : " 10px"}} className={"IssuesSelectinput"}>
                <IssuesSelectInput  Issues={props.Issues}
                                    {...IssueInput.bind}
                                    width={250}
                />
            </div>

            <div className={TS.Timer}>
                {ToFullTime(hours)}:{ToFullTime(minutes)}:{ToFullTime(seconds)}
            </div>

            <div className={TS.TimerControlButtonsContainer}>
                <div className={TS.TimerControlButtons}>
                    <div onClick={OnStopTimer}>
                        <StopIcon style={{marginTop : "5px", width: "50px",
                            height: "50px",backgroundColor : red[400],borderRadius : "100%",color : red[50]}} />
                    </div>
                    <div style={{paddingLeft : "5px"}} className="controlButtons" onClick={toggle}>
                        {!isActive ?
                            <PauseCircleFilledIcon style={{width: "60px", height: "60px"}} color={"primary"} />
                            : <PlayButton style={{width: "60px", height: "60px"}} color={"primary"}/>
                        }
                    </div>
                </div>
            </div>
        </div>)
}

export default Timer
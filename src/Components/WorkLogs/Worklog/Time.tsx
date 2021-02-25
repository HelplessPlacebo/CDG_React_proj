import React from "react"
import WLS from "../Worklog.module.css";
type TWorklogTimeProps = {
    timerValue : string | null
}
export const WorklogTime : React.FC<TWorklogTimeProps>=(props)=> <div className={WLS.TimerValueContainer}>
    <div className={WLS.TimerValue}>{props.timerValue}</div>
</div>
import React, {useState} from "react";
import GCS from "./GoogleCalendar.module.css"
import ActiveSmallCalendar from "../../assets/imgs/calendar_active.svg"
import SmallCalendar from "../../assets/imgs/calendar_gray.svg"
import CSCElement from "../CalendarSyncsElement/CSCElement";
//@ts-ignore
export type TCalendarProps = {}

const GoogleCalendar: React.FC<TCalendarProps> = (props) => {
    let [CalendarSyncs, SetCalendarSyncs] = useState([{
        Description: "Logo Redesign",
        SyncTime: "09:00 - 10:00",
        LineColor: "Cyan"
    }, {
        Description: "Meeting with CEO",
        SyncTime: "14:00 - 14:15",
        LineColor: "Orange"
    }, {
        Description: "Brainstorm",
        SyncTime: "15:00 - 16:15",
        LineColor: "Purple"
    }])

    let [CalendarIsClicked, SetCalendarIsClicked] = useState(false)

    const OnCalendarClicked = () => {
        SetCalendarIsClicked(true)
    }
    const OnActiveCalendarClicked = () => {
        SetCalendarIsClicked(false)
    }

    let [IsChecked, SetIsChecked] = useState(false)

    const HandleChecked = (event: React.FormEvent<HTMLInputElement>) => {
        SetIsChecked(event.currentTarget.checked)
    }

    return (<div className={GCS.GCSContainer}>
        <div className={GCS.GCS}>
            <div className={GCS.GCSDescription}>
                Google calendar sync
            </div>
            <div className={GCS.GCSSwitchPose}>
                <input onClick={HandleChecked} id="GCS-toggle"
                       type="checkbox"/>
            </div>
            <div id="small-calendar" className={GCS.GCSCalendarPose}>
                {!CalendarIsClicked
                    ? <img onClick={OnCalendarClicked} src={SmallCalendar} alt="small-calendar"/>
                    : <img onClick={OnActiveCalendarClicked} src={ActiveSmallCalendar} alt={"active small calendar"}/>}
            </div>
        </div>
        {IsChecked ? <div className={GCS.CalendarSyncsContainer}>
            {CalendarSyncs.map(el => {
                return <CSCElement key={el.SyncTime} Description={el.Description}
                                   SyncTime={el.SyncTime}
                                   LineColor={el.LineColor}/>
            })}
        </div> : undefined}

    </div>)
}

export default GoogleCalendar

import React from "react"
import AS from "../../../App.module.css"
import Calendar from "../Calendar"
import {ControlButtons} from "./ControlButtons/ControlButtons"
import {useSelector} from "react-redux"
import {getCurrentDate} from "../../../assets/utils/Selectors/CalendarSelectors";

export const CalendarAndControlButtons = () => {
    const currentDate = useSelector(getCurrentDate)
    return <div className={AS.CalendarAndButtons}>
        <Calendar currentDate={currentDate}/>
        <ControlButtons/>
    </div>
}
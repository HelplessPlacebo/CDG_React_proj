import React from "react";
import CS from "./Calendar.module.css"
import CalendarIcon from "../../assets/imgs/calendar.svg"
import {DropDownCalendarContainer} from "./DropDownCalendarContainer"
import {TCurrentDate} from "../../Redux/CalendarReducer"
import {useBooleanState} from "../hooks/useBooleanState"

export type TCalendarProps = { CurrentDate: TCurrentDate }

const Calendar: React.FC<TCalendarProps> = (props) => {
    const DropDownCalendarData = useBooleanState(false)

    return (<div className="Calendar">
        <div onClick={DropDownCalendarData.Show} id="calendar-id" className={CS.CalendarContainer}>

            <div className={CS.CalendarContent}>

                <div className={CS.CalendarDate}>
                    {props.CurrentDate.CurrentDay} {props.CurrentDate.CurrentMonth} {props.CurrentDate.CurrentYear}
                </div>

                <div className={CS.CalendarIcon}>
                    <img src={CalendarIcon} alt="calendar icon"/>
                </div>

            </div>
        </div>

        {
            DropDownCalendarData.isDisplayed &&
            <>
                <div className={CS.bg} onClick={DropDownCalendarData.Hide}/>
                <DropDownCalendarContainer/>
            </>
        }

    </div>)
}

export default React.memo(Calendar, (prevProps, nextProps) => {
    if (prevProps.CurrentDate !== nextProps.CurrentDate) return false
    else return true
})
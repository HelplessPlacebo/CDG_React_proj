import React from "react";
import {
    TCalendars, TClickedDay,
    TCurrentDate,
    TSetClickedMonthDay,
} from "../../Data/CalendarReducer";
import CS from "./Calendar.module.css"
import CalendarDay from "./CalendarDay";
import {randomInteger} from "../../Data/WorkLogsReducer";
import DropDownCalendarFooterElement from "./DropDownCalendarFooterElement";

export type TDropDownCalendarProps = {
    Calendars: TCalendars
    ClickedMonthDay: TClickedDay
    SetClickedMonthDay: TSetClickedMonthDay
    CurrentDate: TCurrentDate
}

const DropDownCalendar: React.FC<TDropDownCalendarProps> = (props) => {
    let DaysNamesArr = ["S", "M", "T", "W", "T", "F", "S"]


    return (<div className={CS.DropDownCalendar}>
        <div className={CS.DropDownCalendarHeader}>
            {props.CurrentDate.CurrentMonth}
        </div>
        <div className={CS.DropDOwnCalendarContentContainer}>
            <div className={CS.DropDownCalendarContent}>
                {DaysNamesArr.map(el => {
                    return <div key={randomInteger(0, 10000)} className={CS.DropDownCalendarDayNames}>
                        {el}
                    </div>
                })}
                {props.Calendars[props.CurrentDate.CurrentMonth].map(day => {
                    return <CalendarDay ClickedMonthDay={props.ClickedMonthDay}
                                        CurrentDay={props.CurrentDate.CurrentDay}
                                        MonthName={props.CurrentDate.CurrentMonth}
                                        key={day.id}
                                        SetClickedMonthDay={props.SetClickedMonthDay}  {...day}/>
                })}

            </div>
        </div>
        <div className={CS.DropDownCalendarFooterContainer}>

            <div className={CS.DropDownCalendarFooter}>
                <DropDownCalendarFooterElement status={"ok"} text={"Done"}/>
                <DropDownCalendarFooterElement status={"warning"} text={"In progress"}/>
                <DropDownCalendarFooterElement status={"danger"} text={"Missed"}/>
            </div>
        </div>
    </div>)
}


export default DropDownCalendar
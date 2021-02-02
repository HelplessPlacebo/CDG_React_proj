import React from "react";
import {SetClickedMonthDay, TClickedDay,} from "../../Redux/CalendarReducer";
import CS from "./Calendar.module.css"
import {CalendarDay} from "./CalendarDay";
import {randomInteger} from "../../Redux/WorkLogsReducer";
import {DropDownCalendarFooterElement} from "./DropDownCalendarFooterElement";
import {useDispatch, useSelector} from "react-redux";
import {getCalendar, getClickedMonthDay, getCurrentDate} from "../Selectors/CalendarSelectors";
import {getWorklogsBlocks} from "../Selectors/WorklogsSelectors";


export const DropDownCalendar = () => {
    const dispatch = useDispatch()
    const calendar = useSelector(getCalendar)
    const clickedMonthDay = useSelector(getClickedMonthDay)
    const currentDate = useSelector(getCurrentDate)
    const worklogsBlocks = useSelector(getWorklogsBlocks)
    const setClickedMonthDay = (Day: TClickedDay) => dispatch(SetClickedMonthDay(Day))
    const DaysNamesArr = ["S", "M", "T", "W", "T", "F", "S"]

    return (<div className={CS.DropDownCalendar}>
        <div className={CS.DropDownCalendarHeader}>
            {currentDate.CurrentMonth}
        </div>
        <div className={CS.DropDOwnCalendarContentContainer}>
            <div className={CS.DropDownCalendarContent}>

                {DaysNamesArr.map(el => {
                    return <div key={randomInteger(0, 10000)} className={CS.DropDownCalendarDayNames}>
                        {el}
                    </div>
                })}

                {
                    calendar[currentDate.CurrentMonth].map(day => {
                        return <CalendarDay ClickedMonthDay={clickedMonthDay}
                                            CurrentDay={currentDate.CurrentDay}
                                            MonthName={currentDate.CurrentMonth}
                                            key={day.id}
                                            SetClickedMonthDay={setClickedMonthDay}
                                            {...day}
                                            WorklogsBlocks={worklogsBlocks}
                        />
                    })}

            </div>
        </div>
        <div className={CS.DropDownCalendarFooterContainer}>

            <div className={CS.DropDownCalendarFooter}>
                <DropDownCalendarFooterElement status={"ok"} text={"Done"}/>
                <DropDownCalendarFooterElement status={"warning"} text={"In progress"}/>
                <DropDownCalendarFooterElement status={"danger"} text={"Missed"}/>
                <DropDownCalendarFooterElement status={"empty"} text={"no activity"}/>
            </div>
        </div>
    </div>)
}

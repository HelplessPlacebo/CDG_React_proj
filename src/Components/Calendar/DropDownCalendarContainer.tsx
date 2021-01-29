import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {SetClickedMonthDay, TClickedDay,} from "../../Redux/CalendarReducer";
import {DropDownCalendar} from "./DropDownCalendar";
import {getCalendar, getClickedMonthDay, getCurrentDate} from "../Selectors/CalendarSelectors";
import {getWorklogsBlocks} from "../Selectors/WorklogsSelectors";

export const DropDownCalendarContainer = () => {
    const dispatch = useDispatch()
    const calendar = useSelector(getCalendar)
    const clickedMonthDay = useSelector(getClickedMonthDay)
    const currentDate = useSelector(getCurrentDate)
    const worklogsBlocks = useSelector(getWorklogsBlocks)
    const setClickedMonthDay = (Day: TClickedDay) => dispatch(SetClickedMonthDay(Day))

    return <DropDownCalendar WorklogsBlocks={worklogsBlocks} CurrentDate={currentDate} Calendar={calendar}
                             ClickedMonthDay={clickedMonthDay} SetClickedMonthDay={setClickedMonthDay}/>
}

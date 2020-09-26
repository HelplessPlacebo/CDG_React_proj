import React, {useState} from "react";
import CDS from "./Calendar.module.css"
import Danger from "../../assets/imgs/CalendarDayStatusDanger.svg"
import Warn from "../../assets/imgs/CalendarDayStatusWarning.svg"
import OK from "../../assets/imgs/CalendarDayStatusOK.svg"
import {TClickedDay, TSetClickedMonthDay} from "../../Data/CalendarReducer";
import {SearchWorklogBlock} from "../../Data/WorkLogsReducer";


export type TCalendarDayProps = {
    DayNumber: number
    DayStatus: string
    Signature: string
    id: number
    SetClickedMonthDay: TSetClickedMonthDay
    MonthName: string
    ClickedMonthDay: TClickedDay
    CurrentDay: number | string
}

const CalendarDay: React.FC<TCalendarDayProps> = (props) => {
    let [DayIsClicked, SetDayIsClicked] = useState(false)
    let WrappedDay = {
        id : props.id,
        DayNumber : props.DayNumber,
        MonthName : props.MonthName
    }

    const onDayClick = () => {
        let WorklogsBlockToBeScroled = SearchWorklogBlock(WrappedDay.MonthName,WrappedDay.DayNumber)
        SetDayIsClicked(!DayIsClicked)
        props.SetClickedMonthDay(WrappedDay)
        if(WorklogsBlockToBeScroled) WorklogsBlockToBeScroled.scrollIntoView({block :"center",inline : "center", behavior : "smooth" })
    }

    return (<div className={props.ClickedMonthDay?.id === props.id
        ? CDS.DayBgClicked
        : props.DayNumber === props.CurrentDay
            ? CDS.DayBgCurrentDay
            : CDS.DayBgDefault}>
        <div onClick={onDayClick}
             className={props.Signature !== "main"
                 ? CDS.DropDownCalendarDayFaded : CDS.DropDownCalendarDay}>
            <div className={props.ClickedMonthDay?.id === props.id
            || props.DayNumber === props.CurrentDay
                ? CDS.DropDownCalendarDayNumberClicked
                : CDS.DropDownCalendarDayNumber}>
                {props.DayNumber}
            </div>
            <img style={{paddingLeft: "3px"}} src={props.DayStatus === "ok"
                ? OK
                : props.DayStatus === "warning"
                    ? Warn
                    : props.DayStatus === "danger"
                        ? Danger
                        : undefined
            } alt="day status"/>
        </div>
    </div>)
}

export default CalendarDay
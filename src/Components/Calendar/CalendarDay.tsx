import React, {useState} from "react";
import CDS from "./Calendar.module.css"
import Danger from "../../assets/imgs/CalendarDayStatusDanger.svg"
import Warn from "../../assets/imgs/CalendarDayStatusWarning.svg"
import OK from "../../assets/imgs/CalendarDayStatusOK.svg"
import {TClickedDay, TSetClickedMonthDay} from "../../Data/CalendarReducer";
import {randomInteger, SearchWorklogBlock, TWorklogBlock} from "../../Data/WorkLogsReducer";
import WorkLogsBlock from "../WorkLogs/WorkLogsBlock";


export type TCalendarDayProps = {
    DayNumber: number
    DayStatus: string
    Signature: string
    id: number
    SetClickedMonthDay: TSetClickedMonthDay
    MonthName: string
    ClickedMonthDay: TClickedDay
    CurrentDay: number | string
    WorklogsBlocks: Array<TWorklogBlock>
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

    return (
        <div className={props.ClickedMonthDay?.id === props.id
        ? CDS.DayBgClicked
        : props.DayNumber === props.CurrentDay
            ? props.Signature === "main" ? CDS.DayBgCurrentDay : undefined
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
            {   props.WorklogsBlocks.some(WBL=> WBL.BlockInfo.BlockCreatedDate.split(",")[1] ===`${props.MonthName} ${props.DayNumber}`)
                ? props.WorklogsBlocks.map(WBL=>{
                if(WBL.BlockInfo.BlockCreatedDate.split(",")[1] === `${props.MonthName} ${props.DayNumber}` ) {
                    return <img key={randomInteger(0,10000)}
                                style={{paddingLeft: "3px"}}
                                src={WBL.BlockInfo.SummaryStatus === "ok"
                            ? OK
                            : WBL.BlockInfo.SummaryStatus  === "warning"
                                ? Warn
                                : WBL.BlockInfo.SummaryStatus === "danger"
                                    ? Danger
                                    : undefined
                    } alt="day status"/>
                }
            })
                : <div className={CDS.EmptyStatus}> </div>
            }

        </div>
    </div>)
}

export default CalendarDay
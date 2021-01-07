import React, {useState} from "react";
import CS from "./Calendar.module.css"
import CalendarIcon from "../../assets/imgs/calendar.svg"
import DropDownCalendarContainer from "./DropDownCalendarContainer";
import {TCurrentDate} from "../../Data/CalendarReducer";

export type TCalendarProps = { CurrentDate: TCurrentDate}

const Calendar: React.FC<TCalendarProps> = (props) => {
    let [ShowDropDownCalendar, SetShowDropDownCalendar] = useState(false)

    const onShowDropDownCalendar = () => SetShowDropDownCalendar(true)
    const onHideDropDownCalendar = () => SetShowDropDownCalendar(false)

    return (<div className="Calendar">
        <div onClick={onShowDropDownCalendar} id="calendar-id" className={CS.CalendarContainer}>

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
            ShowDropDownCalendar &&
            <>
                <div className={CS.bg} onClick={onHideDropDownCalendar}/>

                <DropDownCalendarContainer/>
            </>
        }

    </div>)
}

export default React.memo(Calendar,(prevProps,nextProps)=>{
    if(prevProps.CurrentDate !== nextProps.CurrentDate) return false
    else return true
})
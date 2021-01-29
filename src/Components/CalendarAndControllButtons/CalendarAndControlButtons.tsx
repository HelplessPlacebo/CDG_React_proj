import React from "react"
import AS from "../../App.module.css"
import Calendar from "../Calendar/Calendar"
import {ControlButtons} from "./ControlButtons/ControlButtons"
import {useSelector} from "react-redux"
import {getCurrentDate} from "../Selectors/CalendarSelectors";

export type TCalendarAndControlButtonsProps = {
    FavoritesIsClicked: boolean
    OnFavoritesClick: () => void
    OnAllClicked: () => void
}

export const CalendarAndControlButtons: React.FC<TCalendarAndControlButtonsProps> = (props) => {
    const currentDate = useSelector(getCurrentDate)
    return <div className={AS.CalendarAndButtons}>
        <Calendar CurrentDate={currentDate}/>
        <ControlButtons FavoritesIsClicked={props.FavoritesIsClicked} OnAllClicked={props.OnAllClicked}
                        OnFavoritesClick={props.OnFavoritesClick}/>
    </div>
}
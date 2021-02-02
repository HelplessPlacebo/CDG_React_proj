import React from "react"
import AS from "../../App.module.css"
import Calendar from "../Calendar/Calendar"
import {ControlButtons} from "./ControlButtons/ControlButtons"
import {useSelector} from "react-redux"
import {getCurrentDate} from "../Selectors/CalendarSelectors";

export type TCalendarAndControlButtonsProps = {
    favoritesIsClicked: boolean
    onFavoritesClick: () => void
    onAllClicked: () => void
}

export const CalendarAndControlButtons: React.FC<TCalendarAndControlButtonsProps> = (props) => {
    const currentDate = useSelector(getCurrentDate)
    return <div className={AS.CalendarAndButtons}>
        <Calendar currentDate={currentDate}/>
        <ControlButtons favoritesIsClicked={props.favoritesIsClicked} onAllClicked={props.onAllClicked}
                        onFavoritesClick={props.onFavoritesClick}/>
    </div>
}
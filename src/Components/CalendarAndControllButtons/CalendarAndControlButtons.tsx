import React from "react";
import AS from "../../App.module.css";
import Calendar from "../Calendar/Calendar";
import All from "../All/All";
import FavoritesButton from "../Favorites/FavoritesButton";
import {TCurrentDate} from "../../Data/CalendarReducer";


export type TCalendarAndControlButtonsProps = {
    CurrentDate: TCurrentDate
    FavoritesIsClicked: boolean
    OnFavoritesClick: () => void
    OnAllClicked: () => void

}

const CalendarAndControlButtons: React.FC<TCalendarAndControlButtonsProps> = (props) => {

    return (<div className={AS.CalendarAndButtons}>
        <Calendar CurrentDate={props.CurrentDate}/>
        <All FavoritesIsClicked={props.FavoritesIsClicked} OnAllClicked={props.OnAllClicked}/>
        <FavoritesButton OnFavoritesClick={props.OnFavoritesClick}
                         FavoritesIsClicked={props.FavoritesIsClicked}/>
    </div>)
}

export default CalendarAndControlButtons
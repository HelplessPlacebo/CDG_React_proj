import React from "react"
import {AllButton} from "./All/AllButton";
import {FavoritesButton} from "./Favorites/FavoritesButton";
import CBS from "./ControlButtons.module.css"

type TControlButtonsProps = {
    FavoritesIsClicked: boolean
    OnAllClicked: () => void
    OnFavoritesClick: () => void
}
export const ControlButtons: React.FC<TControlButtonsProps> = (props) => {
    return <div className={CBS.container}>
        <AllButton FavoritesIsClicked={props.FavoritesIsClicked} OnAllClicked={props.OnAllClicked}/>

        <FavoritesButton OnFavoritesClick={props.OnFavoritesClick}
                         FavoritesIsClicked={props.FavoritesIsClicked}/>
    </div>
}

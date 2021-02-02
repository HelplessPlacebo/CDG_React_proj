import React from "react"
import {AllButton} from "./All/AllButton";
import {FavoritesButton} from "./Favorites/FavoritesButton";
import CBS from "./ControlButtons.module.css"

type TControlButtonsProps = {
    favoritesIsClicked: boolean
    onAllClicked: () => void
    onFavoritesClick: () => void
}
export const ControlButtons: React.FC<TControlButtonsProps> = (props) => {
    return <div className={CBS.container}>
        <AllButton favoritesIsClicked={props.favoritesIsClicked} onAllClicked={props.onAllClicked}/>

        <FavoritesButton onFavoritesClick={props.onFavoritesClick}
                         favoritesIsClicked={props.favoritesIsClicked}/>
    </div>
}

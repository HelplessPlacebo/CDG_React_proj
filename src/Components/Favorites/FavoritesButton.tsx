import React from "react";
import FS from "./Favorites.module.css"
import {NavLink} from "react-router-dom";
import {TAddToFavorite} from "../../Data/WorkLogsReducer";

export type TFavoritesProps = {
    FavoritesIsClicked: boolean
    OnFavoritesClick: () => void

}

const FavoritesButton: React.FC<TFavoritesProps> = (props) => {
    return (
        <div
             className={props.FavoritesIsClicked
            ? FS.FavoritesButtonBgActive
            : FS.FavoritesButtonBg}>

            <div className={!props.FavoritesIsClicked
                ? FS.item
                : FS.ActiveItem}>

                <NavLink onClick={props.OnFavoritesClick} to={"/Home/Favorites"}> Favorites </NavLink>
            </div>
        </div>
    )
}

export default FavoritesButton
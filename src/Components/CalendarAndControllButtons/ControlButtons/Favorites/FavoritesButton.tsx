import React from "react";
import FS from "./Favorites.module.css"
import {NavLink} from "react-router-dom";
import { pink } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

export type TFavoritesProps = {
    favoritesIsClicked: boolean
    onFavoritesClick: () => void
}

export const FavoritesButton: React.FC<TFavoritesProps> = (props) => {
    return (
        <div
             className={props.favoritesIsClicked
            ? FS.FavoritesButtonBgActive
            : FS.FavoritesButtonBg} >

            <div className={!props.favoritesIsClicked
                ? FS.item
                : FS.ActiveItem}>
                <div className={FS.FavoritesTextContainer}>

                    <div>
                        <NavLink onClick={props.onFavoritesClick}  to={"/Home/Favorites"}> Favorites </NavLink>
                    </div>

                    <div style={{paddingLeft:".5rem"}}>
                        <FavoriteIcon fontSize="small" style={{color : pink[500]}} />
                    </div>

                </div>
            </div>
        </div>
    )
}

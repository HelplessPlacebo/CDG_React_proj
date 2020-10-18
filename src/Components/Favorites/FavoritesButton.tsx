import React from "react";
import FS from "./Favorites.module.css"
import {NavLink} from "react-router-dom";
import { pink } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

export type TFavoritesProps = {
    FavoritesIsClicked: boolean
    OnFavoritesClick: () => void

}

const FavoritesButton: React.FC<TFavoritesProps> = (props) => {
    return (
        <div
             className={props.FavoritesIsClicked
            ? FS.FavoritesButtonBgActive
            : FS.FavoritesButtonBg} >

            <div className={!props.FavoritesIsClicked
                ? FS.item
                : FS.ActiveItem}>
                <div className={FS.FavoritesTextContainer}>
                    <div>
                        <NavLink onClick={props.OnFavoritesClick}  to={"/Home/Favorites"}> Favorites </NavLink>
                    </div>
                    <div>
                        <FavoriteIcon fontSize="small" style={{color : pink[500]}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoritesButton
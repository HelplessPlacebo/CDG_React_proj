import React from "react";
import FS from "./Favorites.module.css"
import {NavLink} from "react-router-dom";
import {pink} from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import {TWorklogsTypeControlButtons} from "../../../../../globalTypes/Types"

export const FavoritesButton: React.FC<TWorklogsTypeControlButtons> = (props) => {
    return <div className={props.worklogsType === "Favorites" ? FS.FavoritesButtonBgActive : FS.FavoritesButtonBg}>
        <div className={props.worklogsType === "Favorites" ? FS.ActiveItem : FS.item}>
            <div className={FS.FavoritesTextContainer}>
                <NavLink to="/Home/Favorites"> Favorites </NavLink>
                <div style={{paddingLeft: ".5rem"}}>
                    <FavoriteIcon fontSize="small" style={{color: pink[500]}}/>
                </div>
            </div>
        </div>
    </div>
}

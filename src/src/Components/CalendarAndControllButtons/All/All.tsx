import React from "react";
import AllS from "./All.module.css"

import {NavLink} from "react-router-dom";

export type TAllProps = {
    FavoritesIsClicked: boolean
    OnAllClicked: () => void
}

const All: React.FC<TAllProps> = (props) => {
    return (
        <div className={props.FavoritesIsClicked
            ? AllS.AllButtonBg
            : AllS.AllButtonBgActive}>

            <div  className={props.FavoritesIsClicked
                ? AllS.item
                : AllS.ActiveItem}>

                <NavLink onClick={props.OnAllClicked}   to={"/Home/All"}> All </NavLink>
            </div>
        </div>
    )
}

export default All
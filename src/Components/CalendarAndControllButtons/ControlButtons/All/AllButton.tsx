import React from "react";
import AllS from "./All.module.css"

import {NavLink} from "react-router-dom";

export type TAllProps = {
    favoritesIsClicked: boolean
    onAllClicked: () => void
}

export const AllButton: React.FC<TAllProps> = (props) => {
    return (
        <div className={props.favoritesIsClicked
            ? AllS.AllButtonBg
            : AllS.AllButtonBgActive}>

            <div  className={props.favoritesIsClicked
                ? AllS.item
                : AllS.ActiveItem}>
                <NavLink onClick={props.onAllClicked}   to={"/Home/All"}> All </NavLink>
            </div>
        </div>
    )
}
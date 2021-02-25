import React from "react";
import AllS from "./All.module.css"
import {NavLink} from "react-router-dom"
import {TWorklogsTypeControlButtons} from "../../../../../globalTypes/Types"

export const AllButton: React.FC<TWorklogsTypeControlButtons> = (props) => {
    return (
        <div className={props.worklogsType === "All" ? AllS.AllButtonBgActive : AllS.AllButtonBg}>
            <div className={props.worklogsType === "All" ?AllS.ActiveItem : AllS.item }>
                <NavLink to="/Home/All"> All </NavLink>
            </div>
        </div>
    )
}
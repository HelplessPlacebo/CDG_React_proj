import React from "react"
import {AllButton} from "./All/AllButton";
import {FavoritesButton} from "./Favorites/FavoritesButton";
import CBS from "./ControlButtons.module.css"
import {useParams} from "react-router-dom";

export const ControlButtons = () => {
    const {worklogsType} = useParams()
    return <div className={CBS.container}>
        <AllButton  worklogsType={worklogsType}/>
        <FavoritesButton worklogsType={worklogsType}/>
    </div>
}

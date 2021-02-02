import React, {Dispatch} from "react";
import WLDD from "./WorklogDropDown.module.css"
import {
    CurrentDate, randomInteger, TAddToFavorite,
    TAddWorklog, TBlockInfo, TWorkLog
} from "../../../Redux/WorkLogsReducer";
import {TShowSnackBar} from "../../../App";
import {TComponentToDraw} from "../../../globalTypes/Types";

export type TWorklogDropDownProps = {
    showDeleteModal: () => void
    setWorklogToDelete: Dispatch<any>
    addToFavorite: TAddToFavorite
    playingWorklog: TWorkLog | null
    componentToDraw: TComponentToDraw
    addWorklog: TAddWorklog
    blockInfo?: TBlockInfo
    showSnackBar: TShowSnackBar
    onHideMenu: () => void
    worklogInfo: TWorkLog
    nestingIsShowing: boolean
    parentId : number | undefined
}
export const WorkLogDropDown: React.FC<TWorklogDropDownProps> = (props) => {

    const OnDeleteModalOpenContainer = () => {
        if ((props.componentToDraw === "FavoritesWorklogs" && !props.playingWorklog)
            || (props.blockInfo?.BlockCreatedDate === CurrentDate && !props.playingWorklog)) {
            props.setWorklogToDelete({...props.worklogInfo,ParentId : props.parentId})
            props.showDeleteModal()
        }
    }
    const OnAddToFavorites = () => {
        if (!props.playingWorklog?.id && props.componentToDraw === "Worklogs") {
            if (props.parentId) props.addToFavorite(props.worklogInfo.id)
            else props.addToFavorite(props.worklogInfo.id)
            props.showSnackBar({
                message: "worklog added to favorites", position: {horizontal: "center", vertical: "top"},
                severity: "success"
            })
        }

    }

    const OnDuplicateWorklog = () => {
        if (!props.playingWorklog?.id && props.componentToDraw === "Worklogs") {
            let CurrentWorklog: TWorkLog = {
                ...props.worklogInfo,
                TimerValue: "00:00:00",
                id: randomInteger(0, 10000),
            }
            props.addWorklog(CurrentWorklog)
        }
    }


    return (<div onMouseLeave={props.onHideMenu} className={WLDD.Container}>
        <div onClick={props.onHideMenu} className={WLDD.ContentContainer}>

            <div onClick={OnDuplicateWorklog} className={WLDD.ContainerEl}>
                Duplicate
            </div>

            <div onClick={OnAddToFavorites} className={WLDD.ContainerEl}>
                Add to Favorite
            </div>

            <div onClick={OnDeleteModalOpenContainer} className={WLDD.ContainerEl}>
                Delete
            </div>

        </div>

    </div>)
}

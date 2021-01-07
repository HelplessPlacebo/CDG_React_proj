import React, {Dispatch} from "react";
import WLDD from "./WorklogDropDown.module.css"
import {
    CurrentDate,
    randomInteger,
    TAddToFavorite,
    TAddWorklog,
    TBlockInfo,
    TNestingItem,
    TWorkLog
} from "../../../Data/WorkLogsReducer";
import {TComponentToDraw} from "../WorkLogsContainer";
import {TShowSnackBar} from "../../../App";

export type TWorklogDropDownProps = {
    OnDeleteModalOpen: (e: React.MouseEvent<HTMLElement>) => void
    SetDeleteModalParams: Dispatch<any>
    ParentId?: number
    AddToFavorite: TAddToFavorite
    PlayingWorklog: TWorkLog | null
    ComponentToDraw: TComponentToDraw
    AddWorklog: TAddWorklog
    BlockInfo?: TBlockInfo
    ShowSnackBar: TShowSnackBar

    onHideMenu: () => void
    WorklogInfo : TWorkLog
    NestingIsShowing : boolean
}
const WorkLogDropDown: React.FC<TWorklogDropDownProps> = (props) => {

    const OnDeleteModalOpenContainer = (e: React.MouseEvent<HTMLElement>) => {
        if ((props.ComponentToDraw === "FavoritesWorklogs" && !props.PlayingWorklog)
            || (props.BlockInfo?.BlockCreatedDate === CurrentDate && !props.PlayingWorklog)) {
            props.SetDeleteModalParams({
                WorkLogToDeleteId: props.WorklogInfo.id,
                ParentId: props.ParentId
            })

            props.OnDeleteModalOpen(e)
        }
    }
    const OnAddToFavorites = () => {
        if (!props.PlayingWorklog?.id && props.ComponentToDraw === "Worklogs") {
            if (props.ParentId) props.AddToFavorite(props.WorklogInfo.id)
            else props.AddToFavorite(props.WorklogInfo.id)
            props.ShowSnackBar({
                message: "worklog added to favorites", position: {horizontal: "center", vertical: "top"},
                severity: "success"
            })
        }

    }

    const OnDuplicateWorklog = () => {
        if (!props.PlayingWorklog?.id && props.ComponentToDraw === "Worklogs") {
            let CurrentWorklog: TWorkLog = {
                ...props.WorklogInfo,
                TimerValue: "00:00:00",
                id: randomInteger(0, 10000),
            }
            props.AddWorklog(CurrentWorklog)
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
export default WorkLogDropDown
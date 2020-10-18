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

export type TWorklogDropDownProps = {
    onHideMenu : ()=> void
    OnDeleteModalOpen : (e : React.MouseEvent<HTMLElement>)=> void
    SetDeleteModalParams : Dispatch<any>
    ParentId ? : number
    PlayingWorklog: TWorkLog | null
    AddToFavorite : TAddToFavorite
    WorklogId : number
    ComponentToDraw : TComponentToDraw
    AddWorklog : TAddWorklog
    StartTime: string | null
    EndTime: string | null
    TaskField: string | null
    TimerValue: string | null
    Issue?: string | null
    NestingItems?: Array<TNestingItem> | null
    status: "ok" | "warning" | "danger" | string
    NestingIsShowing: boolean
    BlockInfo?: TBlockInfo
}

const WorkLogDropDown: React.FC<TWorklogDropDownProps> = (props) => {

    const OnDeleteModalOpenContainer = (e : React.MouseEvent<HTMLElement>)=>{
        if((props.ComponentToDraw === "FavoritesWorklogs" && !props.PlayingWorklog )
            || (props.BlockInfo?.BlockCreatedDate === CurrentDate && !props.PlayingWorklog)){
            props.SetDeleteModalParams({
                WorkLogToDeleteId : props.WorklogId,
                ParentId : props.ParentId
            })

            props.OnDeleteModalOpen(e)
        }
    }
    const OnAddToFavorites = () =>{
        if(!props.PlayingWorklog?.id && props.ComponentToDraw === "Worklogs"){
            if(props.ParentId)  props.AddToFavorite(props.WorklogId)
            else props.AddToFavorite(props.WorklogId)
        }

    }

    const OnDuplicateWorklog = () =>{
   if(!props.PlayingWorklog?.id && props.ComponentToDraw === "Worklogs" ) {
            let CurrentWorklog : TWorkLog = {
                id: randomInteger(0, 10000),
                TaskField: props.TaskField,
                Issue: props.Issue,
                StartTime: props.StartTime,
                EndTime: props.EndTime,
                NestingItems: props.NestingItems,
                status: props.status,
                TimerValue: "00:00:00",
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
import React, {Dispatch} from "react";
import WLDD from "./WorklogDropDown.module.css"
import {randomInteger, TAddToFavorite, TAddWorklog, TNestingItem, TWorkLog} from "../../../Data/WorkLogsReducer";
import {TComponentToDraw} from "../WorkLogsContainer";

export type TWorklogDropDownProps = {
    onHideMenu : ()=> void
    OnDeleteModalOpen : (e : React.MouseEvent<HTMLElement>)=> void
    SetDeleteModalParams : Dispatch<any>
    ParentId ? : number
    PlayingWorklog: TWorkLog
    AddToFavorite : TAddToFavorite
    WorklogId : number
    FavoritesWorklogs : Array<TWorkLog>
    ComponentToDraw : TComponentToDraw
    AddWorklog : TAddWorklog
    StartTime: string | null
    EndTime: string | null
    JiraCode: string | null
    TaskField: string | null
    TimerValue: string | null
    IsNesting?: boolean
    Issue?: string
    NestingItems?: Array<TNestingItem>
    status: "ok" | "warning" | "danger" | string
    NestingIsShowing: boolean
}

const WorkLogDropDown: React.FC<TWorklogDropDownProps> = (props) => {

    const OnDeleteModalOpenContainer = (e : React.MouseEvent<HTMLElement>)=>{
        if(!props.PlayingWorklog.id && props.ComponentToDraw === "Worklogs"){
            props.SetDeleteModalParams({
                WorkLogToDeleteId : props.WorklogId,
                ParentId : props.ParentId
            })

            props.OnDeleteModalOpen(e)
        }
    }
    const OnAddToFavorites = () =>{
        if(!props.PlayingWorklog.id && props.ComponentToDraw === "Worklogs"
            && props.FavoritesWorklogs.every(el=> el.id !== props.WorklogId)){
            if(props.ParentId)  props.AddToFavorite(props.WorklogId,true,props.ParentId)
            else props.AddToFavorite(props.WorklogId)
        }

    }

    const OnDuplicateWorklog = () =>{
   if(!props.PlayingWorklog.id && props.ComponentToDraw === "Worklogs" ) {
            let CurrentWorklog : TWorkLog = {
                id: randomInteger(0, 10000),
                TaskField: props.TaskField,
                Issue: props.Issue,
                StartTime: props.StartTime,
                EndTime: props.EndTime,
                NestingItems: props.NestingItems,
                JiraCode: props.JiraCode,
                IsNesting: props.IsNesting,
                status: props.status,
                TimerValue: "00:00:00"
            }
            props.AddWorklog(CurrentWorklog)
        }
    }


    return (<div onMouseLeave={props.onHideMenu} className={WLDD.Container}>
        <div onClick={props.onHideMenu} className={WLDD.ContentContainer}>
            <div className={WLDD.ContainerFirstEl}>
                Jira Code
            </div>
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
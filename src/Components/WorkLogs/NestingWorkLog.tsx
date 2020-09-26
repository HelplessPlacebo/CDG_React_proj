import React, {useState} from "react";
import WLS from "./WorkLog.module.css"
import PlayButton from "../../assets/imgs/play-button.svg"
import ProgressBar from "../ProgressBar/ProgressBar";
import LineStroke from "../LineStroke/LineStroke";
import WLMoreButton from "../../assets/imgs/active-issue-more-button.svg"
import CP_danger from "../../assets/imgs/danger_cp.svg"
import CP_warning from "../../assets/imgs/warning_cp.svg"
import CP_ok from "../../assets/imgs/ok_cp.svg"
import WorkLogDropDown from "./DropDown/WorklogDropDown";
import StopButton from "../../assets/imgs/stop_button.svg"
import {
    TAddToFavorite,
    TAddWorklog, TNestingItem,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import {TComponentToDraw} from "./WorkLogsContainer";


export type TNestingWorkLogProps = {
    StartTime: string | null
    EndTime: string | null
    JiraCode: string | null
    TaskField: string | null
    TimerValue: string | null
    Issue? : string
    NestingItems?: Array<TNestingItem>
    NestingIsShowing: boolean
    IsNesting?: boolean
    status: "ok" | "warning" | "danger" | string
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog
    id: number
    ParentId?: number
    SetDeleteModalParams: any
    OnDeleteModalOpen: (e: React.MouseEvent<HTMLElement>) => void
    SetWorklogToChange: TSetWorklogToChange
    openWorklogChangeModal: () => void
    AddToFavorite: TAddToFavorite
    FavoritesWorklogs : Array<TWorkLog>
    ComponentToDraw : TComponentToDraw
    AddWorklog : TAddWorklog
}

const NestingWorkLog: React.FC<TNestingWorkLogProps> = (props) => {

    let [ShowMenu, SetShowMenu] = useState<boolean>()

    const OnShowMenu = () => {
        SetShowMenu(true)
    }
    const OnHideMenu = () => {
        SetShowMenu(false)
    }

    const onPlayButtonClicked = () => {

        !props.PlayingWorklog.id && props.SetIsPlayingWorklogById(true, props.id, true, props.ParentId)

    }
    const onStopButtonClicked = () => {
        props.SetIsPlayingWorklogById(false, props.id)
    }

    const OnSetWorklogToChange = () => {
        if (!props.PlayingWorklog.id) {
            let keys = ["id", "StartTime", "TaskField", "TimerValue", "EndTime"
                , "status", "IsNesting", "JiraCode", "NestingItems", "Issue", "ParentId"]
            let WorklogToChange = {} as TWorkLog
            for (let i = 0; i < keys.length; i++) {
                //@ts-ignore
                WorklogToChange[`${(keys[i])}`] = props[keys[i]]
            }
            props.SetWorklogToChange(WorklogToChange)
            props.openWorklogChangeModal()
        }
    }

    return (<div className={WLS.WorkLogs}>
        <div className={props.PlayingWorklog.id === props.id
            ? WLS.WorklogBlockContainerActive
            : WLS.WorklogBlockContainer}
        >

            <div className={WLS.WorklogBlock}>

                <div className={WLS.WorkTime}>
                    <div className={WLS.StartTime}>
                        {props.StartTime}
                    </div>
                    <div className={WLS.Minus}>
                        -
                    </div>
                    <div className={WLS.EndTime}>
                        {props.EndTime}
                    </div>
                </div>

                <div className={props.PlayingWorklog.id === props.id
                    ? WLS.ColorPointPoseActive
                    : WLS.ColorPointPose}>
                    <img src={props.status === "ok"
                        ? CP_ok : props.status === "warning"
                            ? CP_warning : props.status === "danger"
                                ? CP_danger : undefined} alt=""/>
                </div>

                <div onClick={OnSetWorklogToChange} className={WLS.WorklogContentContainer}>
                    <div className={WLS.JiraCode}>
                        {props.JiraCode}
                    </div>
                    <div className={WLS.TaskField}>
                        {props.TaskField}
                    </div>
                </div>

                <div className={WLS.TimerValueContainer}>
                    <div className={WLS.TimerValue}> {props.TimerValue}</div>
                </div>

                {props.PlayingWorklog.id && props.PlayingWorklog.id === props.id
                    ? <div className={WLS.ControlButtonsContainer}>

                        <div onClick={onStopButtonClicked} className={WLS.StopButton}>
                            <img src={StopButton} alt="stop-button"/>
                        </div>

                    </div>

                    : <div className={WLS.ControlButtonsContainer}>

                        <div onClick={onPlayButtonClicked} className={WLS.PlayButton}>
                            <img src={PlayButton} alt="play-button"/>
                        </div>

                    </div>}

                <div onClick={OnShowMenu} className={props.PlayingWorklog.id === props.id
                    ? WLS.WLInfoButtonActive
                    : WLS.WLInfoButton}>
                    <img src={WLMoreButton} alt=""/>
                </div>

            </div>

            <div className={props.PlayingWorklog.id === props.id
                ? WLS.WLlinestrokeActive
                : WLS.WLlinestroke}>
                <LineStroke/>
            </div>

        </div>

        {ShowMenu && <WorkLogDropDown ParentId={props.ParentId}
                                      SetDeleteModalParams={props.SetDeleteModalParams}
                                      PlayingWorklog={props.PlayingWorklog}
                                      WorklogId={props.id}
                                      OnDeleteModalOpen={props.OnDeleteModalOpen} onHideMenu={OnHideMenu}
                                      AddToFavorite={props.AddToFavorite}
                                      FavoritesWorklogs={props.FavoritesWorklogs}
                                      ComponentToDraw={props.ComponentToDraw}
                                      AddWorklog={props.AddWorklog}
                                      TimerValue={props.TimerValue}
                                      NestingIsShowing={props.NestingIsShowing}
                                      TaskField={props.TaskField}
                                      JiraCode={props.JiraCode}
                                      EndTime={props.EndTime}
                                      StartTime={props.StartTime}
                                      status={props.status}
                                      Issue={props.Issue}
                                      IsNesting={props.IsNesting}
                                      NestingItems={props.NestingItems}
        />}

    </div>)
}

export default NestingWorkLog
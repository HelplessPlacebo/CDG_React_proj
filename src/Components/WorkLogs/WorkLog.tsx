import React, {Dispatch, useState} from "react";
import WLS from "./WorkLog.module.css"
import PlayButton from "../../assets/imgs/play-button.svg"
import LineStroke from "../LineStroke/LineStroke";
import WLMoreButtonBG from "../../assets/imgs/worklogMoreButtonBG.svg"
import WLMoreButtonVertical from "../../assets/imgs/worklogMoreVertical.svg"
import CP_danger from "../../assets/imgs/danger_cp.svg"
import CP_warning from "../../assets/imgs/warning_cp.svg"
import CP_ok from "../../assets/imgs/ok_cp.svg"
import {
    TSetIsPlayingWorklogById,
    TNestingItem,
    TWorkLog,
    TDeleteWorklog,
    TSetWorklogToChange, TTimerData, TAddToFavorite, TAddWorklog
} from "../../Data/WorkLogsReducer";
import ArrowUp from "../../assets/imgs/arrow-up.svg"
import {DifferenceInTime} from "../../assets/secondary/DifferenceInTime";
import WorkLogDropDown from "./DropDown/WorklogDropDown";
import StopButton from "../../assets/imgs/stop_button.svg"
import NestingWorkLog from "./NestingWorkLog";
import DeleteWorklogConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import {TDeleteModalParams} from "./WorkLogsBlock";
import {TComponentToDraw} from "./WorkLogsContainer";
import WLActiveBG from "../../assets/imgs/ActiveWorklogBG.svg"


export type TWorklogProps = {
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
    OnHideNestingWorklogs: () => void
    OnShowNestingWorklogs: () => void
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog
    id: number
    OnDeleteModalOpen: (e: React.MouseEvent<HTMLElement>) => void
    OnDeleteModalClose: () => void
    DeleteModalIsOpen: boolean
    DeleteWorklog: TDeleteWorklog
    SetDeleteModalParams: Dispatch<any>
    DeleteModalParams: TDeleteModalParams | undefined
    SetWorklogToChange: TSetWorklogToChange
    ParentId?: number
    openWorklogChangeModal: () => void
    TimerData: TTimerData | undefined
    AddToFavorite: TAddToFavorite
    FavoritesWorklogs: Array<TWorkLog>
    ComponentToDraw: TComponentToDraw
    AddWorklog: TAddWorklog
}

const WorkLog: React.FC<TWorklogProps> = (props) => {

    let [ShowMenu, SetShowMenu] = useState<boolean>()

    const OnShowMenu = () => {
        SetShowMenu(true)
    }
    const OnHideMenu = () => {
        SetShowMenu(false)
    }

    const onPlayButtonClicked = () => {
        !props.PlayingWorklog.id && props.SetIsPlayingWorklogById(true, props.id)

    }
    const onStopButtonClicked = () => {
        props.SetIsPlayingWorklogById(false, props.id)
        // add onOpenModal
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

    return  (<div className={WLS.WorkLogs}>

        <div className={props.id === props.PlayingWorklog.id
            ? WLS.WorklogBlockContainerActive
            : WLS.WorklogBlockContainer}>
            <div className="WorklogBG">
            <div className={WLS.WorklogActive}>
                <div className={WLS.WorklogBlock}>

                    {props.IsNesting
                        ? <div className={WLS.NestingButtonPose}>
                            {props.NestingIsShowing
                                ? <div onClick={props.OnHideNestingWorklogs} className={WLS.NestingBG}><img
                                    className={WLS.TwwContentImg} src={ArrowUp} alt=""/>
                                </div>

                                : <div onClick={props.OnShowNestingWorklogs} className={WLS.NestingBG}> <span
                                    className={WLS.TwwContentText}>
                                {props.NestingItems?.length}
                            </span>
                                </div>
                            }
                        </div>

                        : props.StartTime && props.EndTime ? <div className={WLS.WorkTime}>
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
                            : <div></div>}

                    <div className={props.PlayingWorklog.id === props.id
                        ? WLS.ColorPointPoseActive
                        : WLS.ColorPointPose}>
                        <img src={props.status === "ok"
                            ? CP_ok : props.status === "warning"
                                ? CP_warning : props.status === "danger"
                                    ? CP_danger : undefined} alt=""
                        />
                    </div>

                    <div onClick={OnSetWorklogToChange} className={WLS.WorklogContentContainer}>
                        <div className={WLS.JiraCode}>
                            {props.JiraCode}
                        </div>
                        <div className={WLS.TaskField}>
                            {props.TaskField}
                        </div>
                    </div>

                    {/*   <div className={WLS.ProgressBarContainer}>
                    <ProgressBar status={props.status}/>
                </div>*/}

                    <div className={WLS.TimerValueContainer}>
                        <div className={WLS.TimerValue}>{props.TimerValue}</div>
                    </div>

                    {props.PlayingWorklog.id === props.id

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

                    <div className="WLMoreContainer">
                        <div  className={props.PlayingWorklog.id === props.id
                            ? WLS.WLInfoButtonActive
                            : WLS.WorklogMoreButton}>
                            <img src={WLMoreButtonBG} alt=""/>
                        </div>
                        <div onClick={OnShowMenu} className={props.PlayingWorklog.id === props.id
                            ? WLS.WorklogMoreVerticalActive
                            :WLS.WorklogMoreVertical}>
                            <img src={WLMoreButtonVertical} alt="more-vertical"/>
                        </div>
                    </div>
                </div>
            </div>
         </div>

            <DeleteWorklogConfirmModal DeleteModalParams={props.DeleteModalParams} DeleteWorklog={props.DeleteWorklog}
                                       WorkLogToDeleteId={props.id} isOpen={props.DeleteModalIsOpen}
                                       onClose={props.OnDeleteModalClose}/>

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
        {/*fix duplicating */}
        {props.NestingIsShowing && props.NestingItems?.map(el => {

            return <NestingWorkLog
                ComponentToDraw={props.ComponentToDraw}
                FavoritesWorklogs={props.FavoritesWorklogs}
                AddToFavorite={props.AddToFavorite}
                openWorklogChangeModal={props.openWorklogChangeModal}
                PlayingWorklog={props.PlayingWorklog}
                SetWorklogToChange={props.SetWorklogToChange}
                OnDeleteModalOpen={props.OnDeleteModalOpen}
                SetDeleteModalParams={props.SetDeleteModalParams}
                SetIsPlayingWorklogById={props.SetIsPlayingWorklogById}
                ParentId={props.id}
                AddWorklog={props.AddWorklog}
                NestingIsShowing={props.NestingIsShowing}
                {...el}
                key={el.id}
                TimerValue={el.TimerValue
                    ? el.TimerValue
                    : el.StartTime && el.EndTime ? DifferenceInTime([el.StartTime, el.EndTime])
                        : null}

            />
        })}
    </div>)
}

export default WorkLog
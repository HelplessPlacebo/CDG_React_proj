import React, {Dispatch, SetStateAction, useState} from "react";
import WLS from "./WorkLog.module.css"
import PlayButton from "../../assets/imgs/play-button.svg"
import LineStroke from "../LineStroke/LineStroke";
import WLMoreButtonBG from "../../assets/imgs/worklogMoreButtonBG.svg"
import WLMoreButtonVertical from "../../assets/imgs/worklogMoreVertical.svg"
import CP_danger from "../../assets/imgs/danger_cp.svg"
import CP_warning from "../../assets/imgs/warning_cp.svg"
import CP_ok from "../../assets/imgs/ok_cp.svg"
import {TWorkLog, CurrentDate} from "../../Data/WorkLogsReducer";
import ArrowUp from "../../assets/imgs/arrow-up.svg"
import WorkLogDropDown from "./DropDown/WorklogDropDown";
import StopButton from "../../assets/imgs/stop_button.svg"
import DeleteWorklogConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import {TDeleteModalParams, TWorklogsBlockProps} from "./WorkLogsBlock";
import NestingWorkLog from "./NestingWorkLog";
import WorklogActiveBG from "../../assets/imgs/ActiveWorklogBG.svg"


export type TWorklogOwnProps = {
    DeleteModalIsOpen: boolean
    OnDeleteModalOpen: () => void
    OnDeleteModalClose: () => void
    DeleteModalParams: TDeleteModalParams | undefined
    SetDeleteModalParams: Dispatch<SetStateAction<TDeleteModalParams | undefined>>
    WorklogInfo: TWorkLog
    ParentId?: number
}
export type TWorklogProps = TWorklogsBlockProps & TWorklogOwnProps

const WorkLog: React.FC<TWorklogProps> = (props) => {

    let [ShowMenu, SetShowMenu] = useState<boolean>()
    let [NestingIsShowing, SetNestingIsShowing] = useState(false)

    const OnShowNestingWorklogs = () => SetNestingIsShowing(true)
    const OnHideNestingWorklogs = () => SetNestingIsShowing(false)
    const OnShowMenu = () => SetShowMenu(true)
    const OnHideMenu = () => SetShowMenu(false)
    const onStopButtonClicked = () => props.SetIsPlayingWorklogById(false, props.WorklogInfo.id)

    const onPlayButtonClicked = () => {
        if ((props.ComponentToDraw === "FavoritesWorklogs" && !props.PlayingWorklog)
            || (props.BlockInfo?.BlockCreatedDate === CurrentDate && !props.PlayingWorklog))

            props.SetIsPlayingWorklogById(true, props.WorklogInfo.id, props.ComponentToDraw === "FavoritesWorklogs")
    }

    const OnSetWorklogToChange = () => {
        if ((props.ComponentToDraw === "FavoritesWorklogs" && !props.PlayingWorklog)
            || (props.BlockInfo?.BlockCreatedDate === CurrentDate && !props.PlayingWorklog)) {
            let keys = ["id", "StartTime", "TaskField", "TimerValue", "EndTime"
                , "status", "NestingItems", "Issue"]
            let WorklogToChange = {} as TWorkLog
            for (let i = 0; i < keys.length; i++) {
                //@ts-ignore
                WorklogToChange[`${(keys[i])}`] = props.WorklogInfo[keys[i]]
            }
            props.ComponentToDraw === "Worklogs"
                ? WorklogToChange.IsFavorites = false
                : WorklogToChange.IsFavorites = true

            props.SetWorklogToChange(WorklogToChange)
            props.openWorklogChangeModal()
        }
    }

    return (<div className={WLS.WorkLogs}>
        <div className={props.PlayingWorklog?.id === props.WorklogInfo.id || ShowMenu
            ? WLS.WorklogBlockContainerActive
            : WLS.WorklogBlockContainer}>
            <div className="WorklogBG">

                <img
                    className={props.PlayingWorklog?.id === props.WorklogInfo.id || ShowMenu ? WLS.WorklogActiveBG : WLS.WorklogBG}
                    src={WorklogActiveBG} alt=""/>

                <div className={WLS.WorklogActive}>
                    <div className={WLS.WorklogBlock}>

                        {
                            props.WorklogInfo.NestingItems && props.WorklogInfo.NestingItems.length > 0
                                ? <div className={WLS.NestingButtonPose}>
                                    {
                                        NestingIsShowing
                                            ? <div onClick={OnHideNestingWorklogs} className={WLS.NestingBG}><img
                                                className={WLS.TwwContentImg} src={ArrowUp} alt=""/>
                                            </div>

                                            : <div onClick={OnShowNestingWorklogs} className={WLS.NestingBG}>
                                            <span
                                                className={WLS.TwwContentText}>
                                                    {props.WorklogInfo.NestingItems.length}
                                            </span>
                                            </div>
                                    }
                                </div>

                                : props.WorklogInfo.StartTime && props.WorklogInfo.EndTime
                                ? <div className={WLS.WorkTime}>

                                    <div className={WLS.StartTime}>
                                        {props.WorklogInfo.StartTime}
                                    </div>

                                    <div className={WLS.Minus}>
                                        -
                                    </div>

                                    <div className={WLS.EndTime}>
                                        {props.WorklogInfo.EndTime}
                                    </div>

                                </div>
                                : <div></div>
                        }

                        <div className={props.PlayingWorklog?.id === props.WorklogInfo.id || ShowMenu
                            ? WLS.ColorPointPoseActive
                            : WLS.ColorPointPose}>
                            <img style={{transitionTimingFunction: "ease-out", transitionDuration: "0.3s"}}
                                 src={props.WorklogInfo.status === "ok"
                                     ? CP_ok : props.WorklogInfo.status === "warning"
                                         ? CP_warning : props.WorklogInfo.status === "danger"
                                             ? CP_danger : undefined} alt=""
                            />
                        </div>

                        <div onClick={OnSetWorklogToChange} className={WLS.WorklogContentContainer}>
                            <div className={WLS.Issue}>
                                {props.WorklogInfo.Issue}
                            </div>
                            <div className={WLS.TaskField}>
                                {props.WorklogInfo.TaskField}
                            </div>
                        </div>


                        <div className={WLS.TimerValueContainer}>
                            <div className={WLS.TimerValue}>{props.WorklogInfo.TimerValue}</div>
                        </div>

                        {props.PlayingWorklog?.id === props.WorklogInfo.id

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
                            <div className={props.PlayingWorklog?.id === props.WorklogInfo.id || ShowMenu
                                ? WLS.WorklogMoreButtonActive
                                : WLS.WorklogMoreButton}>
                                <img src={WLMoreButtonBG} alt=""/>
                            </div>
                            <div onMouseEnter={OnShowMenu}
                                 className={props.PlayingWorklog?.id === props.WorklogInfo.id || ShowMenu
                                     ? WLS.WorklogMoreVerticalActive
                                     : WLS.WorklogMoreVertical}>
                                <img src={WLMoreButtonVertical} alt="more-vertical"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteWorklogConfirmModal DeleteModalParams={props.DeleteModalParams} DeleteWorklog={props.DeleteWorklog}
                                       isOpen={props.DeleteModalIsOpen} onClose={props.OnDeleteModalClose}
                                       ComponentToDraw={props.ComponentToDraw}
                                       DeleteFromFavorites={props.DeleteFromFavorites}
            />

            <div className={props.PlayingWorklog?.id === props.WorklogInfo.id
                ? WLS.WLlinestrokeActive
                : WLS.WLlinestroke}>
                <LineStroke/>
            </div>

        </div>
        {
            ShowMenu && <WorkLogDropDown {...props}
                                         onHideMenu={OnHideMenu}
                                         NestingIsShowing={NestingIsShowing}
                                         ShowSnackBar={props.ShowSnackBar}
            />}

        {

            NestingIsShowing && <NestingWorkLog {...props} />

        }
    </div>)
}

export default WorkLog
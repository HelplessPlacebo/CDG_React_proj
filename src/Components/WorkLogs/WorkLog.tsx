import React, {Dispatch, SetStateAction} from "react";
import WLS from "./WorkLog.module.css"
import {LineStroke} from "../LineStroke/LineStroke";
import {
    CurrentDate,
    TAddToFavorite,
    TAddWorklog,
    TBlockInfo,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange,
    TWorkLog
} from "../../Redux/WorkLogsReducer";
import {WorkLogDropDown} from "./DropDown/WorklogDropDown";
import {NestingWorkLog} from "./NestingWorkLog";
import WorklogActiveBG from "../../assets/imgs/ActiveWorklogBG.svg"
import {TWorklogsContainerOwnProps} from "../../globalTypes/Types";
import {useBooleanState} from "../hooks/useBooleanState";
import {WorkTime} from "./Worklog/WorkTime";
import {StatusBar} from "./Worklog/StatusBar";
import {IssueAndTask} from "./Worklog/IssueAndTask";
import {WorklogTime} from "./Worklog/Time";
import {ControlButtons} from "./Worklog/ControlButtons";
import {OnHoverMoreButton} from "./Worklog/OnHoverMoreButton";


export type TWorklogOwnProps = {
    setWorklogToDelete: Dispatch<SetStateAction<TWorkLog | null>>
    worklogInfo: TWorkLog
    parentId?: number
    blockInfo?: TBlockInfo
    setIsPlayingWorklogById: TSetIsPlayingWorklogById
    playingWorklog: TWorkLog | null
    setWorklogToChange: TSetWorklogToChange
    addWorklog: TAddWorklog
    addToFavorite: TAddToFavorite
    showDeleteModal : ()=> void
}
export type TWorklogProps = TWorklogsContainerOwnProps & TWorklogOwnProps

export const WorkLog: React.FC<TWorklogProps> = (props) => {

    const dropDownMenuStatus = useBooleanState(false)
    const nestingItemsStatus = useBooleanState(false)
    const onStopButtonClicked = () => props.setIsPlayingWorklogById(false, props.worklogInfo.id)

    const onPlayButtonClicked = () => {
        if ((props.componentToDraw === "FavoritesWorklogs" && !props.playingWorklog)
            || (props.blockInfo?.BlockCreatedDate === CurrentDate && !props.playingWorklog))
            props.setIsPlayingWorklogById(true, props.worklogInfo.id, props.componentToDraw === "FavoritesWorklogs")
    }

    const onSetWorklogToChange = () => {
        if ((props.componentToDraw === "FavoritesWorklogs" && !props.playingWorklog)
            || (props.blockInfo?.BlockCreatedDate === CurrentDate && !props.playingWorklog)) {
            let keys = ["id", "StartTime", "TaskField", "TimerValue", "EndTime"
                , "status", "NestingItems", "Issue"]
            let WorklogToChange = {} as TWorkLog
            for (let i = 0; i < keys.length; i++) {
                // @ts-ignore
                WorklogToChange[`${(keys[i])}`] = props.worklogInfo[keys[i]]
            }
            props.componentToDraw === "Worklogs"
                ? WorklogToChange.IsFavorites = false
                : WorklogToChange.IsFavorites = true

            props.setWorklogToChange(WorklogToChange)
            props.openWorklogChangeModal()
        }
    }

    return <div className={WLS.WorkLogs}>
        <div className={props.playingWorklog?.id === props.worklogInfo.id || dropDownMenuStatus.isDisplayed
            ? WLS.WorklogBlockContainerActive
            : WLS.WorklogBlockContainer}>
            <div className="WorklogBG">

                <img
                    className={props.playingWorklog?.id === props.worklogInfo.id
                    || dropDownMenuStatus.isDisplayed ? WLS.WorklogActiveBG : WLS.WorklogBG}
                    src={WorklogActiveBG} alt=""/>


                <div className={WLS.WorklogBlock}>

                    <WorkTime worklogInfo={props.worklogInfo} nestingItemsStatus={nestingItemsStatus}/>

                    <StatusBar
                        isPlayingOrDisplayed={props.playingWorklog?.id === props.worklogInfo.id || dropDownMenuStatus.isDisplayed}
                        status={props.worklogInfo.status}/>

                    <IssueAndTask onSetWorklogToChange={onSetWorklogToChange} issue={props.worklogInfo.Issue}
                                  taskField={props.worklogInfo.TaskField}/>

                    <WorklogTime timerValue={props.worklogInfo.TimerValue}/>

                    <ControlButtons
                        isPlaying={!!(props.playingWorklog && props.playingWorklog.id === props.worklogInfo.id)}
                        onStopButtonClicked={onStopButtonClicked}
                        onPlayButtonClicked={onPlayButtonClicked}/>

                    <OnHoverMoreButton
                        isActive={props.playingWorklog?.id === props.worklogInfo.id || dropDownMenuStatus.isDisplayed}
                        onShow={dropDownMenuStatus.Show}/>

                </div>

            </div>

            <div className={props.playingWorklog?.id === props.worklogInfo.id
                ? WLS.WLlinestrokeActive
                : WLS.WLlinestroke}>
                <LineStroke/>
            </div>

        </div>
        {
            dropDownMenuStatus.isDisplayed && <WorkLogDropDown onHideMenu={dropDownMenuStatus.Hide}
                                                               nestingIsShowing={nestingItemsStatus.isDisplayed}
                                                               showSnackBar={props.showSnackBar}
                                                               playingWorklog={props.playingWorklog}
                                                               addWorklog={props.addWorklog}
                                                               componentToDraw={props.componentToDraw}
                                                               setWorklogToDelete={props.setWorklogToDelete}
                                                               showDeleteModal={props.showDeleteModal}
                                                               addToFavorite={props.addToFavorite}
                                                               worklogInfo={props.worklogInfo}
                                                               blockInfo={props.blockInfo}
                                                               parentId={props.parentId}
            />}

        {
            nestingItemsStatus.isDisplayed && <NestingWorkLog {...props} />
        }
    </div>
}

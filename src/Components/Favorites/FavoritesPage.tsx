import React from "react";
import TTS from "../TimeTracking/TimeTracking.module.css";
import FS from "./Favorites.module.css"
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg";
import {TAddWorklog, TTimerData, TWorklogBlock} from "../../Data/WorkLogsReducer";
import WorkLogsContainer from "../WorkLogs/WorkLogsContainer";

export type TFavoritesPageProps = {
    FavoritesIsClicked: boolean
    WorklogsBlocks: Array<TWorklogBlock>
    TimerData: TTimerData | undefined
    openWorklogChangeModal: () => void
    AddWorklog : TAddWorklog
}

const FavoritesPage: React.FC<TFavoritesPageProps> = (props) => {
    const AddNewFavoritesWorklog = () =>{
        props.AddWorklog(undefined,undefined,true)
    }
    return (<div>
        {props.WorklogsBlocks.map(WBL=>WBL.Worklogs.some(Worklog => Worklog.IsFavorites)).includes(true)
            ? <div className="Worklogs">
                <WorkLogsContainer TimerData={props.TimerData}
                                   openWorklogChangeModal={props.openWorklogChangeModal}
                                   ComponentToDraw={"FavoritesWorklogs"}/>
            </div>

            : <div className={FS.NoFavoritesIssuesContainer}>

                <div className={FS.FavoritesText}>
                    There is no favorites issues yet
                </div>

                <div style={{paddingTop: "60px"}} className={TTS.NewWorklog}>
                    <div  className={TTS.NewWorklogButtonPose}>
                        <img onClick={AddNewFavoritesWorklog} className={TTS.NewWorklogButtonSize}
                             src={NewWorklogButton}
                             alt="new_worklog_button"/>
                    </div>

                    <div className={TTS.NewWorklogButtonDescriptionContainer}>

                        <div className={TTS.NewWorklogButtonDescription}>
                            new favorite
                        </div>

                    </div>
                </div>
            </div>}
    </div>)
}

export default FavoritesPage
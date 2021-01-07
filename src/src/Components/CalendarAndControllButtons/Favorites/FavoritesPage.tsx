import React from "react";
import TTS from "../../TimeTracking/TimeTracking.module.css";
import FS from "./Favorites.module.css"
import NewWorklogButton from "../../../assets/imgs/new_worklog_button.svg";
import {TAddWorklog, TWorkLog, TWorklogBlock} from "../../../Data/WorkLogsReducer";
import WorkLogsContainer from "../../WorkLogs/WorkLogsContainer";
import {TWorklogsContainerOwnProps} from "../../../globalTypes/Types";

export type TFavoritesPageProps = TWorklogsContainerOwnProps &{
    FavoritesIsClicked: boolean
    WorklogsBlocks: Array<TWorklogBlock>
    AddWorklog : TAddWorklog
    PlayingWorklog : TWorkLog | null
    FavoritesWorklog : Array<TWorkLog>

}

const FavoritesPage: React.FC<TFavoritesPageProps> = (props) => {
    const AddNewFavoritesWorklog = () => !props.PlayingWorklog &&  props.AddWorklog(undefined,true)

    return (<div>
        {
            props.FavoritesWorklog.length > 0
                    ? <div className="Favorites-Worklogs">
                        <WorkLogsContainer TimerData={props.TimerData}
                                           openWorklogChangeModal={props.openWorklogChangeModal}
                                           ComponentToDraw={props.ComponentToDraw}
                                           SetTimerData={props.SetTimerData}
                                           ShowSnackBar={props.ShowSnackBar}
                                           closeWorklogChangeModal={props.closeWorklogChangeModal}
                                           WorklogChangeModalIsOpen={props.WorklogChangeModalIsOpen}

                        />
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
                    </div>
            }
    </div>)
}

export default FavoritesPage

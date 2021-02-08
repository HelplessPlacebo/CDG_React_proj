import React from "react";
import TTS from "../TimeTracking/TimeTracking.module.css";
import FS from "../CalendarAndControllButtons/ControlButtons/Favorites/Favorites.module.css"
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg";
import {WorkLogsBlock} from "./WorkLogsBlock";
import {TWorklogsContainerOwnProps} from "../../globalTypes/Types";
import {useSelector} from "react-redux";
import {getFavoritesWorklog, getPlayingWorklog} from "../Selectors/WorklogsSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";


const FavoritesWorklogs: React.FC<TWorklogsContainerOwnProps> = (props) => {
    const playingWorklog = useSelector(getPlayingWorklog)
    const favoritesWorklog = useSelector(getFavoritesWorklog)

    const WFS = useWorklogsFunctions()
    const AddNewFavoritesWorklog = () => !playingWorklog && WFS.addWorklog(null, true)
    return (<div>
        {
            favoritesWorklog.length > 0
                ? <div className={FS.WorklogsContainer}>
                    <WorkLogsBlock
                        openWorklogChangeModal={props.openWorklogChangeModal}
                        componentToDraw={props.componentToDraw}
                        showSnackBar={props.showSnackBar}
                        closeWorklogChangeModal={props.closeWorklogChangeModal}
                    />
                </div>

                : <div className={FS.NoFavoritesIssuesContainer}>

                    <div className={FS.FavoritesText}>
                        There is no favorites issues yet
                    </div>

                    <div style={{paddingTop: "60px"}} className={TTS.NewWorklog}>
                        <div className={TTS.NewWorklogButtonPose}>
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
export default FavoritesWorklogs

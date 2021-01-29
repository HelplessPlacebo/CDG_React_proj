import React from "react";
import TTS from "./TimeTracking.module.css"
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg"
import NewWorklogButtonShadowed from "../../assets/imgs/new_worklog_button_shadowed.svg"
import {Timer} from "../Timer/Timer"
import {TTimerData} from "../../Redux/WorkLogsReducer"
import {useSelector} from "react-redux"
import {getIssues} from "../Selectors/IssuesSelectors";
import {getPlayingWorklog} from "../Selectors/WorklogsSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";

export type TTimeTrackingProps = {
    FavoritesIsClicked: boolean
    openWorklogChangeModal: () => void
    SetTimerData: (TimerData: TTimerData) => void
}

export const TimeTracking: React.FC<TTimeTrackingProps> = (props) => {
    const issues = useSelector(getIssues)
    const playingWorklog = useSelector(getPlayingWorklog)
    const WFS = useWorklogsFunctions()
    const OnAddEmptyWorklog = () => WFS.addWorklog()

    return (<div className={TTS.TTLayout}>

            <div className={TTS.strokeVert}>

            </div>

            <div className={TTS.TTContent}>

                <div className={TTS.TimetrackingHeaderContainer}>
                    <div className={TTS.TimetrackingHeader}>

                        <div className={TTS.TimeTrackingLogo}>
                            Time tracking
                        </div>

                    </div>
                </div>

                {playingWorklog
                    ? <Timer SetIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                             PlayingWorklog={playingWorklog}
                             openWorklogChangeModal={props.openWorklogChangeModal}
                             SetTimerData={props.SetTimerData}
                             ChangeWorklog={WFS.changeWorklog}
                             Issues={issues}
                    />
                    : <div className={TTS.TTMainContentRoot}>
                        <div className={TTS.NewWorklogContainer}>
                            <div className={TTS.NewWorklog}>

                                <div onClick={!props.FavoritesIsClicked
                                    ? OnAddEmptyWorklog
                                    : undefined}
                                     className={TTS.NewWorklogButtonPose}>

                                    <img className={TTS.NewWorklogButtonSize}
                                         src={props.FavoritesIsClicked
                                             ? NewWorklogButtonShadowed
                                             : NewWorklogButton
                                         }
                                         alt="new_worklog_button"/>
                                </div>

                                <div className={TTS.NewWorklogButtonDescriptionContainer}>
                                    <div className={TTS.NewWorklogButtonDescription}>
                                        new worklog
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={TTS.TTHorizStrokePose}>

                        </div>

                    </div>
                }
            </div>
        </div>
    )
}
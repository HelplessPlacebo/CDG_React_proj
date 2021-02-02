import React from "react";
import TTS from "./TimeTracking.module.css"
import {Timer} from "../Timer/Timer"
import {TTimerData} from "../../Redux/WorkLogsReducer"
import {useSelector} from "react-redux"
import {getIssues} from "../Selectors/IssuesSelectors";
import {getPlayingWorklog} from "../Selectors/WorklogsSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";
import {UnActiveTimer} from "./UnActiveTimer";

export type TTimeTrackingProps = {
    favoritesIsClicked: boolean
    openWorklogChangeModal: () => void
    setTimerData: (TimerData: TTimerData) => void
}

export const TimeTracking: React.FC<TTimeTrackingProps> = (props) => {
    const issues = useSelector(getIssues)
    const playingWorklog = useSelector(getPlayingWorklog)
    const WFS = useWorklogsFunctions()
    const OnAddEmptyWorklog = () => WFS.addWorklog()

    return (<div className={TTS.TTLayout}>

            <div className={TTS.strokeVert}/>

            <div className={TTS.TTContent}>

                <div className={TTS.TimetrackingHeaderContainer}>
                    <div className={TTS.TimetrackingHeader}>

                        <div className={TTS.TimeTrackingLogo}>
                            Time tracking
                        </div>

                    </div>
                </div>

                {playingWorklog
                    ? <Timer setIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                             playingWorklog={playingWorklog}
                             openWorklogChangeModal={props.openWorklogChangeModal}
                             setTimerData={props.setTimerData}
                             changeWorklog={WFS.changeWorklog}
                             issues={issues}
                    />
                    : <UnActiveTimer favoritesIsClicked={props.favoritesIsClicked}
                                     onAddEmptyWorklog={OnAddEmptyWorklog}/>
                }
            </div>
        </div>
    )
}
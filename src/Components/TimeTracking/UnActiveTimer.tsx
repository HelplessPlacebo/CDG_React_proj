import React from "react"
import TTS from "./TimeTracking.module.css"
import NewWorklogButtonShadowed from "../../assets/imgs/new_worklog_button_shadowed.svg"
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg"
import {useParams} from 'react-router-dom'

type TUnActiveTimerProps = {
    onAddEmptyWorklog : ()=>void
}
export const UnActiveTimer: React.FC<TUnActiveTimerProps> = (props) => {
    const {worklogsType}=useParams()
    return (
        <div className={TTS.TTMainContentRoot}>
            <div className={TTS.NewWorklogContainer}>
                <div className={TTS.NewWorklog}>

                    <div onClick={worklogsType === "All"
                        ? props.onAddEmptyWorklog
                        : undefined}
                         className={TTS.NewWorklogButtonPose}>

                        <img className={TTS.NewWorklogButtonSize}
                             src={worklogsType === "Favorites"
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
            <div className={TTS.TTHorizStrokePose}/>
        </div>
    )
}

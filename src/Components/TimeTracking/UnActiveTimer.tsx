import React from "react"
import TTS from "./TimeTracking.module.css";
import NewWorklogButtonShadowed from "../../assets/imgs/new_worklog_button_shadowed.svg";
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg";

type TUnActiveTimerProps = {
    favoritesIsClicked: boolean
    onAddEmptyWorklog : ()=>void
}
export const UnActiveTimer: React.FC<TUnActiveTimerProps> = (props) => {
    return (
        <div className={TTS.TTMainContentRoot}>
            <div className={TTS.NewWorklogContainer}>
                <div className={TTS.NewWorklog}>

                    <div onClick={!props.favoritesIsClicked
                        ? props.onAddEmptyWorklog
                        : undefined}
                         className={TTS.NewWorklogButtonPose}>

                        <img className={TTS.NewWorklogButtonSize}
                             src={props.favoritesIsClicked
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

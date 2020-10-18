import React from "react";
import TTS from "./TimeTracking.module.css"
import StrokeVert from "../../assets/imgs/stroke_vert.svg"
import StrokeHoriz from "../../assets/imgs/stroke_horiz.svg"
import NewWorklogButton from "../../assets/imgs/new_worklog_button.svg"
import NewWorklogButtonShadowed from "../../assets/imgs/new_worklog_button_shadowed.svg"
//import LongMenu from "../DropDownMenu/DropDownMenu";
import Timer from "../Timer/Timer";
import {TAddWorklog, TChangeWorklog, TSetIsPlayingWorklogById, TTimerData, TWorkLog} from "../../Data/WorkLogsReducer";
import IssuesSelectInput from "../Issues/IssuesSelectInput";

export type TTimeTrackingProps = {
    AddWorklog : TAddWorklog
    PlayingWorklog: TWorkLog | null
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    ChangeWorklog: TChangeWorklog
    FavoritesIsClicked: boolean
    openWorklogChangeModal : ()=> void
    SetTimerData : (TimerData : TTimerData) => void
    Issues : string[]
}

const TimeTracking: React.FC<TTimeTrackingProps> = (props) => {

    const OnAddEmptyWorklog = () =>{
        props.AddWorklog()
    }

    return (<div className={TTS.TTLayout}>
            <div className={TTS.strokeVert}>
                {/*<img src={StrokeVert} alt="stroke-vert"/>*/}
            </div>
            <div className={TTS.TTContent}>


                <div className={TTS.TimetrackingHeaderContainer}>
                    <div className={TTS.TimetrackingHeader}>

                        <div className={TTS.TimeTrackingLogo}>
                            Time tracking
                        </div>

                        {/*{!props.PlayingWorklog.id && <LongMenu/>}*/}

                    </div>
                </div>

                {props.PlayingWorklog
                    ? <Timer SetIsPlayingWorklogById={props.SetIsPlayingWorklogById}
                             PlayingWorklog={props.PlayingWorklog}
                             openWorklogChangeModal={props.openWorklogChangeModal}
                             SetTimerData={props.SetTimerData}
                             ChangeWorklog={props.ChangeWorklog}
                             Issues={props.Issues}
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
                            {/*<img src={StrokeHoriz} alt=""/>*/}
                        </div>

                    </div>


                }
            </div>
        </div>
    )

}

export default TimeTracking
import React from "react"
import WLS from "../WorkLog.module.css";
import StopButton from "../../../assets/imgs/stop_button.svg";
import PlayButton from "../../../assets/imgs/play-button.svg";

type TWorklogControlButtonsProps = {
    isPlaying : boolean
    onStopButtonClicked : ()=> void
    onPlayButtonClicked : ()=> void
}
export const ControlButtons : React.FC<TWorklogControlButtonsProps> = (props) => <>
    {props.isPlaying
        ? <div className={WLS.ControlButtonsContainer} onClick={props.onStopButtonClicked}>
            <img src={StopButton} alt="stop-button"/>
        </div>

        : <div className={WLS.ControlButtonsContainer} onClick={props.onPlayButtonClicked}>
            <img src={PlayButton} alt="play-button"/>
        </div>}
        </>
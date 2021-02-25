import React from "react"
import WLS from "../Worklog.module.css";
import CP_ok from "../../../assets/imgs/ok_cp.svg";
import CP_warning from "../../../assets/imgs/warning_cp.svg";
import CP_danger from "../../../assets/imgs/danger_cp.svg";

type TStatusBarProps = {
    isPlayingOrDisplayed: boolean
    status : "ok" | "warning" | "danger"
}

export const StatusBar: React.FC<TStatusBarProps> = (props) =>
    <div className={props.isPlayingOrDisplayed
        ? WLS.ColorPointPoseActive
        : WLS.ColorPointPose}>
        <img style={{transitionTimingFunction: "ease-out", transitionDuration: "0.3s"}}
             src={props.status === "ok"
                 ? CP_ok : props.status === "warning"
                     ? CP_warning : props.status === "danger"
                         ? CP_danger : undefined} alt=""
        />
    </div>

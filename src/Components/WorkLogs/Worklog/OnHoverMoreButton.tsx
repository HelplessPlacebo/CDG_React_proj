import React from "react"
import WLS from "../WorkLog.module.css";
import WLMoreButtonBG from "../../../assets/imgs/worklogMoreButtonBG.svg";
import WLMoreButtonVertical from "../../../assets/imgs/worklogMoreVertical.svg";
type TOnHoverMoreButtonProps = {
    isActive : boolean
    onShow : ()=>void
}

export const OnHoverMoreButton:React.FC<TOnHoverMoreButtonProps>=(props)=><div className="WLMoreContainer">
    <div className={props.isActive ? WLS.WorklogMoreButtonActive : WLS.WorklogMoreButton}>
        <img src={WLMoreButtonBG} alt=""/>
    </div>

    <div onMouseEnter={props.onShow} className={props.isActive ? WLS.WorklogMoreVerticalActive : WLS.WorklogMoreVertical}>
        <img src={WLMoreButtonVertical} alt="more-vertical"/>
    </div>

</div>
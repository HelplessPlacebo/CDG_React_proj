import React from "react";
import CSCS from "./CSCElement.module.css"
import Cyan from "../../assets/imgs/Cyan.svg"
import Orange from "../../assets/imgs/Orange.svg"
import Purple from "../../assets/imgs/Purple.svg"
export type TCSCElementProps = {
    Description: string
    SyncTime : string
    LineColor: string
}
//mb images will be like a link in items

const CSCElement: React.FC<TCSCElementProps> = (props) => {
    return (<div className={CSCS.CalendarSync}>
            <div className={CSCS.SyncColorPointContainer}>
                <img src={props.LineColor === "Cyan"
                    ? Cyan : props.LineColor === "Orange"
                        ? Orange : props.LineColor === "Purple"
                            ? Purple
                            : undefined } alt=""/>
            </div>
            <div className={CSCS.SyncInfoContainer}>
                <div>
                    {props.Description}
                </div>
                <div>
                    {props.SyncTime}
                </div>
            </div>
        </div>)
}

export default CSCElement
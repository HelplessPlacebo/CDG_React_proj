import React from "react";
import CS from "./Calendar.module.css";
import Danger from "../../assets/imgs/CalendarDayStatusDanger.svg"
import Warn from "../../assets/imgs/CalendarDayStatusWarning.svg"
import OK from "../../assets/imgs/CalendarDayStatusOK.svg"

export type TDropDownCalendarFooterElementProps = {
    status: "ok" | "danger" | "warning" | "empty"
    text: string
}
export const DropDownCalendarFooterElement: React.FC<TDropDownCalendarFooterElementProps> = (props) => {
    return (<div className={CS.DropDownCalendarFooterElement}>
            {
                props.status !== "empty" ?
                <img style={{marginTop: "4px"}} src={props.status === "ok"
                    ? OK
                    : props.status === "warning"
                        ? Warn
                        : props.status === "danger"
                            ? Danger
                            : undefined} alt={"dropDOwnCAlendarFooterStatus"}/>
                            : <div style={{marginTop : "4px"}} className={CS.EmptyStatus}> </div>
            }


            <div  className={CS.DropDownProgressStatus}>
                {props.text}
            </div>

        </div>
    )
}

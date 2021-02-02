import React from "react"
import WLS from "../WorkLog.module.css";
import ArrowUp from "../../../assets/imgs/arrow-up.svg";
import {TWorkLog} from "../../../Redux/WorkLogsReducer";
import {useBooleanStateReturnType} from "../../hooks/useBooleanState";

type TWorkTimeProps ={
    worklogInfo : TWorkLog
    nestingItemsStatus : useBooleanStateReturnType
}
export const WorkTime :React.FC<TWorkTimeProps> = (props)=><>
    {
        props.worklogInfo.NestingItems && props.worklogInfo.NestingItems.length > 0
            ? <div className={WLS.NestingButtonPose}>
                {
                    props.nestingItemsStatus.isDisplayed
                        ? <div onClick={props.nestingItemsStatus.Hide} className={WLS.NestingBG}>
                            <img className={WLS.TwwContentImg} src={ArrowUp} alt=""/>
                        </div>

                        : <div onClick={props.nestingItemsStatus.Show} className={WLS.NestingBG}>
                                            <span
                                                className={WLS.TwwContentText}>
                                                    {props.worklogInfo.NestingItems.length}
                                            </span>
                        </div>
                }
            </div>

            : props.worklogInfo.StartTime && props.worklogInfo.EndTime
            ? <div className={WLS.WorkTime}>

                <div className={WLS.StartTime}>
                    {props.worklogInfo.StartTime}
                </div>

                <div className={WLS.Minus}>
                    -
                </div>

                <div className={WLS.EndTime}>
                    {props.worklogInfo.EndTime}
                </div>

            </div>
            : <div/>
    }
</>
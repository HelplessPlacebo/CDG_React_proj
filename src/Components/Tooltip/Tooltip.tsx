import React from "react";
import TS from "./Tooltip.module.css"
//import TooltipCloseButton from "../../assets/imgs/Tooltip_Close_button.svg"
import {TTooltipInfo} from "../../App";
import CloseIcon from '@material-ui/icons/Close';

export type TTooltipProps = {
    TooltipInfo : TTooltipInfo| undefined
    hideTooltil : () => void
    TooltipIsShowed : boolean
}

const Tooltip: React.FC<TTooltipProps> = (props) => {

    return <>
        {props.TooltipIsShowed
            ? <div className={TS.TooltipContainer}>
                <div className={TS.TooltipContent}>
                    <div className={TS.StatusAndCloseButtonContainer}>
                        <div className={props.TooltipInfo?.status === "ok"
                            ? TS.TooltipStatusOk
                            : props.TooltipInfo?.status === "warning"
                                ? TS.TooltipStatusWarning
                                : props.TooltipInfo?.status === "danger"
                                    ? TS.TooltipStatusDanger
                                    : undefined}>

                        </div>

                        <div onClick={props.hideTooltil} className={TS.TooltipCloseButtonContainer}>
                            <CloseIcon fontSize={"inherit"} color={"inherit"} > </CloseIcon>
                            {/*<img src={TooltipCloseButton} alt="tooltip-close"/>*/}
                        </div>
                    </div>

                    <div className={TS.TooltipTextContainer}>
                        {props.TooltipInfo?.text}
                    </div>

                </div>
            </div>
            : undefined
        }
    </>
}

export default Tooltip
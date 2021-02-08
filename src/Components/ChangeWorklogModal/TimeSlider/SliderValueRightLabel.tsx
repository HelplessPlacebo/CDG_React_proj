import React from "react";
import LS from "./TimeSlider.module.css"
export type TLeftLabelProps = {
    Position : number | undefined
    EndTime : string | null | undefined
    offsetRight : number | undefined
}

export const RightLabel :React.FC<TLeftLabelProps> = (props) =>{
    return <div className={LS.RightLabel}
                style={{ display : `${!props.EndTime && !props.Position ? "none" : "block" }`,
                    right : `${props.Position && props.offsetRight &&   props.offsetRight - props.Position  +"px" }`}}>
            <div className={LS.LeftLabelImage} > </div>
            <div className={LS.LabelValue}> {props.EndTime && props.EndTime && props.EndTime } </div>
    </div>
}


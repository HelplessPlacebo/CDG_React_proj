import React from "react";
import LS from "./TimeSlider.module.css"
export type TLeftLabelProps = {
    Position : number | undefined
    StartTime : string | null | undefined
    offsetLeft : number | undefined,
}

export const LeftLabel :React.FC<TLeftLabelProps> = (props) =>{
    return <div className={LS.Label}
                style={{display : `${!props.StartTime &&  !props.Position ? "none" : "block" }`,
                    left : `${props.Position && props.offsetLeft 
                    && props.Position - props.offsetLeft +30 + "px"}` }}>
            <div className={LS.LabelImage} />
            <div className={LS.LabelValue}> {props.StartTime && props.StartTime && props.StartTime } </div>
    </div>
}


import React from "react";
import LS from "./TimeSlider.module.css"
export type TLeftLabelProps = {
    Position : number | undefined
    value : {
    end : string | null,
    start : string | null
    } | undefined
    offsetRight : number | undefined
}

const LeftLabel :React.FC<TLeftLabelProps> = (props) =>{

    return <div className={LS.RightLabel}
                style={{ display : `${!props.value && !props.Position ? "none" : "block" }`,
                    right : `${props.Position && props.offsetRight &&   props.offsetRight - props.Position  - 10 + "px" }`}}>
            <div className={LS.LeftLabelImage} > </div>
            <div className={LS.LabelValue}> {props.value && props.value.end && props.value.end } </div>
    </div>
}

export default LeftLabel

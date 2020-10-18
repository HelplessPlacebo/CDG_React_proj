import React from "react";
import LS from "./TimeSlider.module.css"
export type TLeftLabelProps = {
    Position : number | undefined
    value : {
    end : string | null,
    start : string | null
    } | undefined
    offsetLeft : number | undefined,
}

const RightLabel :React.FC<TLeftLabelProps> = (props) =>{

    return <div className={LS.LeftLabel}
                style={{display : `${!props.value &&  !props.Position ? "none" : "block" }`,
                    left : `${props.Position && props.offsetLeft 
                    && props.Position - props.offsetLeft +75 + "px"}` }}>
            <div className={LS.LeftLabelImage} > </div>
            <div className={LS.LabelValue}> {props.value && props.value.start && props.value.start } </div>
    </div>
}

export default RightLabel

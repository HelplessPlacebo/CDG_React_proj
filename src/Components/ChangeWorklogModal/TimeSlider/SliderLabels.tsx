import React, {Dispatch, useEffect} from "react";
import LS from "./TimeSlider.module.css"
export type TLeftLabelProps = {
    value : {
        end : string | null,
        start : string | null
    } | undefined
    SetValue : Dispatch<any>
    UpdateLabelsValue : ()=> void
}

const SliderLabels :React.FC<TLeftLabelProps> = (props) =>{

    useEffect(()=>{
        let Slider_handlers = document.querySelectorAll(".input-range__slider")
        let LeftLabel = document.createElement("div")
        LeftLabel.innerHTML = `
                                <div id="LeftSliderLabel" class=${LS.margin}
            <div class=${LS.LeftLabelImage}> </div>
            <div class=${LS.LAb}> ${props.value && props.value.start && props.value.start } </div>
    </div>`
        Slider_handlers[0].appendChild(LeftLabel)
        let RightLabel = document.createElement("div")
        RightLabel.innerHTML=`<div id="RightSliderLabel">   
                                    ${props.value && props.value.end}
                                </div>`
        Slider_handlers[1].appendChild(RightLabel)
        props.value && props.SetValue(props.value)
    },[])

    useEffect(() => {
            props.value && props.SetValue(props.value)
            props.UpdateLabelsValue()
        }, [props.value && props.value]
    );

    return <div> </div>
}

export default SliderLabels

import React, {useState, useEffect, Dispatch} from 'react';
//@ts-ignore
import TimeRangeSlider from 'react-time-range-slider';
import LeftLabel from "./SliderValueLeftLabel";
import RightLabel from "./SliderValueRightLabel";
import {findPosX} from "../../../assets/secondary/FindElementPose";
import ReactDOM from "react-dom"

export type TTimeSliderProps = {
    step: number
    maxValue?: string
    minValue?: string
    format?: number
    disabled: boolean
    value?: {
        start: string | null
        end: string | null
    }
    SetTimerValue : Dispatch<any>
}


const TimeSlider: React.FC<TTimeSliderProps> = (props) => {
    let [value, SetValue] = useState({
        start: props.value?.start ? props.value.start as string | null : "08:00",
        end: props.value?.end ? props.value.end as string | null : "22:00"
    })

    let [LeftPose,SetLeftPose] = useState<number>()
    let [RightPose,SetRightPose] = useState<number>()
    let [LeftOffset,SetLeftOffset] = useState<number>()
    let [RightOffset,SetRightOffset] = useState<number>()


    const TimerButtonsInit = ()=>{
        let slider = document.querySelectorAll(".input-range")
        let el =  document.querySelectorAll(".input-range__slider")
        // SetLeftPose(el[0].getBoundingClientRect())
        // SetRightPose(el[1].getBoundingClientRect())
        let SliderWidth = getComputedStyle(slider[0],null).width
        let SliderPoseStart = findPosX(slider[0])
        let SliderPoseEnd = SliderPoseStart + Number.parseInt(SliderWidth.substr(0,SliderWidth.length-2))
        let LeftMargin = findPosX(el[0])
        let RightMargin = findPosX(el[1])
        SetLeftOffset(SliderPoseStart)
        SetRightOffset(SliderPoseEnd)
        SetLeftPose(LeftMargin)
        SetRightPose(RightMargin)
    }

    useEffect(()=>{

        //ReactDOM.createPortal(<div>123</div>,document.querySelectorAll(".input-range__slider-container")[0])
    },[])

    useEffect(() => {
            props.value && SetValue(props.value)
             TimerButtonsInit()
        }, [props.value && props.value]
    );


    const changeStartHandler = (time: any) => {
        // console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time: any) => {
        TimerButtonsInit()
        SetValue(time)
    }

    const changeCompleteHandler = (time: any) => {
        TimerButtonsInit()
        props.SetTimerValue(value)
        SetValue(time)
        /* console.log("Complete Handler Called", time);*/
    }

    return (<>
        <TimeRangeSlider
            disabled={props.disabled}
            format={props.format ? props.format : 24}
            maxValue={props.maxValue ? props.maxValue : "18:59"}
            minValue={props.minValue ? props.minValue : "7:00"}
            name={"time_range"}
            onChangeStart={changeStartHandler}
            onChangeComplete={changeCompleteHandler}
            onChange={timeChangeHandler}
            step={props.step}
            value={value}/>
             <LeftLabel Position={LeftPose} offsetLeft={LeftOffset}  value={value} />
            <RightLabel Position={RightPose} value={value} offsetRight={RightOffset}/>
    </>);

}


export default TimeSlider
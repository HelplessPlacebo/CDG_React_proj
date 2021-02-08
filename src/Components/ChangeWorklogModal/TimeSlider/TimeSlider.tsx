import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
//@ts-ignore
import TimeRangeSlider from 'react-time-range-slider';
import {LeftLabel} from "./SliderValueLeftLabel";
import {RightLabel} from "./SliderValueRightLabel";
import {findPosX} from "../../../assets/secondary/FindElementPose";
import {TTimerValues} from "../ChangeWorklogModal";

export type TTimeSliderProps = {
    step: number
    maxValue?: string
    minValue?: string
    format?: number
    disabled?: boolean
    value: {
        start: string | null
        end: string | null
    }
    setTimerValues: Dispatch<SetStateAction<TTimerValues>>
}


export const TimeSlider: React.FC<TTimeSliderProps> = (props) => {
    const [LeftPose, SetLeftPose] = useState<number>()
    const [RightPose, SetRightPose] = useState<number>()
    const [LeftOffset, SetLeftOffset] = useState<number>()
    const [RightOffset, SetRightOffset] = useState<number>()


    const TimerButtonsInit = () => {
        // get slider
        let slider = document.querySelectorAll(".input-range")
        //get slider  handlers
        let el = document.querySelectorAll(".input-range__slider")
        // SetLeftPose(el[0].getBoundingClientRect())
        // SetRightPose(el[1].getBoundingClientRect())
        let SliderWidth = getComputedStyle(slider[0], null).width
        // slider start pose
        let SliderPoseStart = findPosX(slider[0])
        // get slider pose
        let SliderPoseEnd = SliderPoseStart + Number.parseInt(SliderWidth.substr(0, SliderWidth.length - 2))
        //get offsets  for left and right labels
        let LeftMargin = findPosX(el[0])
        let RightMargin = findPosX(el[1])
        SetLeftOffset(SliderPoseStart)
        SetRightOffset(SliderPoseEnd)
        SetLeftPose(LeftMargin)
        SetRightPose(RightMargin)
    }

    useEffect(() => {
             props.setTimerValues(props.value)
            TimerButtonsInit()
        }, [props.value]
    );


    const changeStartHandler = (time: any) => {
        // console.log("Start Handler Called", time);
    }

    const timeChangeHandler = (time: any) => {
        TimerButtonsInit()
       props.setTimerValues(time)
    }

    const changeCompleteHandler = (time: any) => {
        TimerButtonsInit()
        /* console.log("Complete Handler Called", time);*/
    }

    return (<>
        <TimeRangeSlider
            disabled={props.disabled}
            format={props.format ? props.format : 24}
            maxValue={props.maxValue ? props.maxValue : "23:59"}
            minValue={props.minValue ? props.minValue : "00:01"}
            name={"time_range"}
            onChangeStart={changeStartHandler}
            onChangeComplete={changeCompleteHandler}
            onChange={timeChangeHandler}
            step={props.step}
            value={props.value}/>

        <LeftLabel Position={LeftPose} offsetLeft={LeftOffset} StartTime={props.value?.start}/>
        <RightLabel Position={RightPose} EndTime={props.value?.end} offsetRight={RightOffset}/>
    </>);
}

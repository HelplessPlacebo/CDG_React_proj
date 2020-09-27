import React from "react";
import SS from "./WorkLogSlider.module.css"
import TimePickerLine from "../../../assets/imgs/separator-line.svg"

export type TWorklogInfoProps ={

}

const WorkLogTimeLine : React.FC<TWorklogInfoProps> = (props ) => {

    return ( <div className="WorkLogTimeLine">
            <div className={SS.TimePickerLine}>
                <img src={TimePickerLine} alt="separator-line"/>
            </div>
            <div className={SS.SliderTimesContainer}>
                <div className={SS.SliderTimes}>
                    <div>7:00</div>
                    <div>8:00</div>
                    <div>9:00</div>
                    <div>10:00</div>
                    <div>11:00</div>
                    <div>12:00</div>
                    <div>13:00</div>
                    <div>14:00</div>
                    <div>15:00</div>
                    <div>16:00</div>
                    <div>17:00</div>
                    <div>18:00</div>
                    <div>19:00</div>
                </div>
            </div>
        </div>

    )
}

export default WorkLogTimeLine
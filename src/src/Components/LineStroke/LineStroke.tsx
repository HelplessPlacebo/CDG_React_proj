import React from "react";
import LS from "./LineStroke.module.css"

export type TAllProps = {

}

const LineStroke : React.FC<TAllProps> = (props) => {
    return ( <div className={LS.lineStroke}> </div>)
}

export default LineStroke
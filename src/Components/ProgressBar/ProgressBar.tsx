import React from "react";
//@ts-ignore
import {Progress} from 'bootstrap-4-react';

export type TProgressBarProps = {
    status: "ok" | "danger" | "warning" | string
}

const ProgressBar: React.FC<TProgressBarProps> = (props) => {
    return (
        <React.Fragment>
            <Progress  style={{ width: "100px", height: "8px", borderRadius : "20px"}} >
                <Progress.Bar  min="0" max="100" now={props.status === "ok" ?
                    "90" : props.status === "warning"
                        ? "50" : props.status === "danger"
                            ? "25" : null}

                              bg={props.status === "ok" ?
                                  "success" : props.status === "warning"
                                      ? "warning" : props.status === "danger"
                                          ? "danger" : null}/>
            </Progress>
        </React.Fragment>
    )
}

export default ProgressBar
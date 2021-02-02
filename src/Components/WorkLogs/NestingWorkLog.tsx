import React from "react";
import {WorkLog,TWorklogProps} from "./WorkLog";

export const NestingWorkLog: React.FC<TWorklogProps> = (props) => {

    return <div className="NestedItem">

        {
            props.worklogInfo.NestingItems?.map(NestingItem =>
                <div key={NestingItem.id}>
                    <WorkLog {...props}
                             worklogInfo={NestingItem}
                             parentId={props.worklogInfo.id}
                    />
                </div>
            )
        }
    </div>
}

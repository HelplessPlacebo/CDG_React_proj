import React from "react";
import WorkLog, {TWorklogProps} from "./WorkLog";

const NestingWorkLog: React.FC<TWorklogProps> = (props) => {

    return <div className="NestedItem">

        {
            props.WorklogInfo.NestingItems?.map(NestingItem =>
                <div key={NestingItem.id}>
                    <WorkLog {...props}
                             WorklogInfo={NestingItem}
                             ParentId={props.WorklogInfo.id}
                    />
                </div>
            )
        }
    </div>
}

export default NestingWorkLog
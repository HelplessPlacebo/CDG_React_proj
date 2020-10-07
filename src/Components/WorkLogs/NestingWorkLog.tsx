import React from "react";
import {
    TAddToFavorite,
    TAddWorklog, TDeleteFromFavorites, TDeleteWorklog, TNestingItem,
    TSetIsPlayingWorklogById,
    TSetWorklogToChange, TTimerData,
    TWorkLog
} from "../../Data/WorkLogsReducer";
import {TComponentToDraw} from "./WorkLogsContainer";
import WorkLog from "./WorkLog";
import {TDeleteModalParams} from "./WorkLogsBlock";


export type TNestingWorkLogProps = {
    NestingItems?: Array<TNestingItem> | null
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    PlayingWorklog: TWorkLog | null
    ParentId?: number
    SetDeleteModalParams: any
    OnDeleteModalOpen: (e: React.MouseEvent<HTMLElement>) => void
    SetWorklogToChange: TSetWorklogToChange
    openWorklogChangeModal: () => void
    AddToFavorite: TAddToFavorite
    ComponentToDraw : TComponentToDraw
    AddWorklog : TAddWorklog
    OnDeleteModalClose: () => void
    DeleteModalIsOpen: boolean
    DeleteWorklog: TDeleteWorklog | TDeleteFromFavorites
    DeleteModalParams: TDeleteModalParams | undefined
    TimerData: TTimerData | undefined
    id : number
    IsFavorites : boolean
}

const NestingWorkLog: React.FC<TNestingWorkLogProps> = (props) => {

    return (<div className="NestedItem">
        {props.NestingItems?.map(NestingItem=>{
            return(
                <WorkLog {...props}
                        key={NestingItem.id}
                         StartTime={NestingItem.StartTime}
                         EndTime={NestingItem.EndTime}
                         JiraCode={NestingItem.JiraCode}
                         TaskField={NestingItem.TaskField}
                         TimerValue={NestingItem.TimerValue}
                         status={NestingItem.status}
                         id={NestingItem.id}
                         IsNesting={false}
                         ParentId={props.id}
                         IsFavorites={NestingItem.IsFavorites}
                         Issue={NestingItem.Issue}
                        />
            )})
        }
    </div>)
}

export default NestingWorkLog
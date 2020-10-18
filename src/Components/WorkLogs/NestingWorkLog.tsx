import React, {Dispatch, SetStateAction} from "react";
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
    id : number
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
    DeleteFromFavorites : TDeleteFromFavorites


    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: Dispatch<SetStateAction<TTimerData | undefined>>
}

const NestingWorkLog: React.FC<TNestingWorkLogProps> = (props) => {

    return (<div className="NestedItem">
        {props.NestingItems?.map(NestingItem=>{
            return(
                <WorkLog {...props}
                        key={NestingItem.id}
                         StartTime={NestingItem.StartTime}
                         EndTime={NestingItem.EndTime}
                         TaskField={NestingItem.TaskField}
                         TimerValue={NestingItem.TimerValue}
                         status={NestingItem.status}
                         id={NestingItem.id}
                         ParentId={props.id}
                         NestingItems={null}
                         Issue={NestingItem.Issue}
                         DeleteFromFavorites={props.DeleteFromFavorites}
                        />
            )})
        }
    </div>)
}

export default NestingWorkLog
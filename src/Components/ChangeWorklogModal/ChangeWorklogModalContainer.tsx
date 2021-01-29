import React from 'react'
import {useSelector} from "react-redux";
import ChangeWorklogModal from "./ChangeWorklogModal";
import {TTimerData} from "../../Redux/WorkLogsReducer";
import {getPlayingWorklog, getWorklogToChange} from "../Selectors/WorklogsSelectors";
import {getIssues} from "../Selectors/IssuesSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";

export type TModalWindowContainerProps = {
    closeWorklogChangeModal: () => void
    WorklogChangeModalIsOpen: boolean
    TimerData: TTimerData | undefined
    SetTimerData: (data: TTimerData | undefined) => void
}

const ChangeWorklogModalContainer: React.FC<TModalWindowContainerProps> = (props) => {

    const playingWorklog = useSelector(getPlayingWorklog)
    const worklogToChange = useSelector(getWorklogToChange)
    const issues = useSelector(getIssues)

    const WFS = useWorklogsFunctions()
    return <ChangeWorklogModal {...props}
                               WorklogToChange={worklogToChange} Issues={issues} PlayingWorklog={playingWorklog}
                               AddWorklog={WFS.addWorklog} SetIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                               SetWorklogToChange={WFS.setWorklogToChange} ChangeWorklog={WFS.changeWorklog}
                               ChangeFavoritesWorklog={WFS.changeFavoritesWorklog}/>
}

export default ChangeWorklogModalContainer
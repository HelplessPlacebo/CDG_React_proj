import React from 'react'
import {useSelector} from "react-redux";
import ChangeWorklogModal from "./ChangeWorklogModal";
import {TTimerData} from "../../Redux/WorkLogsReducer";
import {getPlayingWorklog, getWorklogToChange} from "../Selectors/WorklogsSelectors";
import {getIssues} from "../Selectors/IssuesSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";

export type TModalWindowContainerProps = {
    closeWorklogChangeModal: () => void
    worklogChangeModalIsOpen: boolean
    timerData: TTimerData | undefined
    setTimerData: (data: TTimerData | undefined) => void
}

const ChangeWorklogModalContainer: React.FC<TModalWindowContainerProps> = (props) => {

    const playingWorklog = useSelector(getPlayingWorklog)
    const worklogToChange = useSelector(getWorklogToChange)
    const issues = useSelector(getIssues)

    const WFS = useWorklogsFunctions()
    return <ChangeWorklogModal {...props}
                               worklogToChange={worklogToChange} issues={issues} playingWorklog={playingWorklog}
                               addWorklog={WFS.addWorklog} setIsPlayingWorklogById={WFS.setIsPlayingWorklogById}
                               setWorklogToChange={WFS.setWorklogToChange} changeWorklog={WFS.changeWorklog}
                               changeFavoritesWorklog={WFS.changeFavoritesWorklog}/>
}
export default ChangeWorklogModalContainer
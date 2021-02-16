import React, {useEffect, useState,} from "react"
import {TimeSlider} from "./TimeSlider/TimeSlider"
import Dialog from "@material-ui/core/Dialog/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent/DialogContent"
import Grid from "@material-ui/core/Grid/Grid"
import { TWorkLog} from "../../Redux/WorkLogsReducer";
import {ChangeWorklogModalReduxForm} from "./ChangeWorklogModalForm";
import {CalculateNewStartTime, ToFullTime} from "../../assets/secondary/CalculateTime";
import {parseTimeStr} from "../../assets/secondary/ParseTimeStr";
import {useSelector} from "react-redux";
import {getWorklogToChange} from "../../assets/utils/Selectors/WorklogsSelectors";
import {getIssues} from "../../assets/utils/Selectors/IssuesSelectors";
import {useWorklogsFunctions} from "../hooks/useWorklogsFunctions";


export type TTimerValues = {
    start: string | null
    end: string | null
}
type TChangeWorklogModalProps ={
    closeWorklogChangeModal: () => void
    worklogChangeModalIsOpen: boolean
}

const ChangeWorklogModal: React.FC<TChangeWorklogModalProps> = (props) => {
    const worklogToChange = useSelector(getWorklogToChange)
    const issues = useSelector(getIssues)

    const WFS = useWorklogsFunctions()

    const parsedTimerDate =  parseTimeStr(worklogToChange?.TimerValue ? worklogToChange.TimerValue : "00:00:00")
    const CurrentTime = ToFullTime(new Date().getHours()) + ":" + ToFullTime(new Date().getMinutes())
    const EmptyWorklogTimeValues = {
        start: CalculateNewStartTime(CurrentTime, String(parsedTimerDate.hours), String(parsedTimerDate.minutes)) as string | null,
        end: CurrentTime as string | null
    }

    const [timerValues, setTimerValues] = useState<TTimerValues>({
        start : "08:00",
        end : "22:00"
    })


    useEffect(() => {
            setTimerValues({
                end: worklogToChange?.EndTime ? worklogToChange?.EndTime as string | null : EmptyWorklogTimeValues.end,
                start: worklogToChange?.StartTime ? worklogToChange.StartTime  as string | null : EmptyWorklogTimeValues.start
            })
    }, [worklogToChange])


    const close = () => {
        props.closeWorklogChangeModal()
        WFS.setWorklogToChange(null)
        WFS.setIsPlayingWorklogById(false)
    }

    const handleSubmit = (FormData: TWorkLog | null) => {

        if (worklogToChange) {
            if (worklogToChange.IsFavorites) WFS.changeFavoritesWorklog(worklogToChange.id,
                {...worklogToChange, ...FormData, ...{StartTime: timerValues.start, EndTime: timerValues.end}})
            else WFS.changeWorklog({
                ...worklogToChange, ...FormData, ...{
                    StartTime: timerValues.start,
                    EndTime: timerValues.end
                }
            })
            WFS.setIsPlayingWorklogById(false, worklogToChange.id)
            close()
        }
    }


    if (!props.worklogChangeModalIsOpen) return null;

    return (
        <Dialog
            open={props.worklogChangeModalIsOpen}
            onClose={props.closeWorklogChangeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"New worklog"}</DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center">

                    <Grid item className="TimeSLider" style={{paddingTop: "10%"}}>
                        <TimeSlider value={timerValues} step={10} setTimerValues={setTimerValues}/>
                    </Grid>

                    <Grid item style={{paddingTop: "3rem"}} className="Inputs">
                        <ChangeWorklogModalReduxForm initialValues={worklogToChange}
                                                     onSubmit={handleSubmit} onClose={close} issues={issues}/>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>

    )
}

export default React.memo(ChangeWorklogModal, (prevProps, nextProps) => {
    if (prevProps.worklogChangeModalIsOpen !== nextProps.worklogChangeModalIsOpen) return false
    else return true
})


import React, {useState} from 'react'
import {connect} from "react-redux"
import MaterialNav from "./Components/NavBar/MaterialNavBar"
import {Redirect, Route, Switch} from "react-router-dom"
import AS from "./App.module.css"
import WorkLogsContainer from "./Components/WorkLogs/WorkLogsContainer"
import TimeTracking from "./Components/TimeTracking/TimeTracking"
import {GlobalState} from "./Data/redux-store"
import {
    SetIsPlayingWorklogById, ChangeWorklog,
    TWorkLog, TSetIsPlayingWorklogById, TChangeWorklog, TAddWorklog,
    AddWorklog, TTimerData, TAddToFavorite, AddToFavorite, TWorklogBlock
} from "./Data/WorkLogsReducer";
import CalendarAndControlButtons from "./Components/CalendarAndControllButtons/CalendarAndControlButtons"
import {TCurrentDate} from "./Data/CalendarReducer";
import {
    ChangeIssue, AddIssue, DeleteIssue, SetIssues, SetCompletedIssues,
    TAddIssue, TChangeIssue, TDeleteIssue, TSetIssues, TSetCompletedIssues
} from "./Data/IssuesReducer"
import {useBooleanState} from "./Components/hooks/useBooleanState"
import AuthPage from "./Components/Auth/AuthPage"
import SnackBar, {TSnackBarOptions} from "./Components/SnackBar/SnackBar"
import {withSuspense} from "./assets/utils/withSuspense/withSuspense"
import {PathErr} from "./Components/PathErrorPage/PathErr"
//////////////////////////// lazy loading ////////////////////////////////////////
const Issues = React.lazy(() => import("./Components/Issues/Issues"))
const Favorites = React.lazy(() => import("./Components/CalendarAndControllButtons/Favorites/FavoritesPage"))
const ChangeWorklogModalContainer = React.lazy(() => import("./Components/ChangeWorklogModal/ChangeWorklogModalContainer"))
const ModalUserProfile = React.lazy(() => import("./Components/UserProfile/ModalUserProfile"))
const SuspendedIssues = withSuspense(Issues)
const SuspendedFavorites = withSuspense(Favorites)
const SuspendedChangeWorklogModalContainer = withSuspense(ChangeWorklogModalContainer)
const SuspendedModalUserProfile = withSuspense(ModalUserProfile)
//////////////////////////// lazy loading ////////////////////////////////////////

export type TAppOwnProps = {}
export type T_MSTP_App = {
    PlayingWorklog: TWorkLog | null
    CurrentDate: TCurrentDate
    WorklogsBlocks: Array<TWorklogBlock>
    FavoritesWorklog: Array<TWorkLog>
    CompletedIssues: Array<string>
    Issues: string[]
}

export type T_MDTP_App = {
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    ChangeWorklog: TChangeWorklog
    AddWorklog: TAddWorklog
    AddToFavorite: TAddToFavorite
    AddIssue: TAddIssue
    DeleteIssue: TDeleteIssue
    ChangeIssue: TChangeIssue
    SetIssues: TSetIssues
    SetCompletedIssues: TSetCompletedIssues
}

export type TAppProps = T_MSTP_App & T_MDTP_App & TAppOwnProps
export type TShowSnackBar = (SnackBarOptions: TSnackBarOptions) => void

const App: React.FC<TAppProps> = (props) => {
    const [, setIsAuth] = useState<boolean | null>(null)
    const WorklogChangeModalIsOpen = useBooleanState(false)
    const FavoritesIsClicked = useBooleanState(false)
    const UserProfileIsShowing = useBooleanState(false)
    const [TimerData, SetTimerData] = useState<TTimerData | undefined>(undefined)
    const SnackBarState = useBooleanState(false)
    const [SnackBarOptions, SetSnackBarOptions] = useState<TSnackBarOptions>({
        message: "something goes wrong",
        HideDuration: 3000,
        position: {horizontal: "center", vertical: "bottom"},
        severity: "error"
    })

    const OnSetTimerData = (TimerData: TTimerData | undefined) => SetTimerData(TimerData)
    const onAuth = () => setIsAuth(true)
    const onUnAuth = () => setIsAuth(false)

    const ShowSnackBar = (SnackBarOptions: TSnackBarOptions) => {
        SnackBarState.isDisplayed && SnackBarState.Hide()
        SetSnackBarOptions(SnackBarOptions)
        SnackBarState.Show()
    }
    const HideSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        SnackBarState.Hide()
    }
    return (<div className="AppWrapper">

            {localStorage.getItem("IsAuth") === "true"
                ? <>
                    <MaterialNav OpenUserProfile={UserProfileIsShowing.Show} onUnAuth={onUnAuth}/>

                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/Home/All"}/>}/>
                        <Route exact path='/Issues'
                               render={() => <SuspendedIssues Issues={props.Issues}
                                                              AddIssue={props.AddIssue}
                                                              ChangeIssue={props.ChangeIssue}
                                                              DeleteIssue={props.DeleteIssue}
                                                              CompletedIssues={props.CompletedIssues}
                                                              SetIssues={props.SetIssues}
                                                              SetCompletedIssues={props.SetCompletedIssues}/>
                               }/>

                        <Route path='/Home'
                                render={() => <>
                                    <div className={AS.CalendarAndButtonsContainer}>
                                        <CalendarAndControlButtons
                                            FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                            OnAllClicked={FavoritesIsClicked.Hide}
                                            OnFavoritesClick={FavoritesIsClicked.Show}
                                            CurrentDate={props.CurrentDate}
                                        />
                                    </div>

                                    <div className={AS.MainWrapper}>
                                        <Switch>
                                            <Route exact path='/Home/All'
                                                   render={() => <WorkLogsContainer TimerData={TimerData}
                                                                                    openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                                                    ComponentToDraw={"Worklogs"}
                                                                                    ShowSnackBar={ShowSnackBar}
                                                                                    closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                                                                                    SetTimerData={OnSetTimerData}
                                                                                    WorklogChangeModalIsOpen={WorklogChangeModalIsOpen.isDisplayed}
                                                   />
                                                   }/>

                                            <Route exact path='/Home/Favorites'
                                                   render={() => <SuspendedFavorites
                                                       FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                       WorklogsBlocks={props.WorklogsBlocks}
                                                       openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                       TimerData={TimerData}
                                                       AddWorklog={props.AddWorklog}
                                                       PlayingWorklog={props.PlayingWorklog}
                                                       FavoritesWorklog={props.FavoritesWorklog}
                                                       SetTimerData={OnSetTimerData}
                                                       ShowSnackBar={ShowSnackBar}
                                                       closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                                                       WorklogChangeModalIsOpen={WorklogChangeModalIsOpen.isDisplayed}
                                                       ComponentToDraw="FavoritesWorklogs"
                                                   />}/>
                                            <Route component={PathErr}/>
                                        </Switch>

                                        <div className={AS.TImeTracking_and_Calendar}>
                                            <TimeTracking PlayingWorklog={props.PlayingWorklog}
                                                          FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                          SetIsPlayingWorklogById={props.SetIsPlayingWorklogById}
                                                          AddWorklog={props.AddWorklog}
                                                          SetTimerData={OnSetTimerData}
                                                          openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                          ChangeWorklog={props.ChangeWorklog}
                                                          Issues={props.Issues}
                                            />
                                        </div>

                                    </div>
                                </>
                                }
                        />
                        <Route component={PathErr}/>
                    </Switch>
                </>
                : <AuthPage onAuth={onAuth} onUnAuth={onUnAuth} ShowSnackBar={ShowSnackBar}/>
            }

            <SuspendedChangeWorklogModalContainer
                SetTimerData={OnSetTimerData}
                WorklogChangeModalIsOpen={WorklogChangeModalIsOpen.isDisplayed}
                closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                TimerData={TimerData}
                Issues={props.Issues}
            />

            <SuspendedModalUserProfile IsOpen={UserProfileIsShowing.isDisplayed}
                                       Hide={UserProfileIsShowing.Hide}/>

            <SnackBar isShowing={SnackBarState.isDisplayed} onHide={HideSnackBar} options={SnackBarOptions}/>
        </div>
    );
}


const MapStateToProps = (state: GlobalState): T_MSTP_App => ({
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    CurrentDate: state.CalendarData.CurrentDate,
    WorklogsBlocks: state.WorklogsData.WorkLogsBlocks,
    FavoritesWorklog: state.WorklogsData.FavoritesWorklogs,
    Issues: state.IssuesData.Issues,
    CompletedIssues: state.IssuesData.CompletedIssues
})

export default connect<T_MSTP_App, T_MDTP_App, TAppOwnProps, GlobalState>(MapStateToProps, {
    SetIsPlayingWorklogById, ChangeWorklog, AddWorklog, AddToFavorite,
    ChangeIssue, AddIssue, DeleteIssue, SetCompletedIssues, SetIssues
})(App)

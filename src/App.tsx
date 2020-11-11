import React, {useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import MaterialNav from "./Components/NavBar/MaterialNavBar";
import {Redirect, Route} from "react-router-dom";
import AS from "./App.module.css"
import WorkLogsContainer from "./Components/WorkLogs/WorkLogsContainer";
import TimeTracking from "./Components/TimeTracking/TimeTracking";
import {GlobalState} from "./Data/redux-store";
import {
    SetIsPlayingWorklogById, ChangeWorklog,
    TWorkLog, TSetIsPlayingWorklogById, TChangeWorklog, TAddWorklog,
    AddWorklog, TTimerData, TAddToFavorite, AddToFavorite, TWorklogBlock
} from "./Data/WorkLogsReducer";
import FavoritesPage from "./Components/Favorites/FavoritesPage";
import CalendarAndControlButtons from "./Components/CalendarAndControllButtons/CalendarAndControlButtons";
import {TCurrentDate} from "./Data/CalendarReducer";
import ChangeWorklogModalContainer from "./Components/ChangeWorklogModal/ChangeWorklogModalContainer";

import {
    ChangeIssue,
    AddIssue,
    DeleteIssue,
    SetIssues,
    SetCompletedIssues,
    TAddIssue,
    TChangeIssue,
    TDeleteIssue,
    TSetIssues, TSetCompletedIssues
} from "./Data/IssuesReducer";
import Issues from "./Components/Issues/Issues";
import {useBooleanState} from "./Components/hooks/useBooleanState";
import AuthPage from "./Components/Auth/AuthPage";
import SnackBar, {TSnackBarOptions} from "./Components/SnackBar/SnackBar";

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

    const WorklogChangeModalIsOpen = useBooleanState(false)
    let FavoritesIsClicked = useBooleanState(false)
    let [TimerData, SetTimerData] = useState<TTimerData | undefined>(undefined)
    let [SnackBarIsShowing, SetSnackBarIsShowing] = useState(false)
    let [SnackBarOptions, SetSnackBarOptions] = useState<TSnackBarOptions>({
        message: "something goes wrong",
        HideDuration: 3000,
        position: {horizontal: "center", vertical: "bottom"},
        severity: "error"
    })

    const OnSetTimerData = (TimerData: TTimerData) => {
        SetTimerData(TimerData)
    }

    const ShowSnackBar = (SnackBarOptions: TSnackBarOptions) => {
        SnackBarIsShowing && SetSnackBarIsShowing(false)
        SetSnackBarOptions(SnackBarOptions)
        SetSnackBarIsShowing(true)
    }

    const HideSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        SetSnackBarIsShowing(false);
    };

    return (<div className="AppWrapper">

            {localStorage.getItem("IsAuth") === "true"
                ? <>
                    <Route exact path='/'
                           render={() => <Redirect to={"/Home/All"}/>}/>

                    <div className="MainAppWrapper">
                        <MaterialNav/>

                        <Route exact path='/Issues'
                               render={() => <Issues Issues={props.Issues}
                                                     AddIssue={props.AddIssue}
                                                     ChangeIssue={props.ChangeIssue}
                                                     DeleteIssue={props.DeleteIssue}
                                                     CompletedIssues={props.CompletedIssues}
                                                     SetIssues={props.SetIssues}
                                                     SetCompletedIssues={props.SetCompletedIssues}
                               />}/>

                        <Route path='/Home'
                               render={() => <div className={AS.CalendarAndButtonsContainer}>
                                   <CalendarAndControlButtons FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                              OnAllClicked={FavoritesIsClicked.Hide}
                                                              OnFavoritesClick={FavoritesIsClicked.Show}
                                                              CurrentDate={props.CurrentDate}
                                   />
                               </div>}/>


                        <div className={AS.MainWrapper}>
                            <div className="WorklogsLayout">

                                <Route exact path='/Home/All'
                                       render={() => <div className="WorkLogBlock">
                                           <div className="Worklogs">
                                               <WorkLogsContainer TimerData={TimerData}
                                                                  openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                                  ComponentToDraw={"Worklogs"}
                                                                  ShowSnackBar={ShowSnackBar}
                                                                  closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                                                                  SetTimerData={SetTimerData}
                                                                  WorklogChangeModalIsOpen={WorklogChangeModalIsOpen.isDisplayed}
                                               />
                                           </div>
                                       </div>
                                       }/>

                                <Route exact path='/Home/Favorites'
                                       render={() => <FavoritesPage FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                                    WorklogsBlocks={props.WorklogsBlocks}
                                                                    openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                                    TimerData={TimerData}
                                                                    AddWorklog={props.AddWorklog}
                                                                    PlayingWorklog={props.PlayingWorklog}
                                                                    FavoritesWorklog={props.FavoritesWorklog}
                                       />}/>

                            </div>
                            <Route path='/Home'
                                   render={() => <div className={AS.TImeTracking_and_Calendar}>
                                       <TimeTracking PlayingWorklog={props.PlayingWorklog}
                                                     FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                     SetIsPlayingWorklogById={props.SetIsPlayingWorklogById}
                                                     AddWorklog={props.AddWorklog}
                                                     SetTimerData={OnSetTimerData}
                                                     openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                     ChangeWorklog={props.ChangeWorklog}
                                                     Issues={props.Issues}
                                       />
                                   </div>}/>
                        </div>
                        <ChangeWorklogModalContainer
                            SetTimerData={SetTimerData}
                            WorklogChangeModalIsOpen={WorklogChangeModalIsOpen.isDisplayed}
                            closeWorklogChangeModal={() => WorklogChangeModalIsOpen.Hide()}
                            TimerData={TimerData}
                            Issue={props.Issues}
                        />

                    </div>

                </>

                : <AuthPage ShowSnackBar={ShowSnackBar}/>

            }
            <SnackBar isShowing={SnackBarIsShowing} onHide={HideSnackBar} options={SnackBarOptions}/>
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

export default compose(
    connect<T_MSTP_App, T_MDTP_App, TAppOwnProps, GlobalState>(MapStateToProps, {
        SetIsPlayingWorklogById,
        ChangeWorklog, AddWorklog, AddToFavorite,
        ChangeIssue, AddIssue, DeleteIssue, SetCompletedIssues, SetIssues
    }))(App)

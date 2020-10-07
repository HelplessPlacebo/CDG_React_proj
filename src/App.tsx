import React, { useState} from 'react';
import AS from "./App.module.css"
import NavBar from "./Components/NavBar/NavBar";
import WorkLogsContainer from "./Components/WorkLogs/WorkLogsContainer";
import TimeTracking from "./Components/TimeTracking/TimeTracking";
import GoogleCalendar from "./Components/GoogleCalendar/GoogleCalendar";
import {compose} from "redux";
import {connect} from "react-redux";
import {GlobalState} from "./Data/redux-store";
import {
    SetIsPlayingWorklogById, ChangeWorklog,
    TWorkLog, TSetIsPlayingWorklogById, TChangeWorklog, TAddWorklog,
    AddWorklog, TTimerData, TAddToFavorite, AddToFavorite, TWorklogBlock
} from "./Data/WorkLogsReducer";
import {Redirect, Route} from "react-router-dom";
import FavoritesPage from "./Components/Favorites/FavoritesPage";
import CalendarAndControlButtons from "./Components/CalendarAndControllButtons/CalendarAndControlButtons";
import {TCurrentDate} from "./Data/CalendarReducer";
import ChangeWorklogModalContainer from "./Components/ModalWindow/ChangeWorklogModalContainer";
import LoginModal from "./Components/LoginPage/LoginModal";
import Tooltip from "./Components/Tooltip/Tooltip";



export type TAppOwnProps = {
}

export type T_MSTP_App = {
    PlayingWorklog: TWorkLog | null
    CurrentDate: TCurrentDate
    WorklogsBlocks: Array<TWorklogBlock>
}

export type T_MDTP_App = {
    SetIsPlayingWorklogById: TSetIsPlayingWorklogById
    ChangeWorklog: TChangeWorklog
    AddWorklog: TAddWorklog
    AddToFavorite : TAddToFavorite
}

export type TAppProps = T_MSTP_App & T_MDTP_App & TAppOwnProps

export type TTooltipInfo = {
    text: string
    status: "ok" | "warning" | "danger"
}
export type TShowTooltip = (TooltipInfo : TTooltipInfo) => void

const App: React.FC<TAppProps> = (props) => {




    let [WorklogChangeModalIsOpen, SetWorklogChangeModalIsOpen] = useState(false)
    let [FavoritesIsClicked, SetFavoritesIsClicked] = useState(false)
    let [TimerData, SetTimerData] = useState<TTimerData | undefined>(undefined)
    let [TooltipIsShowed,SetTooltipIsShowed] = useState(false)
    let [TooltipInfo,SetTooltipInfo] = useState<TTooltipInfo>()

    const OnSetTimerData = (TimerData: TTimerData) => {
        SetTimerData(TimerData)
    }

    const OnFavoritesClick = () => {
        SetFavoritesIsClicked(true)
    }
    const OnAllClicked = () => {
        SetFavoritesIsClicked(false)
    }

    const openWorklogChangeModal = () => {
        SetWorklogChangeModalIsOpen(true)
    }

    const closeWorklogChangeModal = () => {
        SetWorklogChangeModalIsOpen(false)
    }

    const showTooltip = (TooltipInfo : TTooltipInfo) =>{
        TooltipIsShowed && SetTooltipIsShowed(false)
        SetTooltipInfo(TooltipInfo)
        SetTooltipIsShowed(true)
    }

    const hideTooltip = () =>[
        SetTooltipIsShowed(false)
    ]

    return (<div className="AppWrapper">

            {localStorage.getItem("IsAuth") === "true"
                ? <>
                    <Route exact path='/'
                           render={() => <Redirect to={"/Home/All"}/>}/>

                    <div className="MainAppWrapper">
                        <NavBar/>

                        <div className={AS.CalendarAndButtonsContainer}>
                            <CalendarAndControlButtons FavoritesIsClicked={FavoritesIsClicked}
                                                       OnAllClicked={OnAllClicked}
                                                       OnFavoritesClick={OnFavoritesClick}
                                                       CurrentDate={props.CurrentDate}
                            />
                        </div>

                        <div className={AS.MainWrapper}>
                            <div className="WorklogsLayout">

                                <Route exact path='/Home/All'
                                       render={() => <div className="WorkLogBlock">
                                           <div className="Worklogs">
                                               <WorkLogsContainer TimerData={TimerData}
                                                                  openWorklogChangeModal={openWorklogChangeModal}
                                                                  ComponentToDraw={"Worklogs"}
                                                                  showTooltip={showTooltip}
                                               />
                                           </div>
                                       </div>
                                       }/>

                                <Route exact path='/Home/Favorites'
                                       render={() => <FavoritesPage FavoritesIsClicked={FavoritesIsClicked}
                                                                    WorklogsBlocks={props.WorklogsBlocks}
                                                                    openWorklogChangeModal={openWorklogChangeModal}
                                                                    TimerData={TimerData}
                                                                    AddWorklog={props.AddWorklog}
                                                                    PlayingWorklog={props.PlayingWorklog}
                                       />}/>

                            </div>
                            <div className={AS.TImeTracking_and_Calendar}>
                                <TimeTracking PlayingWorklog={props.PlayingWorklog}
                                              FavoritesIsClicked={FavoritesIsClicked}
                                              SetIsPlayingWorklogById={props.SetIsPlayingWorklogById}
                                              AddWorklog={props.AddWorklog}
                                              SetTimerData={OnSetTimerData}
                                              openWorklogChangeModal={openWorklogChangeModal}
                                              ChangeWorklog={props.ChangeWorklog}/>
                                <div className="GoogleCalendar">
                                    <GoogleCalendar/>
                                </div>
                            </div>
                        </div>

                        <ChangeWorklogModalContainer
                            SetTimerData={SetTimerData}
                            WorklogChangeModalIsOpen={WorklogChangeModalIsOpen}
                            closeWorklogChangeModal={() => closeWorklogChangeModal()}
                            TimerData={TimerData}
                        />
                        <Tooltip TooltipIsShowed={TooltipIsShowed} hideTooltil={hideTooltip} TooltipInfo={TooltipInfo}/>
                    </div>
                </>

                : <LoginModal/>

            }
        </div>
    );
}


const MapStateToProps = (state: GlobalState): T_MSTP_App => ({
    PlayingWorklog: state.WorklogsData.PlayingWorklog,
    CurrentDate: state.CalendarData.CurrentDate,
    WorklogsBlocks : state.WorklogsData.WorkLogsBlocks
})

export default compose(
    connect<T_MSTP_App, T_MDTP_App, TAppOwnProps, GlobalState>(MapStateToProps, {
        SetIsPlayingWorklogById,
        ChangeWorklog, AddWorklog,AddToFavorite
    }))(App)

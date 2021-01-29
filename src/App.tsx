import React, {useState} from 'react'
import MaterialNav from "./Components/NavBar/MaterialNavBar"
import {Redirect, Route, Switch} from "react-router-dom"
import AS from "./App.module.css"
import {WorklogsBlockContainer} from "./Components/WorkLogs/WorklogsBlockContainer"
import {TimeTracking} from "./Components/TimeTracking/TimeTracking"
import {TTimerData} from "./Redux/WorkLogsReducer"
import {useBooleanState} from "./Components/hooks/useBooleanState"
import {AuthPage} from "./Components/Auth/AuthPage"
import SnackBar, {TSnackBarOptions} from "./Components/SnackBar/SnackBar"
import {withSuspense} from "./Components/HOCs/withSuspense/withSuspense"
import {PathErr} from "./Components/PathErrorPage/PathErr"
import {CalendarAndControlButtons} from "./Components/CalendarAndControllButtons/CalendarAndControlButtons"

//////////////////////////// lazy loading ////////////////////////////////////////
const IssuesPage = React.lazy(() => import("./Components/Issues/IssuesPage"))
const Favorites = React.lazy(() => import("./Components/WorkLogs/FavoritesWorklogs"))
const ChangeWorklogModalContainer = React.lazy(() => import("./Components/ChangeWorklogModal/ChangeWorklogModalContainer"))
const ModalUserProfile = React.lazy(() => import("./Components/UserProfile/ModalUserProfile"))
const SuspendedIssuesPage = withSuspense(IssuesPage)
const SuspendedFavorites = withSuspense(Favorites)
const SuspendedChangeWorklogModalContainer = withSuspense(ChangeWorklogModalContainer)
const SuspendedModalUserProfile = withSuspense(ModalUserProfile)
//////////////////////////// lazy loading ////////////////////////////////////////


export type TShowSnackBar = (SnackBarOptions: TSnackBarOptions) => void

export const App = () => {

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
                               render={() => <SuspendedIssuesPage/>}/>

                        <Route path='/Home'
                               render={() => <>
                                   <div className={AS.CalendarAndButtonsContainer}>
                                       <CalendarAndControlButtons
                                           FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                           OnAllClicked={FavoritesIsClicked.Hide}
                                           OnFavoritesClick={FavoritesIsClicked.Show}
                                       />
                                   </div>

                                   <div className={AS.MainWrapper}>
                                       <Switch>
                                           <Route exact path='/Home/All'
                                                  render={() => <WorklogsBlockContainer TimerData={TimerData}
                                                                                        openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                                                        ComponentToDraw="Worklogs"
                                                                                        ShowSnackBar={ShowSnackBar}
                                                                                        closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                                                                                        SetTimerData={OnSetTimerData}
                                                  />
                                                  }/>

                                           <Route exact path='/Home/Favorites'
                                                  render={() => <SuspendedFavorites
                                                      openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
                                                      TimerData={TimerData}
                                                      SetTimerData={OnSetTimerData}
                                                      ShowSnackBar={ShowSnackBar}
                                                      closeWorklogChangeModal={WorklogChangeModalIsOpen.Hide}
                                                      ComponentToDraw="FavoritesWorklogs"
                                                  />}/>
                                           <Route component={PathErr}/>
                                       </Switch>

                                       <div className={AS.TImeTracking_and_Calendar}>
                                           <TimeTracking FavoritesIsClicked={FavoritesIsClicked.isDisplayed}
                                                         SetTimerData={OnSetTimerData}
                                                         openWorklogChangeModal={WorklogChangeModalIsOpen.Show}
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
            />

            <SuspendedModalUserProfile IsOpen={UserProfileIsShowing.isDisplayed}
                                       Hide={UserProfileIsShowing.Hide}/>

            <SnackBar isShowing={SnackBarState.isDisplayed} onHide={HideSnackBar} options={SnackBarOptions}/>
        </div>
    )
}


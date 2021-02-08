import React, {useState} from 'react'
import MaterialNav from "./Components/NavBar/MaterialNavBar"
import {Redirect, Route, Switch} from "react-router-dom"
import AS from "./App.module.css"
import {WorkLogsBlock} from "./Components/WorkLogs/WorkLogsBlock"
import {TimeTracking} from "./Components/TimeTracking/TimeTracking"
import {useBooleanState} from "./Components/hooks/useBooleanState"
import {AuthPage} from "./Components/Auth/AuthPage"
import SnackBar, {TSnackBarOptions} from "./Components/SnackBar/SnackBar"
import {withSuspense} from "./Components/HOCs/withSuspense/withSuspense"
import {PathErr} from "./Components/PathErrorPage/PathErr"
import {CalendarAndControlButtons} from "./Components/CalendarAndControllButtons/CalendarAndControlButtons"

//////////////////////////// lazy loading ////////////////////////////////////////
const Issues = React.lazy(() => import("./Components/Issues/Issues"))
const Favorites = React.lazy(() => import("./Components/WorkLogs/FavoritesWorklogs"))
const ChangeWorklogModalContainer = React.lazy(() => import("./Components/ChangeWorklogModal/ChangeWorklogModal"))
const ModalUserProfile = React.lazy(() => import("./Components/UserProfile/ModalUserProfile"))
const SuspendedIssues = withSuspense(Issues)
const SuspendedFavorites = withSuspense(Favorites)
const SuspendedChangeWorklogModalContainer = withSuspense(ChangeWorklogModalContainer)
const SuspendedModalUserProfile = withSuspense(ModalUserProfile)
//////////////////////////// lazy loading ////////////////////////////////////////


export type TShowSnackBar = (SnackBarOptions: TSnackBarOptions) => void

export const App = () => {

    const [, setIsAuth] = useState<boolean | null>(null)
    const worklogModalStatus = useBooleanState(false)
    const favoritesClickedStatus = useBooleanState(false)
    const userProfileClickedStatus = useBooleanState(false)
    const snackBarDisplayingStatus = useBooleanState(false)
    const [snackBarOptions, setSnackBarOptions] = useState<TSnackBarOptions>({
        message: "something goes wrong",
        HideDuration: 3000,
        position: {horizontal: "center", vertical: "bottom"},
        severity: "error"
    })

    const onAuth = () => setIsAuth(true)
    const onUnAuth = () => setIsAuth(false)

    const showSnackBar = (SnackBarOptions: TSnackBarOptions) => {
        snackBarDisplayingStatus.isDisplayed && snackBarDisplayingStatus.Hide()
        setSnackBarOptions(SnackBarOptions)
        snackBarDisplayingStatus.Show()
    }
    const hideSnackBar = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        snackBarDisplayingStatus.Hide()
    }


    return (<div className="AppWrapper">

            {localStorage.getItem("IsAuth") === "true"
                ? <>
                    <MaterialNav openUserProfile={userProfileClickedStatus.Show} onUnAuth={onUnAuth}/>

                    <Switch>
                        <Route exact path='/' render={() => <Redirect to={"/Home/All"}/>}/>
                        <Route exact path='/Issues'
                               render={() => <SuspendedIssues/>}/>

                        <Route path='/Home'
                               render={() => <>
                                   <div className={AS.CalendarAndButtonsContainer}>
                                       <CalendarAndControlButtons
                                           favoritesIsClicked={favoritesClickedStatus.isDisplayed}
                                           onAllClicked={favoritesClickedStatus.Hide}
                                           onFavoritesClick={favoritesClickedStatus.Show}
                                       />
                                   </div>

                                   <div className={AS.MainWrapper}>
                                       <Switch>
                                           <Route exact path='/Home/All'
                                                  render={() => <WorkLogsBlock
                                                      openWorklogChangeModal={worklogModalStatus.Show}
                                                      componentToDraw="Worklogs"
                                                      showSnackBar={showSnackBar}
                                                      closeWorklogChangeModal={worklogModalStatus.Hide}
                                                  />
                                                  }/>

                                           <Route exact path='/Home/Favorites'
                                                  render={() => <SuspendedFavorites
                                                      openWorklogChangeModal={worklogModalStatus.Show}
                                                      showSnackBar={showSnackBar}
                                                      closeWorklogChangeModal={worklogModalStatus.Hide}
                                                      componentToDraw="FavoritesWorklogs"
                                                  />}/>
                                           <Route component={PathErr}/>
                                       </Switch>

                                       <div className={AS.TImeTracking_and_Calendar}>
                                           <TimeTracking favoritesIsClicked={worklogModalStatus.isDisplayed}
                                                         openWorklogChangeModal={worklogModalStatus.Show}
                                           />
                                       </div>

                                   </div>
                               </>
                               }
                        />
                        <Route component={PathErr}/>
                    </Switch>
                </>
                : <AuthPage onAuth={onAuth} onUnAuth={onUnAuth} showSnackBar={showSnackBar}/>
            }

            <SuspendedChangeWorklogModalContainer
                worklogChangeModalIsOpen={worklogModalStatus.isDisplayed}
                closeWorklogChangeModal={worklogModalStatus.Hide}
            />

            <SuspendedModalUserProfile isOpen={userProfileClickedStatus.isDisplayed}
                                       hide={userProfileClickedStatus.Hide}/>

            <SnackBar isShowing={snackBarDisplayingStatus.isDisplayed}
                      onHide={hideSnackBar} options={snackBarOptions}/>
        </div>
    )
}


import React,{useState,useContext} from "react";
const EditWorklogContext = React.createContext()


export const EditWorklogProvider = (children ) =>{
    let [TimerData,SetTimerData] = useState()
    let [TimerIsActive,SetTimerIsActive] = useState(false)

    const OnShowTimer = () =>{
        SetTimerIsActive(true)
    }
    const onHideTimer = () =>{
        SetTimerIsActive(false)
    }

    return(
        <EditWorklogContext.Provider value={{
            TimerData,
            SetTimerData,
            TimerIsActive,
            OnShowTimer,
            onHideTimer
        }

        }>
            {children}
        </EditWorklogContext.Provider>
    )
}


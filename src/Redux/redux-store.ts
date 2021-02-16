import { combineReducers, createStore, applyMiddleware} from "redux"
import {calendarReducer} from "./CalendarReducer";
import {worklogsReducer} from "./WorkLogsReducer"
import {reducer as formReducer} from "redux-form"
import  thunkMiddleWare from "redux-thunk"
import {issuesReducer} from "./IssuesReducer";
import {profileReducer} from "./ProfileReducer"

let reducers = combineReducers({
 form : formReducer,
 CalendarData : calendarReducer,
 WorklogsData  : worklogsReducer,
 IssuesData : issuesReducer,
 ProfileData : profileReducer
})

type Treducers = typeof reducers

export type GlobalState = ReturnType<Treducers>

const store = createStore(reducers,applyMiddleware(thunkMiddleWare))

//@ts-ignore
window.store = store
export default store

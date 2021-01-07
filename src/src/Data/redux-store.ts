import { combineReducers, createStore, applyMiddleware} from "redux"
import CalendarReducer from "./CalendarReducer";
import WorkLogsReducer from "./WorkLogsReducer"
import {reducer as formReducer} from "redux-form"
import  thunkMiddleWare from "redux-thunk"
import IssuesReducer from "./IssuesReducer";

let reducers = combineReducers({
 form : formReducer,
 CalendarData : CalendarReducer,
 WorklogsData  : WorkLogsReducer,
 IssuesData : IssuesReducer
})

type Treducers = typeof reducers

export type GlobalState = ReturnType<Treducers>

const store = createStore(reducers,applyMiddleware(thunkMiddleWare))

//@ts-ignore
window.store = store
export default store

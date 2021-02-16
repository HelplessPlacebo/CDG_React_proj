import {GlobalState} from "../../../Redux/redux-store";

export const getCalendar = (state : GlobalState) => state.CalendarData.Calendar
export const getCurrentDate = (state : GlobalState) => state.CalendarData.CurrentDate
export const getClickedMonthDay = (state : GlobalState) => state.CalendarData.ClickedMonthDay

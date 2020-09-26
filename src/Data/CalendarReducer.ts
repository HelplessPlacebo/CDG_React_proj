import {randomInteger} from "./WorkLogsReducer";


const SET_CLICKED_MONTH_DAYS = 'CALENDAR/SET_CLICKED_MONTH_DAYS'
const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const GetCurrentDate = (): TCurrentDate => {
    let date = new Date()
    let currentyear = date.getFullYear()
    let currentmonth = months[date.getMonth()]
    let currentday = date.getDate()

    let CurrentDate: TCurrentDate = {
        CurrentYear: currentyear,
        //@ts-ignore
        CurrentMonth: currentmonth,
        CurrentDay: currentday
    }
    return CurrentDate

}


const RandomStatus = (arr: Array<any>) => {
    if (arr.length <= 0) {
        throw new RangeError("getRandom: more elements taken than available");
    }
    let rand = Math.floor(Math.random() * arr.length)
    return arr[rand]
}


const RandomDaysCreate = (statuses: Array<string> = [], IntroDaysCount: number, OutroDaysCount: number, DaysCount: number) => {
    let MaxDaysLength = 35
    let OutArr: Array<TDay> = []
    let IntroDaysArr: Array<TDay> = []
    let OutroDaysArr: Array<TDay> = []
    let DaysArr: Array<TDay> = []

    if (IntroDaysCount + OutroDaysCount + DaysCount > MaxDaysLength) {
        throw new RangeError(`getRandom: maximum of days it  a ${MaxDaysLength}, please, enter the correct all days counts `);
    } else {

        for (let j = 1; j <= IntroDaysCount; j++) {
            IntroDaysArr.push({
                Signature: "intro",
                DayNumber: j,
                DayStatus: RandomStatus(statuses),
                id: randomInteger(0, 10000)
            })
        }
        for (let n = 1; n <= DaysCount; n++) {
            DaysArr.push({
                Signature: "main",
                DayNumber: n,
                DayStatus: RandomStatus(statuses),
                id: randomInteger(0, 10000)
            })
        }
        for (let p = 1; p <= OutroDaysCount; p++) {
            OutroDaysArr.push({
                Signature: "outro",
                DayNumber: p,
                DayStatus: RandomStatus(statuses),
                id: randomInteger(0, 10000)
            })
        }
        OutArr.push(...IntroDaysArr)
        OutArr.push(...DaysArr)
        OutArr.push(...OutroDaysArr)
        return OutArr
    }
}


export type TDay = {
    Signature: string
    DayNumber: number
    DayStatus: string
    id: number
}

export  type TCalendar = Array<TDay>

export type TCalendars = {
    January: TCalendar
    February: TCalendar
    March: TCalendar
    April: TCalendar
    May: TCalendar
    June: TCalendar
    July: TCalendar
    August: TCalendar
    September: TCalendar
    October: TCalendar
    November: TCalendar
    December: TCalendar
}
export type TClickedDay = {
    id: number,
    DayNumber: string | number
    MonthName: string
} | null

export type TCurrentDate = {
    CurrentYear: number | string
    CurrentMonth: keyof typeof DefaultState.Calendars
    CurrentDay: number | string
}


let DefaultState = {
    Calendars: {
        January: RandomDaysCreate(["ok", "danger", "warning"], 2, 3, 30),
        February: RandomDaysCreate(["ok", "danger", "warning"], 4, 1, 30),
        March: RandomDaysCreate(["ok", "danger", "warning"], 1, 4, 30),
        April: RandomDaysCreate(["ok", "danger", "warning"], 3, 2, 30),
        May: RandomDaysCreate(["ok", "danger", "warning"], 3, 2, 30),
        June: RandomDaysCreate(["ok", "danger", "warning"], 2, 3, 30),
        July: RandomDaysCreate(["ok", "danger", "warning"], 4, 1, 30),
        August: RandomDaysCreate(["ok", "danger", "warning"], 3, 2, 30),
        September: RandomDaysCreate(["ok", "danger", "warning"], 3, 2, 30),
        October: RandomDaysCreate(["ok", "danger", "warning"], 1, 3, 31),
        November: RandomDaysCreate(["ok", "danger", "warning"], 2, 3, 30),
        December: RandomDaysCreate(["ok", "danger", "warning"], 2, 2, 31)
    } as TCalendars,
    ClickedMonthDay: null as TClickedDay,
    CurrentDate: GetCurrentDate() as TCurrentDate
}

type  DefaultTilesState = typeof DefaultState


type TTilesReducerActions = ReturnType<TSetClickedMonthDay>

const CalendarReducer = (state = DefaultState, action: TTilesReducerActions): DefaultTilesState => {

    switch (action.type) {
        case SET_CLICKED_MONTH_DAYS : {
            return {
                ...state,
                ClickedMonthDay: action.Day
            }
        }
        default :
            return state
    }
}

export const SetClickedMonthDay = (Day: TClickedDay) => {
    return {type: SET_CLICKED_MONTH_DAYS, Day} as const
}
export type TSetClickedMonthDay = typeof SetClickedMonthDay

export default CalendarReducer
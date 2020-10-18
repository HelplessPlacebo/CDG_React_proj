import {TCurrentDate} from "../../Data/CalendarReducer";
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const GetCurrentDate = (): TCurrentDate => {
    let date = new Date()
    let CurrentYear = date.getFullYear()
    let CurrentMonth = months[date.getMonth()]
    let CurrentDay = date.getDate()
    let DayName = days[ date.getDay() ];

    let CurrentDate: TCurrentDate = {
        DayName,
        CurrentYear,
        //@ts-ignore
        CurrentMonth,
        CurrentDay
    }
    return CurrentDate

}

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const months = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const GetCurrentDate = () => {
    let date = new Date()
    let CurrentYear = date.getFullYear()
    let CurrentMonth = months[date.getMonth()]
    let CurrentDay = date.getDate()
    let DayName = days[ date.getDay() ];

    return {
        DayName,
        CurrentYear,
        CurrentMonth,
        CurrentDay
    }
}

export const ToFullTime = (value, hours) => {
    if (typeof value === "string") {
        let Numbered = Number.parseInt(value)
        if (Numbered < 10) {
            return "0" + Numbered
        } else return value
    } else if (typeof value === "number") {
        if (value < 10) {
            return "0" + value
        } else return value
    }
}

export const CalculateNewStartTime = (CurrentTime, hours, minutes) => {
    if (CurrentTime && hours && minutes) {
        let [CurrentHours, CurrentMinutes] = [...CurrentTime.split(":")]
        CurrentHours = Number.parseInt(CurrentHours)
        CurrentMinutes = Number.parseInt(CurrentMinutes)

        if (CurrentHours <= 0) {
            CurrentHours = CurrentHours + 24
        }
        if (CurrentMinutes < minutes) {
            CurrentMinutes = CurrentMinutes + 60
            CurrentHours = CurrentHours - 1
        }
        return `${ToFullTime(CurrentHours - hours) === 24 ? "00" : ToFullTime(CurrentHours - hours)}:${ToFullTime(CurrentMinutes - minutes)}`
    }
}


export const CalculateTime = (CurrentTime, hours, minutes) => {
    if (CurrentTime && hours && minutes) {
        let HoursAndMinutes = CurrentTime.split(":")
        let Res = ToFullTime(Number.parseInt(hours) + Number.parseInt(HoursAndMinutes[0]))
            +
            ":"
            + ToFullTime(Number.parseInt(minutes) + Number.parseInt(HoursAndMinutes[1]))

        return Res
    }
}
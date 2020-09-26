export const ParseNormalDate = (arr = []) => {
    let res = arr.map(el => {
        if (el === "now") {
            let date = new Date
            let hours = date.getHours().toString()
            if (Number.parseInt(hours) < 10) {
                hours = "0" + date.getHours().toString()
            }
            let minutes = date.getMinutes().toString()
            if (Number.parseInt(minutes) < 10) {
                minutes = "0" + date.getMinutes().toString()
            }
            return hours + ":" + minutes

        } else {
            if (el.substr(4, 2) === "am" || el.substr(5, 2) === "am") {
                if (el.substr(5, 2) === "am") {
                    return el.substr(0, 5)
                } else {
                    return "0" + el.substr(0, 4)
                }
            } else if (el.substr(4, 2) === "pm" || el.substr(5, 2) === "pm") {
                if (el.substr(5, 2) === "pm") {
                    return el.substr(0, 5)
                }
                let Pindex = el.substr(0, 1)
                return (Number.parseInt(Pindex) + 12).toString() + el.substr(1, 3)

            }

        }
    })
    return res
}
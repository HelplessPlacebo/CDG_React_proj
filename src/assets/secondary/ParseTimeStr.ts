export const parseTimeStr = (str : string,separator = ":")=>{
    const splittedStr = str.split(separator)
    return {
        hours : Number(splittedStr[0]),
        minutes : Number(splittedStr[1]),
        seconds : Number(splittedStr[2])
    }
}
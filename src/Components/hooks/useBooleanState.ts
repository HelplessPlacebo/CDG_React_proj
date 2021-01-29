import {useState} from "react"

type defFunc = ()=> void

export const useBooleanState = (initialValue : boolean) : {isDisplayed : boolean,Show : defFunc,Hide : defFunc,Switch : defFunc}  => {
    let [isDisplayed,SetIsOpen] =useState(initialValue)
    const Show = ()=>SetIsOpen(true)
    const Hide = ()=>SetIsOpen(false)
    const Switch = ()=> SetIsOpen(!isDisplayed)
    return {isDisplayed,Show,Hide,Switch}
}

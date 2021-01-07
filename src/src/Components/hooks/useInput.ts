import {useState, ChangeEvent} from "react"

type defFunc = () => void

export const useInput = (initialValue: string): {
    bind: {
        value: string,
        onChange: (e: ChangeEvent<HTMLInputElement>) => void
    },
    value: string,
    clear: defFunc,
    forceUpdate: (val: string) => void
} => {

    let [value, setValue] = useState(initialValue)


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const clear = () => {
        setValue("")
    }

    const forceUpdate = (val: string) => {
        setValue(val)
    }
    return {
        bind: {value, onChange},
        value,
        clear,
        forceUpdate
    }
}

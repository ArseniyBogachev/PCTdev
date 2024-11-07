import { ReactNode } from "react"

type DataSelect = {
    id: number
    name: string | ReactNode
    other_name?: any
}

type PropsSelect = {
    id?: number
    data: DataSelect[]
    state: number
    setState: Function
    defaultOpt?: {
        value: number
        selected: boolean
        disabled: boolean
        text: string
    } | undefined
    label?: string
    mainStyle?: {}
}


export {
    PropsSelect,
}
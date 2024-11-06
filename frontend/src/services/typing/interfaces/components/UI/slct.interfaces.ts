import { ReactNode } from "react"

type DataSelect = {
    id: number
    name: string | ReactNode
}

type PropsSelect = {
    id?: number
    data: DataSelect[]
    state: number
    setState: Function
    defaultOpt?: string
    label?: string
    mainStyle?: {}
}


export {
    PropsSelect,
}
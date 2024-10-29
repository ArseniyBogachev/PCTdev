import { ReactNode } from "react"

type DataSelect = {
    id: number
    text: string | ReactNode
}

type PropsSelect = {
    data: DataSelect[]
    currentItem: number
    label?: string
    mainStyle?: {}
}


export {
    PropsSelect,
}
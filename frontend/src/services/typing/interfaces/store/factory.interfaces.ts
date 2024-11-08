
import { PropsSearch } from "../components/UI/search.interfaces";


type Factory = {
    [k: string]: string

    name: string
    phone: string
    email: string
    fio: string
    registration_number: string
}

type ItemListFactory = Factory & {id: number}

type ListFactory = ItemListFactory[] 

type SetItemFactory = {
    name: string
    value: string
}

type ChkBx = {
    id: number
    state: boolean
    setState: Function
}

type Search = {
    show: boolean
    value: string
}

type FactorySlct = {
    list: {
        id: number
        name: string
    }[]
    current: number | null
}

type FactoryState = {
    [k: string]: Search | boolean | ChkBx[] | ListFactory | Factory | FactorySlct

    newFactory: Factory
    listFactory: ListFactory
    listChkBx: ChkBx[]
    allChkBx: boolean
    searchId: Search
    searchPhone: Search
    factorySlct: FactorySlct
}

export {
    PropsSearch,
    ItemListFactory,
    SetItemFactory,
    FactoryState,
    Factory,
    ListFactory,
    ChkBx
}
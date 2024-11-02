
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

type FactoryState = {
    newFactory: Factory
    listFactory: ListFactory
    listChkBx: ChkBx[]
    allChkBx: boolean
}

export {
    ItemListFactory,
    SetItemFactory,
    FactoryState,
    Factory,
    ListFactory,
    ChkBx
}
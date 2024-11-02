
type Factory = {
    [k: string]: string

    name: string
    phone: string
    email: string
    fio: string
    registration_number: string
}

type ListFactory = Factory & {id: number} | undefined[]

type SetItemFactory = {
    name: string
    value: string
}

type FactoryState = {
    newFactory: Factory
    listFactory: ListFactory
}

export {
    SetItemFactory,
    FactoryState,
    Factory,
    ListFactory
}
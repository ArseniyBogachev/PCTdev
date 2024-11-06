
type User = {
    email: string
    fio: string
    id: number
    inn: string
    is_staff: boolean
    is_superuser: boolean
    organization: string
    phone: string
}

type ItemListUser = {
    email: string
    fio: string
    inn: string
    organization: string
    phone: string
    order: []
}

type ChkBx = {
    id: number
    state: boolean
    setState: Function
}

type Factory = {
    id: number
    list: string[]
    count: number
    state: boolean
    setState: Function
}

type Slct = {
    list: {
        id: number
        name: string
    }[]
    current: number | null
}

type Search = {
    show: boolean
    value: string
}

type UserState = {
    user: User | undefined
    listUser: ItemListUser[]
    listChkBx: ChkBx[]
    allChkBx: boolean
    listFactory: Factory[]
    orgSlct: Slct
    emailSlct: Slct
    searchFactory: Search
}

export {
    UserState,
    User,
    ItemListUser,
    ChkBx,
    Factory
}
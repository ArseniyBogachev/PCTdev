
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

type UserState = {
    user: User | undefined
}

export {
    UserState,
    User
}
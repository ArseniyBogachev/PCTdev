
type Navigate = {
    url: string
    props?: {}
}

type RegisterData = {
    email: string,
    phone: string,
    fio: string,
    organization: string,
    inn: string,
    password: string,
}

type RegisterParam = {
    nav: Navigate,
    extra?: any
}

export {
    Navigate,
    RegisterData,
    RegisterParam
}
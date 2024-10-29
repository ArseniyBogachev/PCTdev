
type BtnAdd = {
    valueAdd?: any
    actionAdd?: Function
    text: string
}

type BtnDel = {
    valueDel?: any
    actionDel?: Function
    text: string
}

type PropsHeaderBtn = {
    add?: BtnAdd
    del?: BtnDel
}

export {
    PropsHeaderBtn,
}
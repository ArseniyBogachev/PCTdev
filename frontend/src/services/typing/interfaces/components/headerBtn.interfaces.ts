
type BtnAdd = {
    valueAdd?: any
    actionAdd?: Function
}

type BtnDel = {
    valueDel?: any
    actionDel?: Function
}

type PropsHeaderBtn = {
    add?: BtnAdd
    del?: BtnDel
}

export {
    PropsHeaderBtn,
}
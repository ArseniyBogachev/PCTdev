
type BtnOne = {
    valueOne?: any
    actionOne?: Function
    textOne: string
    afterOne?: React.ReactElement
    clsStyleOne?: string | Function
}

type BtnTwo = {
    valueTwo?: any
    actionTwo?: Function
    textTwo: string
    afterTwo?: React.ReactElement
    clsStyleTwo?: string | Function
}

type PropsHeaderBtn = {
    one?: BtnOne
    two?: BtnTwo
}

export {
    PropsHeaderBtn,
}
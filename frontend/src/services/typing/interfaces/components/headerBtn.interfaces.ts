
// type BtnOne = {
//     valueOne?: any
//     actionOne?: Function
//     textOne: string
//     afterOne?: React.ReactElement
//     clsStyleOne?: string | Function
//     delOne?: boolean
// }

// type BtnTwo = {
//     valueTwo?: any
//     actionTwo?: Function
//     textTwo: string
//     afterTwo?: React.ReactElement
//     clsStyleTwo?: string | Function
//     delTwo?: boolean
// }

// type PropsHeaderBtn = {
//     one?: BtnOne
//     two?: BtnTwo
// }

type Btn = {
    value?: any
    action?: Function
    text: string
    after?: React.ReactElement | string
    clsStyle?: string | Function
}

type PropsHeaderBtn = {
    data: Btn[]
}

export {
    PropsHeaderBtn,
}
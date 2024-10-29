
import { sizeModal } from "../../../typeVar/styles"

type Button = {
    text: string
    after?: any
}

type PropsMdl = {
    show: boolean,
    setShow: Function
    sizeModal: sizeModal
    title: string
    Body: React.FunctionComponent
    btnLeft: Button
    btnRight: Button
    bodyH: string
    bodyW: string
}

export {
    PropsMdl,
}
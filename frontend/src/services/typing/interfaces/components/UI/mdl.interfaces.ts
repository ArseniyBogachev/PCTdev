
import { sizeModal } from "../../../typeVar/styles"

type Button = {
    text: string
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
}

export {
    PropsMdl,
}

import { textAlign } from "../../../typeVar/styles"


type HeadTable = {
    list: any[]
}

type FilterTable = {
    list: any[]
}

type BodyTable = {
    list: any[]
}

type DataTable = {
    head: HeadTable[]
    filter?: FilterTable
    body: BodyTable[]
}

type TotalStyle = {
    bsPrefix?: string
    striped?: boolean | string
    bordered?: boolean
    borderless?: boolean
    hover?: boolean
    size?: string
    variant?: string
    responsive?: string | boolean
}

type HeadStyle = {
    headBColor?: string
    headColor?: string
    headHorizontallyAlign?: textAlign
}

type BodyStyle = {
    bodyHorizontallyAlign: textAlign
}

type PropsTable = {
    data: DataTable
    totalStyle: TotalStyle,
    headStyle?: HeadStyle
    bodyStyle?: BodyStyle
}


export {
    PropsTable,
}
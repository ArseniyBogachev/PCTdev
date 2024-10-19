
type HeadTable = {
    list: any[]
}

type BodyTable = {
    list: any[]
}

type DataTable = {
    head: HeadTable[]
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
}

type PropsTable = {
    data: DataTable
    totalStyle: TotalStyle,
    headStyle: HeadStyle
}


export {
    DataTable,
    PropsTable,
    TotalStyle
}
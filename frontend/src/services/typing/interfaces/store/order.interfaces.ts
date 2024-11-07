
import { PropsDropdownList } from "../components/UI/dropdownList.interfaces";
import { PropsSelect } from "../components/UI/slct.interfaces";
import { PropsDownload } from "../components/UI/download.interfaces";
import { PropsEditDataInpt } from "../components/UI/editDateInpt.interfaces";


type OrderAdmin = {
    id: number
    customer: string
    factory: string
    // исправить status
    status: string
    receiving_order: Date
    shipping_date: Date
    accepted_factory: Date
    xml: string
    quantity_product: {
        product: number
        quantity: number
    }[]
}

type OrderUser = {
    id: number
    customer: string
    factory: string
    status: string
    creator_at: Date
    last_update: Date
    company: string
}

type XML = {
    file: string | undefined
    name: string | undefined
    size: number | undefined
}

type NewOrder = {
    // [k: string]: number | BinaryData

    xml: XML
    factory: number | undefined
    quantityProduct: {
        // id: number
        product: number | undefined
        quantity: number | undefined
    }[]
}

type ProductFactory = {
    product: {
        id: number
        name: string
    }[]
    factory: {
        id: number
        name: string
    }[]
}

type ChkBx = {
    id: number
    state: boolean
    setState: Function
}

type Search = {
    show: boolean
    value: string
}

type Slct = {
    list: {
        id: number
        name: string
        other_name?: any 
    }[]
    current: number | null
}

type OrderState = {
    [k: string]: any

    newOrder: NewOrder
    listProductFactory: ProductFactory
    listOrderAdmin: OrderAdmin[]
    listOrderUser: OrderUser[]
    listChkBx: ChkBx[]
    listDropdown: PropsDropdownList[]
    listSlct: PropsSelect[]
    listFile: PropsDownload[]
    listDateOrder: PropsEditDataInpt[]
    listDateShipping: PropsEditDataInpt[]
    listDateFactory: PropsEditDataInpt[]
    allChkBx: boolean
    searchId: Search
    factorySlct: Slct
    statusSlct: Slct
}

export {
    PropsEditDataInpt,
    PropsDropdownList,
    ProductFactory,
    OrderState,
    NewOrder,
    OrderAdmin,
    OrderUser,
    ChkBx,
    PropsSelect,
    PropsDownload,
    XML
}
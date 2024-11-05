
type OrderAdmin = {
    id: number
    customer: string
    factory: string
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

type NewOrder = {
    // [k: string]: number | BinaryData

    xml: string | undefined
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

type

type OrderState = {
    newOrder: NewOrder
    listProductFactory: ProductFactory
    listOrderAdmin: OrderAdmin[]
    listChkBx: ChkBx[]
}

export {
    ProductFactory,
    OrderState,
    NewOrder,
    OrderAdmin,
    ChkBx
}
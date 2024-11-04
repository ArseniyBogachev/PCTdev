
type Product = {
    id: number
    article_number: string
    name: string
    size: string
}

type ChkBx = {
    id: number
    state: boolean
    setState: Function
}

type ProductState = {
    listProduct: Product[]
    listChkBx: ChkBx[]
    allChkBx: boolean
}
export {
    ChkBx,
    Product,
    ProductState,
}
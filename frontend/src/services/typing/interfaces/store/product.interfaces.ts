
type Product = {
    [k: string]: string | number

    id?: number
    article_number: string
    name: string
    size: string
}

type SetNewProduct = {
    name: string
    value: string
}

type ChkBx = {
    id: number
    state: boolean
    setState: Function
}

type Slct = {
    id: number,
    data: {id: number, name: string, other: boolean}[],
    state: number,
    setState: Function
}

type ProductState = {
    newProduct: Product
    listProduct: Product[]
    listChkBx: ChkBx[]
    allChkBx: boolean,
    listStatusSlct: Slct[]
}

export {
    SetNewProduct,
    ChkBx,
    Product,
    ProductState,
    Slct
}
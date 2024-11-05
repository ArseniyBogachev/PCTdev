
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderState, ProductFactory, OrderAdmin, ChkBx } from "../../typing/interfaces/store/order.interfaces";


const orderState: OrderState = {
    newOrder: {
        xml: undefined,
        factory: undefined,
        quantityProduct: [{
            // id: 1,
            product: undefined,
            quantity: undefined
        }]
    },
    listProductFactory: {
        product: [],
        factory: []
    },
    listOrderAdmin: [],
    listChkBx: [],
    listDropdown: []
}

export const orderSlice = createSlice({
        name: 'factory',
        initialState: orderState,
        reducers: {
            setListOrderAdmin (state: OrderState, action: PayloadAction<OrderAdmin[]>) {
                state.listOrderAdmin = action.payload
            },
            setListProductFactory (state: OrderState, action: PayloadAction<ProductFactory>) {
                state.listProductFactory = action.payload
            },
            setNewOrderFactory (state: OrderState, action: PayloadAction<number | undefined>) {
                state.newOrder.factory = action.payload
            },
            setNewOrderProduct (state: OrderState, action: PayloadAction<{index: number, product: number}>) {
                state.newOrder.quantityProduct[action.payload.index].product = action.payload.product
            },
            setNewOrderQuantity (state: OrderState, action: PayloadAction<{index: number, quantity: number}>) {
                state.newOrder.quantityProduct[action.payload.index].quantity = action.payload.quantity
            },
            addQuantityProduct (state: OrderState, action: PayloadAction<{
                id: number
                product: number | undefined
                quantity: number | undefined
            }>) {
                state.newOrder.quantityProduct = [...state.newOrder.quantityProduct, action.payload]
            },
            setNewOrderXML (state: OrderState, action: PayloadAction<any>) {
                state.newOrder.xml = action.payload
            },
            setListChkBx (state: OrderState, action: PayloadAction<ChkBx[]>) {
                state.listChkBx = action.payload
            },
            detailSetListChkBx (state: OrderState, action: PayloadAction<number>) {
                state.listChkBx = state.listChkBx.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            },
            setListDropdown (state: OrderState, action: PayloadAction<ChkBx[]>) {
                state.listChkBx = action.payload
            },
        }
    }
)
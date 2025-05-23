
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { OrderState, ProductFactory, OrderAdmin, ChkBx, PropsDropdownList, PropsSelect, PropsDownload, PropsEditDataInpt, OrderUser, XML } from "../../typing/interfaces/store/order.interfaces";


const orderState: OrderState = {
    newOrder: {
        xml: {
            file: undefined,
            name: undefined,
            size: undefined
        },
        factory: undefined,
        quantityProduct: [{
            product: undefined,
            quantity: undefined
        }]
    },
    listProductFactory: {
        product: [],
        factory: []
    },
    listOrderAdmin: [],
    listOrderUser: [],
    listChkBx: [],
    listDropdown: [{
        id: 0,
        count: 1,
        list: ['Не найдено'],
        state: false,
        setState: () => {}
    }],
    listSlct: [],
    listFile: [],
    listDateOrder: [],
    listDateShipping: [],
    listDateFactory: [],
    allChkBx: false,
    searchId: {
        show: false,
        value: '',
    },
    factorySlct: {
        list: [],
        current: null
    },
    statusSlct: {
        list: [],
        current: null
    },
    listShippingDate: [],
    listAcceptedFactory: []
}

export const orderSlice = createSlice({
        name: 'factory',
        initialState: orderState,
        reducers: {
            setListDate (state: OrderState, action: PayloadAction<{date: string, list: { id: number, text: string, cls: string }[]}>) {
                state[action.payload.date] = action.payload.list;
            },
            setSlct (state: OrderState, action: PayloadAction<{select: string, list?: { id: number, name: string, other_name?: any }[] | undefined, current?: number | undefined}>) {
                if (action.payload.list) {
                    state[action.payload.select].list = action.payload.list;
                };
                if (action.payload.current) {
                    state[action.payload.select].current = action.payload.current;
                };
            },
            setSearch (state: OrderState, action: PayloadAction<{value?: string | undefined}>) {
                if (typeof action.payload.value === 'string') {
                    state.searchId.value = action.payload.value
                }
                else {
                    state.searchId.show = !state.searchId.show
                }
            },
            cleanNewOrder (state: OrderState, action: PayloadAction<undefined>) {
                state.newOrder = {
                    xml: {
                        file: undefined,
                        name: undefined,
                        size: undefined
                    },
                    factory: undefined,
                    quantityProduct: [{
                        product: undefined,
                        quantity: undefined
                    }]
                };
            },
            cleanState (state: OrderState, action: PayloadAction<undefined>) {
                state.newOrder = {
                    xml: {
                        file: undefined,
                        name: undefined,
                        size: undefined
                    },
                    factory: undefined,
                    quantityProduct: [{
                        product: undefined,
                        quantity: undefined
                    }]
                };
                state.listProductFactory = {
                    product: [],
                    factory: []
                };
                state.listOrderAdmin = [];
                state.listOrderUser = [];
                state.listChkBx = [];
                state.listDropdown = [{
                    id: 0,
                    count: 1,
                    list: ['Не найдено'],
                    state: false,
                    setState: () => {}
                }];
                state.listSlct = [];
                state.listFile = [];
                state.listDateOrder = [];
                state.listDateShipping = [];
                state.listDateFactory = [];
                state.allChkBx = false;
            },
            setListOrderAdmin (state: OrderState, action: PayloadAction<OrderAdmin[]>) {
                state.listOrderAdmin = action.payload
            },
            setListOrderUser (state: OrderState, action: PayloadAction<OrderUser[]>) {
                state.listOrderUser = action.payload
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
            setNewOrderXML (state: OrderState, action: PayloadAction<XML>) {
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
            setListDropdown (state: OrderState, action: PayloadAction<PropsDropdownList[]>) {
                state.listDropdown = action.payload
            },
            setStateDropdown (state: OrderState, action: PayloadAction<number>) {
                state.listDropdown = state.listDropdown.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            },
            setListSlct (state: OrderState, action: PayloadAction<PropsSelect[]>) {
                state.listSlct = action.payload
            },
            detailSetListSlct (state: OrderState, action: PayloadAction<{id: number, value: number}>) {
                state.listSlct = state.listSlct.map(item => {
                    if (item.id === action.payload.id) {
                        item.state = action.payload.value
                    }
                    return item
                })
            },
            setListFile (state: OrderState, action: PayloadAction<PropsDownload[]>) {
                state.listFile = action.payload
            },
            setListDateOrder (state: OrderState, action: PayloadAction<PropsEditDataInpt[]>) {
                state.listDateOrder = action.payload
            },
            detailSetListDateOrder (state: OrderState, action: PayloadAction<number>) {
                state.listDateOrder = state.listDateOrder.map(item => {
                    if (item.id === action.payload) {
                        item.state = true;
                    }
                    return item
                })
            },
            setListDateShipping (state: OrderState, action: PayloadAction<PropsEditDataInpt[]>) {
                state.listDateShipping = action.payload
            },
            detailSetListDateShipping (state: OrderState, action: PayloadAction<{id: number, value?: string | undefined, text?: string | undefined}>) {
                state.listDateShipping = state.listDateShipping.map(item => {
                    if (item.id === action.payload.id) {
                        if (action.payload.value) {
                            item.value = action.payload.value
                            item.text = action.payload.text
                            item.state = false
                        }
                        else {
                            item.state = true;
                        }
                    }
                    return item
                })
            },
            setListDateFactory (state: OrderState, action: PayloadAction<PropsEditDataInpt[]>) {
                state.listDateFactory = action.payload
            },
            detailSetListDateFactory (state: OrderState, action: PayloadAction<{id: number, value?: string | undefined, text?: string | undefined}>) {
                state.listDateFactory = state.listDateFactory.map(item => {
                    if (item.id === action.payload.id) {
                        if (action.payload.value) {
                            item.value = action.payload.value
                            item.text = action.payload.text
                            item.state = false
                        }
                        else {
                            item.state = true;
                        }
                    }
                    return item
                })
            },
            allSetListChkBx (state: OrderState, action: PayloadAction<undefined>) {
                if (state.allChkBx) {
                    state.listChkBx = state.listChkBx.map(item => {
                        item.state = false;
                        state.allChkBx = false;
                        return item;
                    });
                }
                else {
                    state.listChkBx = state.listChkBx.map(item => {
                        item.state = true;
                        state.allChkBx = true;
                        return item;
                    });
                }
            },
        }
    }
)
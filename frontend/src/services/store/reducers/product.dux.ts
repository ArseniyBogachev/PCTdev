
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductState, Product, ChkBx, SetNewProduct } from "../../typing/interfaces/store/product.interfaces";


const productState: ProductState = {
    newProduct: {
        article_number: '',
        name: '',
        size: '',
    },
    listProduct: [],
    listChkBx: [],
    allChkBx: false
}

export const productSlice = createSlice({
        name: 'factory',
        initialState: productState,
        reducers: {
            setNewProduct (state: ProductState, action: PayloadAction<SetNewProduct>) {
                state.newProduct[action.payload.name] = action.payload.value
            },
            cleanNewProduct (state: ProductState, action: PayloadAction<undefined>) {
                state.newProduct = {
                    article_number: '',
                    name: '',
                    size: '',
                }
            },
            cleanState (state: ProductState, action: PayloadAction<undefined>) {
                state.listProduct = [];
                state.listChkBx = [];
                state.allChkBx = false;
            },
            setListProduct (state: ProductState, action: PayloadAction<Product[]>) {
                state.listProduct = action.payload
            },
            setListChkBx (state: ProductState, action: PayloadAction<ChkBx[]>) {
                state.listChkBx = action.payload
            },
            detailSetListChkBx (state: ProductState, action: PayloadAction<number>) {
                state.listChkBx = state.listChkBx.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            },
            allSetListChkBx (state: ProductState, action: PayloadAction<undefined>) {
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
            }
        }
    }
)
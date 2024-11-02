
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FactoryState, Factory, SetItemFactory, ListFactory } from "../../typing/interfaces/store/factory.interfaces";
import { getFactoryApi } from "../../api/factory";


const factoryState: FactoryState = {
    newFactory: {
        name: '',
        phone: '',
        email: '',
        fio: '',
        registration_number: '',
    },
    listFactory: []
}

export const factorySlice = createSlice({
        name: 'factory',
        initialState: factoryState,
        reducers: {
            setItemFactory (state: FactoryState, action: PayloadAction<SetItemFactory>) {
                state.newFactory[action.payload.name] = action.payload.value
            },
            setListFactory (state: FactoryState, action: PayloadAction<ListFactory>) {
                state.listFactory = action.payload
            }
        }
    }
)
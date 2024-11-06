
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FactoryState, Factory, SetItemFactory, ListFactory, ItemListFactory, ChkBx, PropsSearch } from "../../typing/interfaces/store/factory.interfaces";


const factoryState: FactoryState = {
    newFactory: {
        name: '',
        phone: '',
        email: '',
        fio: '',
        registration_number: '',
    },
    listFactory: [],
    listChkBx: [],
    allChkBx: false,
    searchId: {
        show: false,
        value: '',
    },
    searchPhone: {
        show: false,
        value: '',
    }
}

export const factorySlice = createSlice({
        name: 'factory',
        initialState: factoryState,
        reducers: {
            setSearch (state: FactoryState, action: PayloadAction<{search: string, value?: string | undefined}>) {
                if (action.payload.search === 'id') {
                    if (typeof action.payload.value === 'string') {
                        state.searchId.value = action.payload.value
                    }
                    else {
                        state.searchId.show = !state.searchId.show
                    }
                }
                else if (action.payload.search === 'phone') {
                    if (typeof action.payload.value === 'string') {
                        state.searchPhone.value = action.payload.value
                    }
                    else {
                        state.searchPhone.show = !state.searchPhone.show
                    }
                }
            },
            cleanState (state: FactoryState, action: PayloadAction<undefined>) {
                state.newFactory = {
                    name: '',
                    phone: '',
                    email: '',
                    fio: '',
                    registration_number: '',
                };
                state.listFactory = [];
                state.listChkBx = [];
                state.allChkBx = false;
            },
            setItemFactory (state: FactoryState, action: PayloadAction<SetItemFactory>) {
                state.newFactory[action.payload.name] = action.payload.value
            },
            cleanItemFactory (state: FactoryState, action: PayloadAction<undefined>) {
                state.newFactory = {
                    name: '',
                    phone: '',
                    email: '',
                    fio: '',
                    registration_number: '',
                }
            },
            setListFactory (state: FactoryState, action: PayloadAction<ListFactory>) {
                state.listFactory = action.payload
            },
            setListChkBx (state: FactoryState, action: PayloadAction<ChkBx[]>) {
                state.listChkBx = action.payload
            },
            detailSetListChkBx (state: FactoryState, action: PayloadAction<number>) {
                state.listChkBx = state.listChkBx.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            },
            allSetListChkBx (state: FactoryState, action: PayloadAction<undefined>) {
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
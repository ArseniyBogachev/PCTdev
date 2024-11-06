
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User, ItemListUser, ChkBx, Factory } from "../../typing/interfaces/store/user.interfaces";


const userState: UserState = {
    user: undefined,
    listUser: [],
    listChkBx: [],
    allChkBx: false,
    listFactory: [],
    orgSlct: {
        list: [],
        current: null
    },
    emailSlct: {
        list: [],
        current: null
    },
    searchFactory: {
        show: false,
        value: '',
    },
}

export const userSlice = createSlice({
        name: 'user',
        initialState: userState,
        reducers: {
            setSearch (state: UserState, action: PayloadAction<{value?: string | undefined}>) {
                if (typeof action.payload.value === 'string') {
                    state.searchFactory.value = action.payload.value
                }
                else {
                    state.searchFactory.show = !state.searchFactory.show
                }
            },
            setOrgSlct (state: UserState, action: PayloadAction<{list?: [] | undefined, current?: number | undefined}>) {
                if (action.payload.list) {
                    state.orgSlct.list = action.payload.list;
                };
                if (action.payload.current) {
                    console.log('action.payload.current', action.payload.current)
                    state.orgSlct.current = action.payload.current;
                };
            },
            setEmailSlct (state: UserState, action: PayloadAction<{list?: [] | undefined, current?: number | undefined}>) {
                if (action.payload.list) {
                    state.emailSlct.list = action.payload.list;
                };
                if (action.payload.current) {
                    console.log('action.payload.current', action.payload.current)
                    state.emailSlct.current = action.payload.current;
                };
            },
            cleanState (state: UserState, action: PayloadAction<undefined>) {
                state.listUser = [];
                state.listChkBx = [];
                state.allChkBx = false;
                state.listFactory = [];
            },
            write (state: UserState, action: PayloadAction<User | undefined>) {
                state.user = action.payload
            },
            setListUser (state: UserState, action: PayloadAction<ItemListUser[]>) {
                state.listUser = action.payload
            },
            setListChkBx (state: UserState, action: PayloadAction<ChkBx[]>) {
                state.listChkBx = action.payload
            },
            detailSetListChkBx (state: UserState, action: PayloadAction<number>) {
                state.listChkBx = state.listChkBx.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            },
            allSetListChkBx (state: UserState, action: PayloadAction<undefined>) {
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
            setListFactory (state: UserState, action: PayloadAction<Factory[]>) {
                state.listFactory = action.payload
            },
            detailSetListFactory (state: UserState, action: PayloadAction<number>) {
                state.listFactory = state.listFactory.map(item => {
                    if (item.id === action.payload) {
                        item.state = !item.state
                    }
                    return item
                })
            }
        }
    }
)

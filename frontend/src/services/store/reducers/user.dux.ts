
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User, ItemListUser, ChkBx, Factory } from "../../typing/interfaces/store/user.interfaces";


const userState: UserState = {
    user: undefined,
    listUser: [],
    listChkBx: [],
    allChkBx: false,
    listFactory: []
}

export const userSlice = createSlice({
        name: 'user',
        initialState: userState,
        reducers: {
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

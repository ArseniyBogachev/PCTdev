
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "../../typing/interfaces/store/user.interfaces";


const userState: UserState = {
    user: undefined
}

export const userSlice = createSlice({
        name: 'user',
        initialState: userState,
        reducers: {
            write (state: UserState, action: PayloadAction<User>) {
                state.user = action.payload
            },
        }
    }
)

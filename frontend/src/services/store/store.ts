
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { generalSlice }  from "./reducers/general.dux";
import {userSlice} from "./reducers/user.dux";
import { factorySlice } from "./reducers/factory.dux";


const general = generalSlice.reducer
const user = userSlice.reducer
const factory = factorySlice.reducer

const rootReducer = combineReducers({
    general,
    user,
    factory
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

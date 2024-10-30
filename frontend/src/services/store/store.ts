
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/general.dux";


const rootReducer = combineReducers({
    reducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { generalSlice }  from "./reducers/general.dux";
import { userSlice } from "./reducers/user.dux";
import { factorySlice } from "./reducers/factory.dux";
import { productSlice } from "./reducers/product.dux";
import { orderSlice } from "./reducers/order.dux";


const general = generalSlice.reducer;
const user = userSlice.reducer;
const factory = factorySlice.reducer;
const product = productSlice.reducer
const order = orderSlice.reducer

const rootReducer = combineReducers({
    general,
    user,
    factory,
    product,
    order
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

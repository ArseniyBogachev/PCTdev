
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState, GeneralNotification } from "../../typing/interfaces/store/general.interfaces";
import Notification from "../../../components/UI/Notification";

const generalState: GeneralState = {
    notification: [
        Notification(
            type: 'fixed',
            mainText: '123',
            extraText: '123',
            totalStyle: 'access',
            lvl:"lvl1",
            close: true
        )
    ]
}

export const generalSlice = createSlice({
        name: 'general',
        initialState: generalState,
        reducers: {
            addNotification: (state: GeneralState, action: PayloadAction<GeneralNotification>) => {
                state.notification = [...state.notification, action.payload]
            }
        }
    }
)

export default generalSlice.reducer

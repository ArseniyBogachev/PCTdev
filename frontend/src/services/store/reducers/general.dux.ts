
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeneralState, GeneralNotification } from "../../typing/interfaces/store/general.interfaces";


const generalState: GeneralState = {
    listNotification: [],
    currentNotification: false,
    loading: false,
    // listMenu: []
}

export const generalSlice = createSlice({
        name: 'general',
        initialState: generalState,
        reducers: {
            addListNotification (state: GeneralState, action: PayloadAction<GeneralNotification>) {
                state.listNotification = [...state.listNotification, action.payload]

                if (state.listNotification.length === 1) {
                    state.currentNotification = state.listNotification[0]
                }
            },
            delListNotification (state: GeneralState, action: PayloadAction<number>) {
                state.listNotification.splice(action.payload, 1)
                state.currentNotification = state.listNotification[0]
            },
            setCurrentNotification (state: GeneralState, action: PayloadAction<GeneralNotification | boolean>) {
                if (!state.currentNotification || !action.payload) {
                    state.currentNotification = action.payload
                }
            },
            setLoading (state: GeneralState, action: PayloadAction<boolean>) {
                state.loading = action.payload
            }
        }
    }
)

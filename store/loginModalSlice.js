import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
    name: "loginModalSlice",
    initialState: {
        isOpen: false,
    },
    reducers: {
        onOpen: (state) => {
            state.isOpen =true;
        },
        onClose: (state) => {
            state.isOpen = false
        }
    }
})

export const { onClose, onOpen } = loginModalSlice.actions


export default loginModalSlice.reducer
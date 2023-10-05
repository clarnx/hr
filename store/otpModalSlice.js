import { createSlice } from "@reduxjs/toolkit";

export const otpModalSlice = createSlice({
    name: "otpModalSlice",
    initialState: {
        isOpen: false,
        phone_number: "",
        isRegister: false,
        otp: ""
    },
    reducers: {
        onOpen: (state, action) => {
            state.isOpen =true;
            state.phone_number = action.payload.phone_number;
            state.isRegister = action.payload.isRegister;
            state.otp = action.payload.otp
        },
        onClose: (state) => {
            state.isOpen = false
        },
        updateOtp: (state, action) => {
            state.otp = action.payload.otp;
        },
        clearOtp: (state, action) => {
            state.otp = "";
            state.phone_number = "";
            state.isRegister = false;
            state.isOpen = false;
        }
    }
})

export const { onClose, onOpen, updateOtp, clearOtp } = otpModalSlice.actions


export default otpModalSlice.reducer
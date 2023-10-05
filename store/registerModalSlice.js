import { createSlice } from "@reduxjs/toolkit";

export const registerModalSlice = createSlice({
  name: "registerModalSlice",
  initialState: {
    isOpen: false,
    email: "",
    phone_number: "",
  },
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;

      console.log(action);

      if (action.payload) {
        state.phone_number = action.payload.phone_number
      }
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = registerModalSlice.actions;

export default registerModalSlice.reducer;

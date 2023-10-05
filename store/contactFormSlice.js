import { createSlice } from "@reduxjs/toolkit";

export const contactForm = createSlice({
  name: "contactForm",
  initialState: {
    isOpen: false,
    name: "",
    phone_number: "",
    msg: "",
    email: ""
},
  reducers: {
    onOpen: (state, action) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = contactForm.actions;

export default contactForm.reducer;

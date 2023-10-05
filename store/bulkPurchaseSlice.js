
import { createSlice } from "@reduxjs/toolkit";

export const bulkPurchase = createSlice({
  name: "bulkPurchase",
  initialState: {
    isOpen: false,
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

export const { onClose, onOpen } = bulkPurchase.actions;

export default bulkPurchase.reducer;

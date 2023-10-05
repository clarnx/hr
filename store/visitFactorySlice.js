
import { createSlice } from "@reduxjs/toolkit";

export const visitFactory = createSlice({
  name: "visitFactory",
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

export const { onClose, onOpen } = visitFactory.actions;

export default visitFactory.reducer;

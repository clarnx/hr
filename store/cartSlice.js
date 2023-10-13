import { createSlice } from "@reduxjs/toolkit";
import { getDiscountPrice, loadStateFromLocalStorage } from "../libs/helper";
import { clearUnusedLocalStorage, storeStateToLocal } from "../libs/helper";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadStateFromLocalStorage() || [],
    totalDiscount: 0,
    isFastDelivery: false,
    giftDiscount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((p) => p.id === action.payload.id);

      if (item) {
        item.quantity++;
        item.attributes.selling_price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      console.log("state.cartItems -->", state.cartItems.length)
      let items = state.cartItems.map((i) => {
        let modifiedItem = JSON.parse(JSON.stringify(i));
        
        let item = { ...modifiedItem}
        return item;
      })
      storeStateToLocal(items);
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.attributes.selling_price = p.oneQuantityPrice * action.payload.val;
          }

          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });

      storeStateToLocal(state.cartItems);
    },
    removeFromCart: (state, action) => {
      // Remove item from the cart
      state.cartItems = state.cartItems.filter((p) => p.id !== action.payload.id);

      // Update local storage after removal
      storeStateToLocal(state.cartItems);

      // Optionally, clear unused data from local storage
      clearUnusedLocalStorage();
    },
    clearCart: (state, action) => {
      // Clear the cart
      state.cartItems = [];

      // Update local storage after clearing
      storeStateToLocal(state.cartItems);

      // Optionally, clear unused data from local storage
      clearUnusedLocalStorage();
    },
    
    addCouponDiscount: (state, action) => {

      
      state.cartItems = action.payload.updatedCartItems;

      state.totalDiscount = action.payload.totalDiscount;
      state.giftDiscount = 0;
     
      storeStateToLocal(state.cartItems);
    },

    updateFastDelivery: (state) => {
      state.isFastDelivery = !state.isFastDelivery;
    },

    addGiftDiscount: (state, action) => {
      state.giftDiscount = action.payload.discount;
    },
  },
});

export const { addToCart, updateCart, removeFromCart, clearCart, addCouponDiscount, updateFastDelivery, addGiftDiscount} = cartSlice.actions;

export default cartSlice.reducer;

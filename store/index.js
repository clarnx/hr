import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from "./loginModalSlice"
import registerModalReducer from "./registerModalSlice"
import cartSlice from './cartSlice'
import otpModalSlice from './otpModalSlice'
import contactFormSlice from './contactFormSlice'
import bulkPurchaseSlice from './bulkPurchaseSlice'
import visitFactorySlice, { visitFactory } from './visitFactorySlice'

export default configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: registerModalReducer,
    cart: cartSlice,
    otpModal: otpModalSlice,
    contactForm: contactFormSlice,
    bulkPurchase: bulkPurchaseSlice,
    visitFactory: visitFactorySlice,

  },
})
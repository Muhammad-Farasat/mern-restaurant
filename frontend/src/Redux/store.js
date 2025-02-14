import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderSlice,
  },
});

export default store;

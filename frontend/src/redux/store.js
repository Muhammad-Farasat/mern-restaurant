import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderSlice from "./orderSlice";
import foodSlice from "./foodSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderSlice,
    food: foodSlice
  },
});

export default store;

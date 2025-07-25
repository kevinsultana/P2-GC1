import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../feature/productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

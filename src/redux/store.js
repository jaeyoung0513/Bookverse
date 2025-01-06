import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import bookReducer from "./bookSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    bookList: bookReducer,
    cart: cartReducer,
  },
});

export default store;

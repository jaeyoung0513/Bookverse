import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import bookReducer from "./bookSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";


const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    bookList: bookReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;

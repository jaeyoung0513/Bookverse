import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfoSlice";
import bookReducer from "./bookSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    bookList: bookReducer,
  },
});

export default store;

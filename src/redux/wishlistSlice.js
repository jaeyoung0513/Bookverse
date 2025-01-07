import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // 빈 배열로 초기화
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    setWishList: (state, action) => {
      state.items = action.payload; // 초기 데이터 한 번에 설정
    },
  },
});

export const { addToWishList, removeFromWishList, setWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [], // 초기 찜 목록 상태
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishList: (state, action) => {
      state.wishlist = action.payload; // 서버에서 받은 찜 목록 저장
    },
    addToWishList: (state, action) => {
      state.wishlist.push(action.payload); // 찜 목록에 추가
    },
    removeFromWishList: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      ); // 찜 목록에서 제거
    },
  },
});

export const { setWishList, addToWishList, removeFromWishList } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

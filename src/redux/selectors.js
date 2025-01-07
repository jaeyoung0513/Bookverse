import { createSelector } from "reselect";

export const selectWishlistItems = (state) => state.wishlist.items || []; // 기본값으로 빈 배열 반환

export const selectIsInWishlist = createSelector(
  [selectWishlistItems, (_, bookId) => bookId],
  (items, bookId) => items.some((item) => item.id === bookId)
);

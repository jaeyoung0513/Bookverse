import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  isCartOpen: false,
};
// quantity는 필요한 컴포넌트에서 useState로 생성하여서 넘기는걸로
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity === 0) {
        // 수량이 2일때 버튼을 누르면 1이 payload로 넘어오는 구조, 수량이 1일때 버튼을 누르면 0이 payload로 넘어와서 리렌더링이됨
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, updateQuantity, removeItem, clearCart, toggleCart } =
  cartSlice.actions;

export default cartSlice.reducer;

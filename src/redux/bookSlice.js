import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Entity Adapter 생성
const booksAdapter = createEntityAdapter({
  selectId: (book) => book.bookId,
});

const initialState = booksAdapter.getInitialState({
  status: "idle", // API 상태 (idle, loading, succeeded, failed)
  error: null,
});

// 비동기 작업 (예: API 호출)
export const fetchBooks = createAsyncThunk("bookList/fetchBooks", async () => {
  const response = await fetch("/api/books");
  return response.json(); // 서버에서 받은 책 목록
});

const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    addBook: booksAdapter.addOne,
    removeBook: booksAdapter.removeOne,
    updateBook: booksAdapter.updateOne,
    clearBooks: booksAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        booksAdapter.setAll(state, action.payload);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addBook, removeBook, updateBook, clearBooks } =
  bookSlice.actions;
export const bookSelectors = booksAdapter.getSelectors(
  (state) => state.bookList
);

export default bookSlice.reducer;

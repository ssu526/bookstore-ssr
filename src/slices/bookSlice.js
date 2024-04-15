import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.value.push(action.payload);
    },
    removeBook: (state, action) => {
      state.value = state.value.filter((book) => book.id !== action.payload);
    },
    editBook: (state, action) => {
      const index = state.value.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.value[index] = { ...state.value[index], ...action.payload };
      }
    },
    loadBooks: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addBook, removeBook, editBook, loadBooks } = booksSlice.actions;
export default booksSlice.reducer;

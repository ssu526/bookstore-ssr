import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  selectedBook: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.selectedBook = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.selectedBook = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

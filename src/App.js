import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Home from "./components/Home";
import booksReducer from "./slices/bookSlice";
import modalReducer from "./slices/modalSlice";

const App = () => {
  const store = configureStore({
    reducer: {
      books: booksReducer,
      modal: modalReducer,
    },
  });

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};

export default App;

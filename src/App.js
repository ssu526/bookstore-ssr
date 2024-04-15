import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Home from "./components/Home";
import modalReducer from "./slices/modalSlice";

const App = ({ initialDataFromServer }) => {
  const store = configureStore({
    reducer: {
      modal: modalReducer,
    },
  });

  return (
    <Provider store={store}>
      <Home initialDataFromServer={initialDataFromServer} />
    </Provider>
  );
};

export default App;

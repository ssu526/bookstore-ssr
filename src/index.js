import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App.js";
import ReactDOM from "react-dom";

hydrateRoot(document.getElementById("root"), <App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

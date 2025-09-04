import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./DataStorage/Store";   // <-- make sure this is correct
import App from "./App";
import './App.css'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

import React from 'react';
import { render } from "react-dom";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import App from "./components/App";
import "toastr/build/toastr.min.css";

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

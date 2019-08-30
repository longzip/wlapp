import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./components/App";
// Importing the Bootstrap CSS and AdminLte
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.js";
import "@devexpress/dx-react-grid";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

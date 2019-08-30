/*eslint-disable import/default */

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './configureStore';
import {Provider} from 'react-redux';
import App from './components/App';
// import './style/style.css';
// import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.js";
import 'toastr/build/toastr.min.css';
import 'font-awesome/css/font-awesome.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';



const store = configureStore();

console.log('asasas')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

import React, { Component } from 'react'
import // State or Local Processing Plugins
"@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";

import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import Test1 from './Test1';


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Menu />

        <Footer />
      </div>
    )
  }
}

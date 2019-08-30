import React, { Component, useState, useEffect } from "react";
import {
  PagingState,
  SortingState,
  CustomPaging
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-bootstrap4";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "name", title: "Name" },
        { name: "sex", title: "Sex" },
        { name: "city", title: "City" },
        { name: "car", title: "Car" }
      ],
      rows: [
      ]
    };
  }
  componentDidMount() {}
  render() {
    const { rows, columns } = this.state;
    return (
      <div className="content-wrapper">
        <h1>Products</h1>
        <div className="card" style={{ position: "relative" }}>
          <Grid rows={rows} columns={columns}>
            <PagingState />
            <Table />
            <TableHeaderRow />
          </Grid>
        </div>
      </div>
    );
  }
}

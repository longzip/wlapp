import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
const contactFormatter = (cell, row) => {
  return `<a href=/sales/contact/${cell.id}>${cell.name +
    "-" +
    cell.description}</a>`;
};
const productFormatter = (cell, row) => {
  if (cell) return cell.code + "-" + cell.name;
  return;
};

class OrderLineList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "Không có dữ liệu"
    };

    this.selectRowProp = {
      mode: "radio",
      bgColor: "#c1f291",
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.orderLines}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="Product"
          dataFormat={productFormatter}
          dataSort={true}
          columnTitle
        >
          Tên sản phẩm
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productSpec" dataSort={true} columnTitle>
          Spec
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="productDimension"
          dataSort={true}
          columnTitle
        >
          Kích thước
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom" dataSort={true} columnTitle>
          ĐVT
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom" dataSort={true} columnTitle>
          Khối lượng
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom" dataSort={true} columnTitle>
          Đơn giá
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom" dataSort={true} columnTitle>
          Thành tiền
        </TableHeaderColumn>

        <TableHeaderColumn dataField="productUom" dataSort={true} columnTitle>
          Ghi chú
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

OrderLineList.propTypes = {
  orderLines: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default OrderLineList;

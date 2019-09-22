import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";
import dateFormat from "../common/MyFormat";

const titleFormatter = (cell, row) => {
  return `<a href=/sales/quote/${row.id}/detail>${cell}</a>`;
};
const contactFormatter = cell => {
  return cell.name + "-" + cell.description;
};
const userFormatter = cell => {
  return cell.name;
};

class QuoteList extends React.Component {
  constructor(props) {
    super(props);

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
        data={this.props.quotes}
        selectRow={this.selectRowProp}
        version="4"
        bordered={false}
        striped
        hover
        condensed
        pagination
        search
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="description"
          dataFormat={titleFormatter}
          dataSort={true}
        >
          Gói thầu
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="Contact"
          dataFormat={contactFormatter}
          dataSort={true}
        >
          Dự án
        </TableHeaderColumn>

        <TableHeaderColumn dataField="version" dataSort={true}>
          Lần
        </TableHeaderColumn>

        <TableHeaderColumn dataField="stage" dataSort={true}>
          Tình trạng
        </TableHeaderColumn>

        <TableHeaderColumn
          dataFormat={userFormatter}
          dataField="User"
          dataSort={true}
        >
          Tạo bởi
        </TableHeaderColumn>

        <TableHeaderColumn
          dataFormat={dateFormat}
          dataField="createdAt"
          dataSort={true}
        >
          Ngày
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

QuoteList.propTypes = {
  quotes: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default QuoteList;

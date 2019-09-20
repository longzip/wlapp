import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";
import dateFormat from "../common/MyFormat";

const titleFormatter = (cell, row) => {
  return `<a href=/sales/quote/${row.id}/detail>${cell}</a>`;
};
const contactFormatter = (cell, row) => {
  return `<a href=/sales/contact/${cell.id}/detail>${cell.name +
    "-" +
    cell.description}</a>`;
};
const userFormatter = (cell, row) => {
  return cell.name;
};

class QuoteList extends React.Component {
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
        data={this.props.quotes}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        pagination={true}
        show-search-button={true}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="description"
          dataFormat={titleFormatter}
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Gói thầu
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="Contact"
          dataFormat={contactFormatter}
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Dự án
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="version"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Lần
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="stage"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Tình trạng
        </TableHeaderColumn>

        <TableHeaderColumn
          dataFormat={userFormatter}
          dataField="User"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Tạo bởi
        </TableHeaderColumn>

        <TableHeaderColumn
          dataFormat={dateFormat}
          dataField="createdAt"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
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

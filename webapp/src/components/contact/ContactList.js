import React from "react";
import PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";

class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: "No data"
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
        data={this.props.contacts}
        pagination={true}
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
          dataField="name"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Mã dự án
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="description"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Tên chủ đầu tư
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="phone"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Phone
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="email"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Email
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="addressLine"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Địa chỉ
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="city"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          Tỉnh thành
        </TableHeaderColumn>

      </BootstrapTable>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default ContactList;

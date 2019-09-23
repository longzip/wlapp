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
        version="4"
        bordered={false}
        striped
        hover
        condensed
        search
      >
        <TableHeaderColumn dataField="id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn width="80" dataField="name">
          Mã dự án
        </TableHeaderColumn>

        <TableHeaderColumn width="180" dataField="description">
          Tên chủ đầu tư
        </TableHeaderColumn>

        <TableHeaderColumn width="90" dataField="phone">
          Phone
        </TableHeaderColumn>

        <TableHeaderColumn width="120" dataField="email">
          Email
        </TableHeaderColumn>

        <TableHeaderColumn width="190" dataField="addressLine">
          Địa chỉ
        </TableHeaderColumn>

        <TableHeaderColumn width="80" dataField="city">
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

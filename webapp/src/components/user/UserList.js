import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";
import dateFormat from "../common/MyFormat";

export class UserList extends React.Component {
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
      <div>
        <div className="card">
          <BootstrapTable
            data={this.props.users}
            pagination
            selectRow={this.selectRowProp}
            striped
            hover
            version="4"
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              #
            </TableHeaderColumn>

            <TableHeaderColumn dataField="name">Tên</TableHeaderColumn>

            <TableHeaderColumn dataField="username">Username</TableHeaderColumn>

            <TableHeaderColumn dataField="email">Email</TableHeaderColumn>

            <TableHeaderColumn dataField="createdAt" dataFormat={dateFormat}>
              Ngày tạo
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default UserList;

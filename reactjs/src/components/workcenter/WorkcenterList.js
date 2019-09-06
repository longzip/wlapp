import React, { Component, PropTypes } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";

class WorkcenterList extends Component {
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
    console.log(this.props.workcenters);
    return (
      <div>
        <BootstrapTable
          data={this.props.workcenters}
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
            filter={{ type: "TextFilter", delay: 0 }}
            columnTitle
          >
            Name
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="code"
            dataSort={true}
            caretRender={getCaret}
            filter={{ type: "TextFilter", delay: 0 }}
            columnTitle
          >
            Code
          </TableHeaderColumn>

          <TableHeaderColumn
            dataField="createdAt"
            dataSort={true}
            caretRender={getCaret}
            filter={{ type: "TextFilter", delay: 0 }}
            columnTitle
          >
            createdAt
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

WorkcenterList.propTypes = {
  workcenters: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default WorkcenterList;

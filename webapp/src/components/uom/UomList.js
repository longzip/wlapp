import React from "react";
import * as PropTypes from "prop-types";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import getCaret from "../common/GetCaret";
import dateFormat from "../common/MyFormat";

class UomList extends React.Component {
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
      <div>
        <div className="card">
          <BootstrapTable
            data={this.props.uoms}
            pagination={true}
            selectRow={this.selectRowProp}
            bordered={false}
            striped
            hover
            condensed
            version="4"
          >
            <TableHeaderColumn dataField="id" isKey hidden>
              #
            </TableHeaderColumn>

            <TableHeaderColumn
              dataField="name"
              dataSort={true}
              filter={{ type: "TextFilter", delay: 0 }}
              columnTitle
            >
              Tên
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

UomList.propTypes = {
  uoms: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired
};

export default UomList;

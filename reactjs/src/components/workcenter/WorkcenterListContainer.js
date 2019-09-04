import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workcenterAction from "../../action/WorkcenterAction";
import WorkcenterList from "./WorkcenterList";

export class WorkcenterListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedWorkcenterId: undefined };

    this.handleAddWorkCenter = this.handleAddWorkCenter.bind(this);
    this.handleEditWorkcenter = this.handleEditWorkcenter.bind(this);
    this.handleDeleteWorkcenter = this.handleDeleteWorkcenter.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getWorkcentersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAddWorkCenter() {
    this.props.history.push("/datas/workcenter");
  }

  handleEditWorkcenter() {
    const selectedWorkcentertId = this.state.selectedWorkcentertId;
    if (selectedWorkcentertId) {
      this.setState({ selectedWorkcentertId: undefined });
      this.props.history.push(`/datas/workcenter/${selectedWorkcentertId}`);
    }
  }

  handleDeleteWorkcenter() {
    const selectedWorkcenterId = this.state.selectedWorkcenterId;

    if (selectedWorkcenterId) {
      this.setState({ selectedWorkcenterId: undefined });
      this.props.action
        .deleteWorkcenterAction(selectedWorkcenterId)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedCostcentertId: row.id });
    }
  }

  render() {
    const { workcenters } = this.props;

    if (!workcenters) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Workcenters</h3>
            </div>
            <div className="card-footer clearfix">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleAddWorkCenter}
                >
                  <i className="fa fa-plus" aria-hidden="true" /> New
                </button>

                <button
                  type="button"
                  className="btn btn-warning ml-2"
                  onClick={this.handleEditWorkcenter}
                >
                  <i className="fa fa-pencil" aria-hidden="true" /> Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={this.handleDeleteWorkcenter}
                >
                  <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={this.handleDeleteWorkcenter}
                  />{" "}
                  Delete
                </button>
              </div>{" "}
            </div>
            <div className="card-body p-0">
              <WorkcenterList
                workcenters={workcenters}
                handleRowSelect={this.handleRowSelect}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  workcenters: state.workcentersReducer.workcenters
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(workcenterAction, dispatch)
});

WorkcenterListContainer.PropTypes = {
  workcenters: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkcenterListContainer);

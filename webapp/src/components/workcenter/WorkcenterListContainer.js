import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as workcenterAction from "../../action/WorkcenterAction";
import WorkcenterList from "./WorkcenterList";

export class WorkcenterListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedWorkcenterId: undefined };

    this.handleAd = this.handleAd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getWorkcentersAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAd() {
    this.props.history.push("/datas/workcenter");
  }

  handleEdit() {
    const selectedWorkcenterId = this.state.selectedWorkcenterId;
    console.log(selectedWorkcenterId);
    if (selectedWorkcenterId) {
      this.setState({ selectedWorkcenterId: undefined });
      this.props.history.push(`/datas/workcenter/${selectedWorkcenterId}`);
    }
  }

  handleDelete() {
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
    console.log(row);
    if (isSelected) {
      this.setState({ selectedWorkcenterId: row.id });
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
                  onClick={this.handleAd}
                >
                  <i className="fa fa-plus" aria-hidden="true" /> New
                </button>

                <button
                  type="button"
                  className="btn btn-warning ml-2"
                  onClick={this.handleEdit}
                >
                  <i className="fa fa-pencil" aria-hidden="true" /> Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger ml-2"
                  onClick={this.handleDelete}
                >
                  <i
                    className="fa fa-trash-o"
                    aria-hidden="true"
                    onClick={this.handleDelete}
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

WorkcenterListContainer.propTypes = {
  workcenters: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkcenterListContainer);

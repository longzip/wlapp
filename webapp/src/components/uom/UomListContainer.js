import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as uomAction from "../../action/UomAction";
import UomList from "./UomList";

export class UomListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedUomId: undefined };

    this.handleAd = this.handleAd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getUomsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAd() {
    this.props.history.push("/settings/uom");
  }

  handleEdit() {
    const selectedUomId = this.state.selectedUomId;
    if (selectedUomId) {
      this.setState({ selectedUomId: undefined });
      this.props.history.push(`/settings/uom/${selectedUomId}`);
    }
  }

  handleDelete() {
    const selectedUomId = this.state.selectedUomId;

    if (selectedUomId) {
      this.setState({ selectedUomId: undefined });
      this.props.action
        .deleteUomAction(selectedUomId)
        .catch(error => {
          toastr.error(error);
        });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedUomId: row.id });
    }
  }

  render() {
    const { uoms } = this.props;

    if (!uoms) return <div>Loading...</div>;
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Unit of Mesure</h3>
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
              <UomList
                uoms={uoms}
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
  uoms: state.uomsReducer.uoms
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(uomAction, dispatch)
});

UomListContainer.propTypes = {
  uoms: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UomListContainer);

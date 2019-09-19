import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as routingAction from "../../action/RoutingAction";
import RoutingList from "./RoutingList";

export class RoutingListContainer extends Component {
  constructor() {
    super();

    this.state = { selectedRoutingId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getRoutingsAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/mpr/");
  }

  handleEdit() {}

  handleDelete() {}

  handleRowSelect() {}
  render() {
    const { routings } = this.props;
    if (!routings) return <div>Loading...</div>;
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  uoms: state.uomsReducer.uoms
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(routingAction, dispatch)
});

RoutingListContainer.propTypes = {
  routings: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutingListContainer);

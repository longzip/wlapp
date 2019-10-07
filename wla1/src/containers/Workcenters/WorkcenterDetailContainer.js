import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import {
  CssBaseline,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress
} from "@material-ui/core";
import WorkordersList from "../Workorders/WorkordersList";
import Topbar from "../../components/Topbar";
import SelectedWorkcenterActions from "../../Stores/SelectedWorkcenter/Actions";
import WorkcenterProductivitiesActions from "../../Stores/WorkcenterProductivities/Actions";
import WorkordersActions from "../../Stores/Workorders/Actions";
import { makeGetWorkcenterWorkorders } from "../../Stores/Selectors";
import BackWorkcenter from "../../components/common/BackWorkcenter";
import styles from "./WorkcenterDetailContainerStyle";

class WorkcenterDetailContainer extends Component {
  constructor() {
    super();
    this.state = {
      openNext: false,
      open: false,
      openAccept: false,
      textInputValue: "",
      lossInputValue: "0",
      item: {},
      workcenterProductivity: {}
    };
    this._saveWorkcenterProductivity = this._saveWorkcenterProductivity.bind(
      this
    );
    this._saveNextWorkcenterProductivity = this._saveNextWorkcenterProductivity.bind(
      this
    );
    this._acceptWorkcenterProductivity = this._acceptWorkcenterProductivity.bind(
      this
    );
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }
  componentDidMount() {
    this._fetchWorkcenter();
    this._fetchWorkorders();
    this.props.fetchWorkcenterProductivities();
  }

  handleClickOpen = item => {
    console.log("Click Open");
    console.log(item);
    this.setState(() => ({ item }));
    this.setState({ open: true });
  };

  handleClickOpenNext = (item, workcenterProductivity) => {
    console.log("Click Open Next");
    console.log(item);
    console.log(workcenterProductivity);
    this.setState(() => ({
      item,
      workcenterProductivity,
      openNext: true,
      textInputValue: workcenterProductivity.qtyProduced
    }));
  };

  handleClickOpenAccept = item => {
    console.log("Click Accept");
    console.log(item);
    this.setState(() => ({ item }));
    this.setState({ openAccept: true });
  };

  handleClose() {
    this.setState({ open: false, openAccept: false, openNext: false });
  }
  handleChange = event => {
    const {
      target: { value }
    } = event;
    const lossInputValue =
      this.state.workcenterProductivity.qtyProduced - value;
    this.setState(() => ({ textInputValue: value, lossInputValue }));
  };
  handleChangeLoss = event => {
    const {
      target: { value }
    } = event;
    const textInputValue =
      this.state.workcenterProductivity.qtyProduced - value;
    this.setState(() => ({
      lossInputValue: value,
      textInputValue
    }));
  };

  render() {
    const {
      classes,
      workorders,
      workcenterIsLoading,
      workcenterErrorMessage,
      workordersIsLoading,
      workordersErrorMessage
    } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        {workcenterIsLoading && workordersIsLoading ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <CircularProgress disableShrink />
          </Grid>
        ) : workcenterErrorMessage && workordersErrorMessage ? (
          <Grid container direction="row" justify="center" alignItems="center">
            <Typography variant="body1">
              {workcenterErrorMessage && workcenterErrorMessage}
              {workordersErrorMessage && workordersErrorMessage}
            </Typography>
            {<Button onClick={() => this._fetchWorkorders()}>Tải lại</Button>}
          </Grid>
        ) : (
          <div>
            <CssBaseline />
            <Topbar currentPath={currentPath} />
            <BackWorkcenter name={this.props.workcenter.name} />
            <div className={classes.root}>
              <Grid container justify="center">
                <Grid
                  alignItems="center"
                  justify="center"
                  container
                  className={classes.grid}
                >
                  <Grid item xs={12}>
                    <WorkordersList
                      workorders={workorders}
                      handleClickOpen={this.handleClickOpen}
                      handleClickOpenNext={this.handleClickOpenNext}
                      handleAccept={this.handleClickOpenAccept}
                      handleSave={this.handleClickOpen}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  BẢNG PHIẾU PALET NỘI THẤT
                </DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="name"
                    label="SỐ PALET"
                    type="text"
                    fullWidth
                    // value={this.state.textInputValue}
                    // onChange={this.handleChange}
                  />
                  <DialogContentText>
                    MÃ SẢN PHẨM:
                    {this.state.item.Product && this.state.item.Product.code}
                  </DialogContentText>
                  <DialogContentText>
                    TÊN CHI TIẾT:
                    {this.state.item.Product && this.state.item.Product.name}
                  </DialogContentText>
                  <DialogContentText>
                    QUY CÁCH:{" "}
                    {this.state.item.Production &&
                      this.state.item.Production.productDimension}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Số lượng"
                    type="number"
                    fullWidth
                    value={this.state.textInputValue}
                    onChange={this.handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={this._saveWorkcenterProductivity}
                    color="primary"
                  >
                    Tạo Pallet
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Next Productivity */}
              <Dialog
                open={this.state.openNext}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Nhập số liệu</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bạn đã sản xuất được bao nhiêu? Ghi nhận số liệu tại ô trống
                    dưới đây.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Gia công đạt"
                    type="number"
                    value={this.state.textInputValue}
                    onChange={this.handleChange}
                  />{" "}
                  <TextField
                    autoFocus
                    margin="dense"
                    id="lost"
                    label="Sai hỏng"
                    type="number"
                    value={this.state.lossInputValue}
                    onChange={this.handleChangeLoss}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={this._saveNextWorkcenterProductivity}
                    color="primary"
                  >
                    Ghi nhận
                  </Button>
                </DialogActions>
              </Dialog>
              {/* Accept */}
              <Dialog
                open={this.state.openAccept}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Nhận pallet</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Ghi nhận số liệu đã nhận của công đoạn trước, để thực hiện
                    sản xuất.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Hủy
                  </Button>
                  <Button
                    onClick={this._acceptWorkcenterProductivity}
                    color="primary"
                  >
                    Ghi nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  _fetchWorkcenter() {
    if (this.props.match.params && this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.fetchWorkcenter(id);
    }
  }

  _fetchWorkorders() {
    this.props.fetchWorkorders();
  }
  _acceptWorkcenterProductivity() {
    const { id } = this.state.item;
    const workcenterProductivity = {
      id,
      accepted: true
    };
    this.props.saveWorkcenterProductivity(workcenterProductivity);
    this.setState({ openAccept: false });
  }
  _saveWorkcenterProductivity() {
    const {
      id,
      ProductionId,
      WorkcenterId,
      ProductId,
      productUom,
      ContactId
    } = this.state.item;
    const workcenterProductivity = {
      ProductionId,
      WorkorderId: id,
      ProductId,
      WorkcenterId,
      qtyProduced: this.state.textInputValue,
      productUom,
      ContactId
    };

    this.props.saveWorkcenterProductivity(workcenterProductivity);
    this.setState(() => ({
      textInputValue: "",
      lossInputValue: "0",
      open: false,
      openAccept: false,
      openNext: false
    }));
  }
  _saveNextWorkcenterProductivity() {
    const {
      id,
      ProductionId,
      WorkcenterId,
      ProductId,
      productUom,
      ContactId
    } = this.state.item;
    const workcenterProductivity = {
      ProductionId,
      WorkorderId: id,
      ProductId,
      WorkcenterId,
      qtyProduced: this.state.textInputValue,
      loss: this.state.lossInputValue ? this.state.lossInputValue : 0,
      productUom,
      ContactId,
      prevId: this.state.workcenterProductivity.id,
      PalletId: this.state.workcenterProductivity.PalletId
    };
    console.log("Save Next Workcenter Productivity");
    console.log(workcenterProductivity);
    this.props.saveWorkcenterProductivity(workcenterProductivity);
    this.setState(() => ({
      textInputValue: "",
      lossInputValue: "0",
      open: false,
      openAccept: false,
      openNext: false
    }));
  }
}

WorkcenterDetailContainer.propTypes = {
  workcenter: PropTypes.object,
  workcenterIsLoading: PropTypes.bool,
  workcenterErrorMessage: PropTypes.string,
  fetchWorkcenter: PropTypes.func
};

const makeMapStateToProps = () => {
  const getWorkcenterWorkorders = makeGetWorkcenterWorkorders();
  const mapStateToProps = (state, props) => {
    return {
      workcenter: state.selectedWorkcenterReducer.workcenter,
      workcenterIsLoading: state.selectedWorkcenterReducer.workcenterIsLoading,
      workcenterErrorMessage:
        state.selectedWorkcenterReducer.workcenterErrorMessage,
      workorders: getWorkcenterWorkorders(state, props),
      workordersIsLoading: state.workordersReducer.workordersIsLoading,
      workordersErrorMessage: state.workordersReducer.workordersErrorMessage
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  fetchWorkcenter: id =>
    dispatch(SelectedWorkcenterActions.fetchWorkcenter(id)),
  fetchWorkorders: () => dispatch(WorkordersActions.fetchWorkorders()),
  saveWorkcenterProductivity: workcenterProductivityBeingAddedOrEdited =>
    dispatch(
      WorkcenterProductivitiesActions.saveWorkcenterProductivity(
        workcenterProductivityBeingAddedOrEdited
      )
    ),
  fetchWorkcenterProductivities: () =>
    dispatch(WorkcenterProductivitiesActions.fetchWorkcenterProductivities())
});

export default withStyles(styles)(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(WorkcenterDetailContainer)
);

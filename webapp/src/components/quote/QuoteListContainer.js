import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import * as quoteAction from "../../action/QuoteAction";
import QuoteList from "./QuoteList";

export class QuoteListContainer extends React.Component {
  constructor() {
    super();

    this.state = { selectedQuoteId: undefined };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    this.props.action.getQuotesAction().catch(error => {
      toastr.error(error);
    });
  }

  handleAdd() {
    this.props.history.push("/sales/quote");
  }

  handleEdit() {
    const selectedQuoteId = this.state.selectedQuoteId;
    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.history.push(`/sales/quote/${selectedQuoteId}`);
    }
  }

  handleDelete() {
    const selectedQuoteId = this.state.selectedQuoteId;

    if (selectedQuoteId) {
      this.setState({ selectedQuoteId: undefined });
      this.props.action.deleteQuoteAction(selectedQuoteId).catch(error => {
        toastr.error(error);
      });
    }
  }

  handleRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selectedQuoteId: row.id });
    }
  }

  render() {
    const { quotes } = this.props;

    if (!quotes) {
      return <div>Đang tải dữ liệu...</div>;
    }

    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dòng sản phẩm</h3>
              <div className="card-tools no-print">
                <div class="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleAdd}
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

                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleAllowAdd}
                  >
                    Thêm <i class="far fa-plus-square"></i>
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={this.handleDelete}
                  >
                    Xóa <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <QuoteList
                quotes={quotes}
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
  quotes: state.quotesReducer.quotes
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(quoteAction, dispatch)
});

QuoteListContainer.propTypes = {
  quotes: PropTypes.array,
  action: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteListContainer);

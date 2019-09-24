import React, { Component } from "react";
import PropTypes from "prop-types";
import toastr from "toastr";
import QuoteList from "../quote/QuoteList";
import ListButton from "../common/ListButton";
import QuoteForm from "../quote/QuoteForm";

export class ContactDetail extends Component {
  constructor() {
    super();
    this.state = {
      allowAdd: false
    };
    this.handleAllowAdd = this.handleAllowAdd.bind(this);
  }

  handleAllowAdd() {
    this.setState({ allowAdd: !this.state.allowAdd });
  }

  render() {
    const { contact, quotes } = this.props;
    const { allowAdd } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Thông tin dự án</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
              {quotes && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Báo giá</h3>
                  </div>

                  <div className="card-body p-0">
                    <QuoteList
                      quotes={quotes}
                      handleRowSelect={this.props.handleRowSelect}
                    />
                  </div>
                  <div className="card-footer clearfix">
                    <ListButton
                      handleAdd={this.handleAllowAdd}
                      handleDelete={this.props.handleDeleteQuote}
                      handleEdit={this.props.handleEditQuote}
                    />
                  </div>
                </div>
              )}
              {allowAdd && (
                <QuoteForm
                  heading="Add"
                  handleSave={this.props.handleSaveQuote}
                  handleCancel={this.handleAllowAdd}
                />
              )}
            </div>
            {contact && (
              <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                <h3 className="text-primary">{contact.name}</h3>
                <p className="lead">{contact.description}</p>
                <p className="text-muted">{contact.note}</p>
                <br></br>
                <div className="text-muted">
                  <p className="text-sm">
                    Đầu mối liên hệ
                    <b className="d-block">{contact.phone}</b>
                    <b className="d-block">{contact.email}</b>
                    <b className="d-block">{contact.addressLine}</b>
                    <b className="d-block">{contact.city}</b>
                  </p>
                  <p className="text-sm">
                    Sản phẩm
                    <b className="d-block">Cửa</b>
                    <b className="d-block">Nội thất</b>
                    <b className="d-block">Khối lượng</b>
                  </p>
                  <p className="text-sm">
                    Tình trạng dự án
                    <b className="d-block">Chưa xây dựng</b>
                    <b className="d-block">Đã xây dựng</b>
                  </p>
                  <p className="text-sm">
                    Các nhà thầu khác tham gia báo giá
                    <b className="d-block">...</b>
                  </p>
                </div>
                <h5 className="mt-5 text-muted">Tài liệu</h5>
                <div className="text-center mt-5 mb-3">
                  <button className="btn btn-sm btn-primary">Add files</button>
                  <a href="/sales/contacts" class="btn btn-sm btn-warning">
                    Đóng
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
ContactDetail.propTypes = {
  contact: PropTypes.object,
  quote: PropTypes.object,
  handleRowSelect: PropTypes.func.isRequired,
  handleEditQuote: PropTypes.func.isRequired,
  handleDeleteQuote: PropTypes.func.isRequired
};
export default ContactDetail;

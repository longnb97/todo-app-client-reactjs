import "../../../../styles/mainconfig.css";
import "./ManagePaymentComponent.css";
import React, { Component } from "react";
import { Row, Col, Button, Table, Modal, Dialog } from "react-bootstrap";
import cancelRequest, {
  getListPaymentWithPermision,
  addNewPaymentWithPermision
} from "../../../../service/admin-service";
import Spinner from "react-spinner-material";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { PaymentInfoModel } from "../../../../model/paymentinfo.model";
import ReadMoreReact from 'read-more-react';


class ManagePaymentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentName: "",
      paymentDescription: "",
      errGetCategory: {},
      getListPaymentSuccess: false,
      listPayment: [],
      processing: false,
      addText: "Thêm mới",
      addSuccess: false,// kết thúc thao tác thêm
      showSuccessMessage: false // thêm mới thành công hay không
    };
  }

  componentWillMount() {
    this._getListPaymentWithPermision();
  }

  _getListPaymentWithPermision(){
    getListPaymentWithPermision(0, 10).then(
      resPayment => {
        this.setState(
          { listPayment : resPayment.data , getListPaymentSuccess : true}
        );
      }
    ).catch(
      e => {
        console.log(e);
      }
    )
  }

  _addNewPayment(){
    let newPayment = new PaymentInfoModel();
    newPayment.name = this.state.paymentName;
    newPayment.description  = this.state.paymentDescription;
    console.log(newPayment)
    this.setState({ processing: true, showSuccessMessage: false }, () => {
      addNewPaymentWithPermision(newPayment).then(
        resAddPayment => {
          console.log(resAddPayment);
          if(resAddPayment.data.ok === 1){
            this.setState(
              {
                addSuccess: true,
                showSuccessMessage: true,
                listPayment: this.state.listPayment.concat([resAddPayment.data.data]),
                processing: false
              },
              () => {
                ToastsStore.success("Thêm mới phương thức thanh toán thành công");
              }
            );
          }
          else if  (resAddPayment.data.ok === 0){
            console.log('k oke');
            this.setState(
              {
                addSuccess: false,
                showSuccessMessage: true,
                processing: false
              },
              () => {
                ToastsStore.success("Thêm mới phương thức thanh toán không thành công");
              }
            );
          } 
        }
      ).catch(
        e => {
          this.setState({addSuccess: false, showSuccessMessage: false});
          ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
          console.log(e);
        }
      )
    })
  }

  _renderListUser(list) {
    const listItems = list.map((item, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td className="text-left phuong-thuc-tt">{item.name}</td>
        <td className="text-left"><ReadMoreReact  min={70} max={300} readMoreText={"Xem thêm"} text={item.description} /></td>
      </tr>
    ));
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên phương thức</th>
            <th>Mô tả</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </Table>
    );
  }

  render() {
    return (
      <div className="Profile-component">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        <div className="container-login100 Profile">
          <Row>
            <Col xs={12} sm={4} md={4} lg={3} className="col-padding-top">
              <div className="tab-add-category">
                <p className="title-tab">Thêm mới phương thức thanh toán</p>
                <p className="sub-title"> Tên phương thức thanh toán</p>
                <input
                  className="input-style"
                  type="text"
                  onFocus = { () => {this.setState( {showSuccessMessage : false})}}
                  onBlur={_paymentName => {
                    this.setState({ paymentName: _paymentName.target.value });
                  }}
                  name="category-name"
                />

                <p className="sub-title"> Mô tả</p>
                <textarea 
                  className="input-style textarea-min-height"
                  rows="4" cols="50"
                  // value= ""
                  onFocus = { () => {this.setState( {showSuccessMessage : false})}}
                  onBlur={categoryDes => {
                    this.setState({ paymentDescription: categoryDes.target.value });
                  }}
                />

                <div>
                  {/* processing */}
                  <div
                    className={
                      "Processing " +
                      (this.state.processing === true
                        ? "block"
                        : "display-none")
                    }
                  >
                    <Spinner
                      size={20}
                      spinnerColor={"#3d9191"}
                      spinnerWidth={4}
                      visible={true}
                    />
                    <span>Processing ...</span>
                  </div>
                  
                  {/* responseMessage */}
                  <div
                    className={
                      "Processing " +
                      (this.state.processing === false && this.state.showSuccessMessage === true
                        ? "block"
                        : "display-none") +
                      (this.state.addSuccess === true ? " SUCCESS" : " FAIL")
                    }
                  >
                    <i className= {(this.state.addSuccess === true ? "far fa-check-circle" : "far fa-times-circle")}></i>
                    <span> {this.state.addSuccess === true ? "Thành công" : "Thất bại"} </span>
                  </div>

                  <button
                    className="button-add"
                    disabled={this.setState.processing}
                    onClick={this._addNewPayment.bind(this)}
                  >
                    {this.state.getListPaymentSuccess == true ? (this.state.addText) : (<p>Có lỗi xảy ra trong quá trình lấy dữ liệu từ db</p>)}
                  </button>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={8} md={8} lg={9} className="col-padding-top">
              <div className="tab-list-category">
                <p className="title-tab">Danh sách phương thức thanh toán</p>
                <div>
                    {this._renderListUser(this.state.listPayment)}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ManagePaymentComponent;


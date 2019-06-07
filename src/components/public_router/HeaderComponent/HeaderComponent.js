import React, { Component } from "react";
import "./HeaderComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Login } from "../../../redux/actions/checkAuthorizeAction";
import { Route, Redirect, withRouter } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

const orangeColorText = {
  color: "#f57224"
};
const whiteColorText = {
  color: "#fff"
};
const greenColorText = {
  color: "#30c8dc"
};


class HeaderComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentPathName : ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({currentPathName : this.props.location.pathname}) ;
    }
  }

  _dispatchReduxLogOut(){
    const { history, authed } = this.props;
    ToastsStore.success("Logout thành công");
    this.props.dispatchReduxLogOut({ isLogin: false, role: null});
    localStorage.removeItem("token");
    localStorage.removeItem("typeUser");
    history.push("/");
  }

  _renderMenu(){
    // console.log(this.props.listState.authenticationInfo)
    if (this.props.listState.authenticationInfo.isLogin === null || this.props.listState.authenticationInfo.role ==="customer"){
      return (
        <div ></div>
      )
    }
    else if (this.props.listState.authenticationInfo.isLogin === true && this.props.listState.authenticationInfo.role ==="admin" ){
      return (
        <Row className= {"Row-menu " +(this.props.listState.authenticationInfo.role !== "admin" ?  "Display-none" : "")} id = "Menu-detail" >
            <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-left-menu Border-right-menu" >
                <Link to="/admin/manage/user-account"  style={{ color : this.state.currentPathName === "/admin/manage/user-account" ||  this.state.currentPathName === "/admin/manage"  ? "#fff" : "" }} className={"Child-Link1"} >Quản lý người dùng</Link>
            </Col>
            <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-right-menu" >
                <Link to="/admin/manage/category"  style={{ color : this.state.currentPathName === "/admin/manage/category" ? "#fff" : "" }} className="Child-Link1">Quản lý danh mục</Link>
            </Col>
            <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-right-menu" >
                <Link to="/admin/manage/discount"  style={{ color : this.state.currentPathName === "/admin/manage/discount" ? "#fff" : "" }} className="Child-Link1">Quản lý mã giảm giá</Link>
            </Col>
            <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-right-menu" >
                <Link to="/admin/manage/payment"  style={{ color : this.state.currentPathName === "/admin/manage/payment" ? "#fff" : "" }} className="Child-Link1">Quản lý phương thức thanh toán</Link>
            </Col>
        </Row>
      )
    }
    else if (this.props.listState.authenticationInfo.isLogin === true && this.props.listState.authenticationInfo.role ==="provider" ){
      return(
      <Row className= {"Row-menu " + (this.props.listState.authenticationInfo.role !== "provider" ?  "Display-none" : "")} id = "Menu-detail" >
        <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-left-menu Border-right-menu" >
            <Link to="/provider/manage/product"  style={{ color : this.state.currentPathName === "provider/manage/product" ? "#fff" : "" }} className={"Child-Link1"} >Quản lý sản phẩm</Link>
        </Col>
        <Col xs={12} sm={6} md={3} lg={2}  className="No-padding Border-right-menu" >
            <Link to="/admin/manage/category"  style={{ color : this.state.currentPathName === "/manage/category" ? "#fff" : "" }} className="Child-Link1">Quản lý danh mục</Link>
        </Col>
    </Row>
     )
    }
  }

  componentDidMount(){
    // console.log(this.props.location.pathname);
     console.log(this.props.listState.authenticationInfo.role);
    this.setState({currentPathName : this.props.location.pathname}) ;
  }
  render() {
    return (
      <div className="Header-app" id="Header">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="Reset-margin Header-app">
          <div className="Full-width Header-background-first " id="Header-menu">
            <Row className="Center Header-contact">
              <div className="Container-custom">
                <span>Chào mừng bạn đã đến với Bee Go !</span>
                <Button className={"Logout-button " + (this.props.listState.authenticationInfo.isLogin !== true ? "Display-none" : "")}   onClick={this._dispatchReduxLogOut.bind(this)}> Logout !</Button>
                <a>
                  <i className="fab fa-twitter Icon-link" />
                </a>
                <a>
                  <i className="fab fa-facebook-f Icon-link" />
                </a>
                <a>
                  <i className="fab fa-google Icon-link" />
                </a>
              </div>
            </Row>
          </div>

          <div
            className="Full-width Header-background-Second"
            id="Search-header"
          >
            <Row className="Max-width Full-width">
              <Col xs={12} sm={6} md={3} lg={3} className="No-padding">
                <Link to="/" >
                  <img
                    alt="logo"
                    className="Logo-Beego"
                    src={require("../../../assets/image/beego.png")}
                  />
                </Link>
              </Col>
              <Col xs={12} sm={6} md={6} lg={6} className="No-padding">
                <div className="Feature-tag-search">
                  <a>Xu hướng tìm kiếm</a>
                  <a>Thời tramg</a>
                  <a>Điện tử</a>
                </div>
                <div className="Div-search">
                  <input
                    className="Height-control Input-search"
                    placeholder="Tìm kiếm trên BeeGo"
                    type="text"
                    name="name"
                  />
                  <Button className="Height-control Button-search">
                    Tìm kiếm
                  </Button>
                  <span className="Arrow-left-search" />
                </div>
              </Col>
              <Col xs={12} sm={6} md={2} lg={2}  className={ "No-padding Account "  + (this.props.listState.authenticationInfo.isLogin === true ? "Display-none" : "")} >
                <ul className="Account-info">
                  <li>
                    <Link to="/login">Đăng nhập /</Link>
                  </li>
                  <li>
                    <Link to="/signup">Đăng ký</Link>
                  </li>
                </ul>
              </Col>
              <Col xs={12} sm={6} md={1} lg={1} className="No-padding Cart">
                <Link to="/list-product-of-user"  className="Top-cart-contain heading-cart">
                  <span className="cartCount count_item_pr" id="cart-total">
                    0
                  </span>
                  <span className="cart-text">Giỏ hàng</span>
                </Link>
              </Col>
              <Col xs={12} sm={6} md={2} lg={2}  className={ "No-padding Account "  + (this.props.listState.authenticationInfo.isLogin !== true ? "Display-none" : "")} >
                <Link to="/manage" className="Account-info">
                  <li> Trang cá nhân  </li>
                </Link>
              </Col>
            </Row>

            <div className="Full-width Menu-cover">
              <div className="Menu-inside-border-dotted"> 
                  {this._renderMenu()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// listState : tên đặt cho danh sách các state mà lấy ra được từ store
// state là danh sách tất cả các state => có thể lấy riêng rẽ => state.isLogin

const  HeaderWithRouter =  withRouter(HeaderComponent);

const mapStateToProps = (state) => {
  return {
    listState: state
  }
}

// isLogin == true => đã login
const mapDispatchToProps = dispatch => {
  return {
    dispatchReduxLogOut: _dispatchReduxLogout => dispatch(Login(_dispatchReduxLogout))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
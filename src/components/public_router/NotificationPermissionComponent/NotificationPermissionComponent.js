import React, { Component } from "react";
import "./NotificationPermissionComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Login } from "../../../redux/actions/checkAuthorizeAction";
import { withRouter } from 'react-router-dom';


class _NotificationPermissionComponent extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
  
  }

  _SwitchRedirect(pageRidirectName){
    const { history } = this.props;
    if (pageRidirectName === "Home"){
      history.push("/");
    }
    else if (pageRidirectName === "Login"){
      this.props.dispatchReduxLogOut({ isLogin: false, role: null});
      localStorage.removeItem("token");
      localStorage.removeItem("typeUser");
      history.push({
        pathname: "/login",
        state: { detail: this.props.location.state }
      });
    }
  }

  _switchRender () {
    if (this.props.listState.authenticationInfo.isLogin === true && this.props.location.errCode === "403"){
      return(
        <div className="Container-custom">
          <br/>
          <h2>Bạn không có quyền truy cập vào trang web này </h2>
          <div className="div-cover-redirect">
            <Button className={"Logout-button"}  onClick={this._SwitchRedirect.bind(this, "Home")}>Trở về trang chủ</Button>
            <Button className={"Logout-button"}  onClick={this._SwitchRedirect.bind(this, "Login")}>Đăng xuất và nhập lại</Button>
          </div>
        </div>
      )
    }
    else if(this.props.listState.authenticationInfo.isLogin === false ){
      return(
        <div className="Container-custom">
          <br/>
          <h4>Không có gì trong trang này cả </h4>
          <div className="div-cover-redirect">
            <Button className="Logout-button center-button"  onClick={this._SwitchRedirect.bind(this, "Home")}>Trở về trang chủ</Button>
          </div>
        </div>
      )
    }
    else{
      return(
        <div className="Container-custom">
          <br/>
          <h2>Bạn không có quyền truy cập vào trang web này </h2>
          <div className="div-cover-redirect">
            <Button className="Logout-button"  onClick={this._SwitchRedirect.bind(this, "Home")}>Trở về trang chủ</Button>
            <Button className="Logout-button"  onClick={this._SwitchRedirect.bind(this, "Login")}>Đăng xuất và nhập lại</Button>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Header-app" id="Header">
        <div className="Reset-margin Header-app">
          <div className="Full-width Header-background-first " id="Header-menu">
            <Row className="Center Notification">
              { this._switchRender()}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

// listState : tên đặt cho danh sách các state mà lấy ra được từ store
// state là danh sách tất cả các state => có thể lấy riêng rẽ => state.isLogin

const  NotificationPermissionComponent =  withRouter(_NotificationPermissionComponent);

const mapStateToProps = (state) => {
  return {
    listState: state
  }
}

// isLogin == true => đã login
const mapDispatchToProps = dispatch => {
  return {
    dispatchReduxLogOut: (dispatchLogout) => dispatch(Login(dispatchLogout)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPermissionComponent);
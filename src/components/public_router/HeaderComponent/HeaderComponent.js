import React, { Component } from "react";
import "./HeaderComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Login } from "../../../redux/actions/checkAuthorizeAction";
import { Route, Redirect, withRouter } from "react-router-dom";
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
      currentPathName: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({ currentPathName: this.props.location.pathname });
    }
  }

  _dispatchReduxLogOut() {
    const { history, authed } = this.props;
    ToastsStore.success("Logout thành công");
    this.props.dispatchReduxLogOut({ isLogin: false, role: null });
    localStorage.removeItem("token");
    localStorage.removeItem("typeUser");
    history.push("/");
  }

  componentDidMount() {
    // console.log(this.props.location.pathname);
    console.log(this.props.listState.authenticationInfo.role);
    this.setState({ currentPathName: this.props.location.pathname });
  }
  render() {
    return (
      <div className="Header-app" id="Header">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="Reset-margin Header-app ">
          <div className="Full-width Header-background-first " id="Header-menu">
            <Row className="Center Header-contact Container-custom">
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className="No-padding text-center pos-relative"
              >
                <Link to="/" className="web-name">
                  {" "}
                  Trello
                </Link>

                  <div
                    className={
                      "No-padding account " +
                      (this.props.listState.authenticationInfo.isLogin === true
                        ? "Display-none"
                        : "align-items-center d-flex flex-row p-10")
                    }
                  >
                    <ul className="Account-info">
                      <span>
                        <Link to="/login" className="Login-text">
                          Đăng nhập /
                        </Link>
                      </span>
                      <span>
                        <Link to="/signup" className="SignUp-text">
                          &nbsp; Đăng ký
                        </Link>
                      </span>
                    </ul>
                  </div>
                  <div
                    className={
                      "dropdown " +
                      (this.props.listState.authenticationInfo.isLogin !== true
                        ? "Display-none"
                        : "")
                    }
                  >
                    <button className="dropbtn">Q</button>
                    <div className="dropdown-content">
                      <p
                        className={
                          "Logout-button " +
                          (this.props.listState.authenticationInfo.isLogin !==
                          true
                            ? "Display-none"
                            : "")
                        }
                        onClick={this._dispatchReduxLogOut.bind(this)}
                      >
                        Log Out
                      </p>
                      <p
                        className={
                          "Logout-button " +
                          (this.props.listState.authenticationInfo.isLogin !==
                          true
                            ? "Display-none"
                            : "")
                        }
                        onClick={this._dispatchReduxLogOut.bind(this)}
                      >
                        Profile
                      </p>
                    </div>
                  </div>

              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

// listState : tên đặt cho danh sách các state mà lấy ra được từ store
// state là danh sách tất cả các state => có thể lấy riêng rẽ => state.isLogin

const HeaderWithRouter = withRouter(HeaderComponent);

const mapStateToProps = state => {
  return {
    listState: state
  };
};

// isLogin == true => đã login
const mapDispatchToProps = dispatch => {
  return {
    dispatchReduxLogOut: _dispatchReduxLogout =>
      dispatch(Login(_dispatchReduxLogout))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderWithRouter);

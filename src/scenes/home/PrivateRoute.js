import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingComponent from "../../components/public_router/LoadingComponent/LoadingComponent";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {} from "../../service/storeage-service";
import { ckeckTokenService } from "../../service/login-service";
import NotificationPermissionComponent from "../../components/public_router/NotificationPermissionComponent/NotificationPermissionComponent";
import { Base64 } from "js-base64";
class _PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAcces: false,
      loaded: false
    };
  }

  componentWillMount() {
    this.checkAcces();
  }

  checkAcces = () => {
    const { history, authed, roleRouter , currentRole} = this.props;
    let tokenInLocalStorage = localStorage.getItem("token");
    console.log(currentRole,roleRouter);
    // ĐÃ ĐĂNG NHẬP VÀ CÓ TOKEN
    if (authed === true && currentRole === roleRouter ) {
      this.setState({ loaded: true, haveAcces: true });
    } else {
      ckeckTokenService(tokenInLocalStorage)
        .then(resCheckToken => {
          console.log(resCheckToken);
          if (
            roleRouter === resCheckToken.data.role &&
            "live" === resCheckToken.data.status
          ) {
            // TOKEN  ĐÚNG VÀ QUYỀN ĐÚNG => BỎ LOADING =>CHO VÀO TRANG PRIVATE
            this.setState({ loaded: true, haveAcces: true });
          } else {
            console.log('TOKEN  ĐÚNG VÀ QUYỀN KHÔNG ĐÚNG');
            // TOKEN  ĐÚNG VÀ QUYỀN KHÔNG ĐÚNG => BỎ LOADING => CHO VÀO TRANG THÔNG BÁO => TRANG THÔNG BÁO SẼ QUYẾT ĐỊNH CÓ CHO ĐĂNG NHẬP TIẾP HAY TRỞ VỀ TRANG TRƯỚC
            this.setState({ loaded: true, haveAcces: false }, () => {
              history.push({
                pathname: "/redirect/without-permission",
                state: { detail: this.props.path },
                errMessage: "tokenExprise"
              });
            });
          }
        })
        .catch(error => {
          // CHƯA ĐĂNG NHẬP => BẮT ĐĂNG NHẬP
          // 404: Not found - không tìm thấy
          // 401: Unauthorized - Không có quyền
          // 403: Forbidden - Bị cấm truy nhập:
          const errCode = parseInt(error.response && error.response.status);
          if (errCode === 403) {
            this.setState(
              {
                loaded: true,
                haveAcces: false
              },
              () => {
                // token không  đúng
                history.push({
                  pathname: "/redirect/without-permission",
                  state: { detail: this.props.path },
                  errCode: "403"
                });
              }
            );
          }
        });
    }
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, haveAcces } = this.state;
    return loaded === true ? (
      <Route
        {...rest}
        render={props => {
          return haveAcces === true ? (
            <Route path={this.props.path} component={this.props.component} />
          ) : (
            <Route component={LoadingComponent} />
          );
        }}
      />
    ) : (
      <Route component={LoadingComponent} />
    );
  }
}

const PrivateRoute = withRouter(_PrivateRoute);

const mapStateToProps = state => {
  return {
    listState: state
  };
};

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);

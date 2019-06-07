import React, { Component } from "react";
import "./LoginComponent.css";
import "./LoginComponentMore.css";
import { Button } from "react-bootstrap";

import {
  _validateEmail,
  _maxLength,
  _minLength
} from "../../../../configs/validates";
import { AccoutLoginModel } from "../../../../model/userinfo.model";
import {
  loginService,
  ckeckTokenService
} from "../../../../service/login-service";
import {
  setStorageService,
  getStorageService
} from "../../../../service/storeage-service";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Login } from "../../../../redux/actions/checkAuthorizeAction";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      typeuser: "customer",

      passwordInputFocus: false,
      emailInputFocus: false,

      passwordInputLostFocus: false,
      emailInputLostFocus: false,

      resMessage: "",
      redirectToReferrer: false,
      showPass: false,
      componentDidMount: false,
      isFirst: true,
      from: "/",
      registerSuccess : false,
      tokenExprise: false,
      isLoading: false
    };
  }

  _selectTypeUser(typeUser) {
    this.setState({
      typeuser: typeUser,
      resMessage: ""
    });
  }

  _dispatchReduxLogin(authenticationInfo) {
    this.props.dispatchReduxLogin(authenticationInfo);
  }

  componentWillMount(){
    if(this.props.location.statusRegister != undefined && this.props.location.statusRegister === "success" ){
      this.setState({registerSuccess : true})
    }
    if( this.props.location.tokenExprise != undefined && this.props.location.tokenExprise === "tokenExprise"){
      this.setState({tokenExprise : true})
    }
  }

  componentDidMount() {
    // lưu pathname của private => đăng nhập xong => chuyển sang
    let token = localStorage.getItem("token");
    if (this.props.location.state !== undefined) {
      let prePathName = this.props.location.state.detail.detail;
      this.setState({
        from: { pathname: prePathName} 
      });
    } else {
      this.setState({ from: { pathname: "/" } });
    }

    if (token !== null && token !== "token invalid") {
      ckeckTokenService(token).then(statusToken => {
        console.log(statusToken.data)
        if (statusToken.data.status === 'live' ) {
          this._dispatchReduxLogin({ isLogin: true, role: statusToken.data.role});
          this.setState({ redirectToReferrer: true, isLoading: false }, () => {console.log(this.state.redirectToReferrer)});
        }
        else if (statusToken.data.status !== 'live'){
          this.setState({tokenExprise : true});
        }
      });
    } else {
      this._dispatchReduxLogin({ isLogin: false, role: null});
      this.setState({ redirectToReferrer: false });
    }
  }

  _loginWithUserAccount(pass, email, type) {
    let userAccount = new AccoutLoginModel();
    userAccount.password = pass;
    userAccount.type = type;
    userAccount.email = email;
    this.setState({isLoading: true}, () => {
      loginService(userAccount).then(resLogin => {
        console.log(resLogin);
        if (resLogin !== undefined && resLogin.data.result === false) {
          this.setState({ resMessage: resLogin.data.message, isLogin: false, role: null, isLoading: false   });

        } else if (resLogin.data.result === true) {
          setStorageService("typeUser", userAccount.type);
          setStorageService("token", resLogin.data.token).then(() => {
            this._dispatchReduxLogin({isLogin: true, role : resLogin.data.role});
            ToastsStore.success("Đăng nhập thành công !");
            this.setState({ redirectToReferrer: true, isLoading: false });
          });
        }
      }).catch(
        (errLogin) => {
          console.log(errLogin);
          this._dispatchReduxLogin({ isLogin: false, role: null, isLoading: false  });
          ToastsStore.error("Có lỗi xảy ra, hãy đăng nhập lại !");
        } 
      )
    });
  }

  render() {
    const { redirectToReferrer, from } = this.state;

    if (true === redirectToReferrer) {
      return <Redirect to={from} />;
    } else if (false === redirectToReferrer) {
      return (
        <div className="SignIn-component">
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
          <div className="limiter Background-login">
            <div className="container-login100 Background-form-login">
            <p className= {"success-register-text " + ( this.state.registerSuccess === true ? "" : "Display-none")}>Bạn vừa đăng kí thành công tài khoản mới, hãy đăng nhập với tài khoản vừa tạo</p>
            <p className= {"success-register-text " + ( this.state.tokenExprise === true ? "" : "Display-none")}>Phiên đăng nhập của bạn đã kết thúc, vui lòng đăng nhập lại.</p>
              <div className="wrap-login100 p-l-50 p-r-50 p-t-62 p-b-33 Scaledow-form-login">
                <form className="login100-form validate-form flex-sb flex-w">
                  <span className="login100-form-title p-b-15">Đăng nhập</span>

                  {/* email */}
                  <div className="p-t-13 p-b-9">
                    <span className="txt1">Email</span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100 fs-25"
                      type="email"
                      name="email"
                      onChange={email => {
                        this.setState({
                          email: email.target.value,
                          resMessage: ""
                        });
                      }}
                      onBlur={() => {
                        this.setState({ emailInputLostFocus: true });
                      }}
                      onFocus={() => {
                        this.setState({ emailInputFocus: true });
                      }}
                    />
                    <div
                      className={
                        "Input-invalid " +
                        (this.state.emailInputLostFocus === true &&
                        this.state.emailInputFocus === true &&
                        _validateEmail(this.state.email) === false
                          ? "Display-block"
                          : "Display-none")
                      }
                    >
                      Bạn phải nhập đúng định dạng Email( VD: @gmail.com )
                    </div>
                    <span className="focus-input100" />
                  </div>

                  {/* password */}
                  <div className="p-t-13 p-b-9">
                    <span className="txt1">Mật khẩu</span>

                    <a href="/" className="txt2 bo1 m-l-5">
                      Forgot?
                    </a>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100 fs-25"
                      type="password"
                      name="password"
                      onChange={password => {
                        this.setState({
                          password: password.target.value,
                          resMessage: ""
                        });
                      }}
                      onBlur={() => {
                        this.setState({ passwordInputLostFocus: true });
                      }}
                      onFocus={() => {
                        this.setState({ passwordInputFocus: true });
                      }}
                    />
                    <div
                      className={
                        "Input-invalid " +
                        (this.state.passwordInputLostFocus === true &&
                        this.state.passwordInputFocus === true &&
                        _maxLength(30, this.state.password) === false &&
                        _minLength(4, this.state.password) === false
                          ? "Display-block"
                          : "Display-none")
                      }
                    >
                      Bạn phải nhập mật khẩu tối thiểu 4 kí tự và tối đa 30 kí
                      tự
                    </div>
                    <span className="focus-input100" />
                  </div>

                  <div className="p-t-13 p-b-9">
                    <span className="txt1">Loại tài khoản</span>
                  </div>
                  <div className="wrap-input100 Switch-type-user">
                    <Button
                      className={
                        "btn-type-user-login m-b-20 " +
                        (this.state.typeuser === "customer" ? "Active-bg" : "")
                      }
                      onClick={this._selectTypeUser.bind(this, "customer")}
                    >
                      Người dùng
                    </Button>
                    <Button
                      className={
                        "btn-type-user-login m-b-20 " +
                        (this.state.typeuser === "provider" ? "Active-bg" : "")
                      }
                      onClick={this._selectTypeUser.bind(this, "provider")}
                    >
                      Người bán
                    </Button>

                    <Button
                      className={
                        "btn-type-user-login m-b-20 " +
                        (this.state.typeuser === "admin" ? "Active-bg" : "")
                      }
                      onClick={this._selectTypeUser.bind(this, "admin")}
                    >
                      Admin
                    </Button>
                  </div>

                  {/* dang ki that bai */}
                  <div className="p-t-13 p-b-9">
                    <span className="txt1 Input-invalid">
                      {this.state.resMessage}
                    </span>
                  </div>

                  <div className="container-login100-form-btn m-t-17">
                    <Button
                      onClick={this._loginWithUserAccount.bind(
                        this,
                        this.state.password,
                        this.state.email,
                        this.state.typeuser
                      )}
                      className={
                        "login100-form-btn " +
                        (this.state.password === "" ||
                        this.state.email === "" ||
                        _validateEmail(this.state.email) === false
                          ? "Opacity-disable"
                          : "btn-type-user-login-form-valid")
                      }
                      disabled={
                        this.state.isLoading ===  true ||
                        this.state.password === "" ||
                        this.state.email === "" ||
                        _validateEmail(this.state.email) === false
                          ? true
                          : false
                      }
                    >
                       { this.state.isLoading !== true ? <span>Đăng nhập</span> : <span> Loading ...</span>} 
                    </Button>
                    <span className="focus-input100" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    listState: state
  };
};

// isLogin == true => đã login // false => chưa login
const mapDispatchToProps = dispatch => {
  return {
    dispatchReduxLogin: dispatchReduxLogin => dispatch(Login(dispatchReduxLogin))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

// history.js:404 Throttling navigation to prevent the browser from hanging. See https://crbug.com/882238. Command line switch --disable-ipc-flooding-protection can be used to bypass the protection

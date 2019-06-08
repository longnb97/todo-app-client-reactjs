import React, { Component } from "react";
import "./SignUpComponent.css";
import "./SignUpComponentMore.css";
import { Button } from "react-bootstrap";
import { signUpService } from "../../../../service/signup-service";
import { UseInfoModel } from "../../../../model/userinfo.model";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import {
  _validateEmail,
  _maxLength,
  _minLength
} from "../../../../configs/validates";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      userJob: "",
      userCompany: "",

      usernameInputFocus: false,
      passwordInputFocus: false,
      emailInputFocus: false,

      usernameInputLostFocus: false,
      passwordInputLostFocus: false,
      emailInputLostFocus: false,

      resMessage: "",
      componentDidMount: false
    };  }

  componentDidMount() {
    // fix err when brower auto save username and password
    setTimeout(() => {
      this.setState({ componentDidMount: true });
    }, 1000);
  }

  _registerUserInfo(name, pass, email, job, company) {
    let userInfo = new UseInfoModel();
    userInfo.username = name;
    userInfo.password = pass;
    userInfo.email = email;
    userInfo.job = job ;
    userInfo.company = company ;
    console.log(userInfo);
    signUpService(userInfo)
      .then(resRegister => {
        console.log(resRegister);
        if (resRegister != undefined && resRegister.data.success == false) {
          ToastsStore.error(resRegister.data.message);
          this.setState({ resMessage: resRegister.data.message });
        } else if (resRegister != undefined && resRegister.data.success == true) {
          ToastsStore.success("Đăng kí thành công !");
          this.props.history.push({
            pathname: "/login",
            statusRegister: "success"
          });
        }
      })
      .catch(e => {
        ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
      });
   }

  render() {
    return (
      <div className="SignIn-component">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="limiter Background-login">
          <div className="container-login100 Background-form-login">
            <div className="wrap-login100 p-l-50 p-r-50 p-t-62 p-b-33 Scaledow-form-login">
              <form className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-15">Đăng kí</span>

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

                  <a href="#" className="txt2 bo1 m-l-5">
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
                    Bạn phải nhập mật khẩu tối thiểu 4 kí tự và tối đa 30 kí tự
                  </div>
                  <span className="focus-input100" />
                </div>

                {/* username */}
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Tên tài khoản</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100 fs-25"
                    type="text"
                    name="username"
                    onChange={username => {
                      this.setState({
                        username: username.target.value,
                        resMessage: ""
                      });
                    }}
                    onBlur={() => {
                      this.setState({ usernameInputLostFocus: true });
                    }}
                    onFocus={() => {
                      this.setState({ usernameInputFocus: true });
                    }}
                  />
                  <div
                    className={
                      "Input-invalid " +
                      (this.state.usernameInputLostFocus === true &&
                      this.state.usernameInputFocus === true &&
                      _maxLength(30, this.state.username) === false &&
                      _minLength(4, this.state.username) === false
                        ? "Display-block"
                        : "Display-none")
                    }
                  >
                    Bạn phải nhập Tên tài khoản tối thiểu 4 kí tự và tối đa 30
                    kí tự
                  </div>
                  <span className="focus-input100" />
                </div>

                {/* user job */}
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Công việc</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100 fs-25"
                    type="text"
                    name="userjob"
                    onChange={userJob => {
                      this.setState({
                        userJob: userJob.target.value,
                        resMessage: ""
                      });
                    }}
                  />
                  <span className="focus-input100" />
                </div>

                {/* user company */}
                <div className="p-t-31 p-b-9">
                  <span className="txt1">Tên công ty</span>
                </div>
                <div className="wrap-input100 validate-input">
                  <input
                    className="input100 fs-25"
                    type="text"
                    name="usercompany"
                    onChange={userCompany => {
                      this.setState({
                        userCompany: userCompany.target.value,
                        resMessage: ""
                      });
                    }}
                    onBlur={() => {
                      this.setState({ usernameInputLostFocus: true });
                    }}
                    onFocus={() => {
                      this.setState({ usernameInputFocus: true });
                    }}
                  />
                  <span className="focus-input100" />
                </div>

                {/* dang ki that bai */}
                <div className="p-t-13 p-b-9">
                  <span className="txt1 Input-invalid">
                    {this.state.resMessage}
                  </span>
                </div>

                <div className="container-login100-form-btn m-t-27px">
                  <Button
                    onClick={this._registerUserInfo.bind(
                      this,
                      this.state.username,
                      this.state.password,
                      this.state.email,
                      this.state.userJob,
                      this.state.userCompany
                    )}
                    className={
                      "login100-form-btn " +
                      (this.state.username === "" ||
                      this.state.password === "" ||
                      this.state.email === "" ||
                      _validateEmail(this.state.email) === false
                        ? "Opacity-disable"
                        : "btn-type-user-form-valid")
                    }
                    disabled={
                      this.state.username === "" ||
                      this.state.password === "" ||
                      this.state.email === "" ||
                      _validateEmail(this.state.email) === false
                        ? true
                        : false
                    }
                  >
                    Đăng kí
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

export default SignUpComponent;

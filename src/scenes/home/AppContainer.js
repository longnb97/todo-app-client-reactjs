import React, { Component } from "react";
import "./AppContainer.css";
import {
  createBrowserHistory
} from 'history'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { getStorageService } from "../../service/storeage-service";
import { ckeckTokenService } from "../../service/login-service";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers/rootReduces";
import { Login } from "../../redux/actions/checkAuthorizeAction";
import { Button } from "react-bootstrap";

import HeaderComponent from "../../components/public_router/HeaderComponent/HeaderComponent";
import LoginComponent from "../../components/private_router/General/LoginComponent/LoginComponent";
import SignUpComponent from "../../components/private_router/General/SignUpComponent/SignUpComponent";
import NoMatchComponent from "../../components/public_router/NoMatchComponent/NoMatchComponent";
import HomeComponent from "../../components/public_router/HomeComponent/HomeComponent";
import ListProductOfUserComponent from "../../components/private_router/Customer/ListProductOfUserComponent/ListProductOfUserComponent";
import LoadingComponent from "../../components/public_router/LoadingComponent/LoadingComponent";
import PrivateRoute from "./PrivateRoute";
// admin
import FooterWithRouter from "../../components/public_router/FooterComponent/FooterComponent";
import ManageCategoryComponent from "../../components/private_router/Admin/ManageCategoryComponent/ManageCategoryComponent";
import ManageDiscountComponent from "../../components/private_router/Admin/ManageDiscountComponent/ManageDiscountComponent";
import ManagePaymentComponent from "../../components/private_router/Admin/ManagePaymentComponent/ManagePaymentComponent";
import ManageUserComponent from "../../components/private_router/Admin/ManageUserComponent/ManageUserComponent";
import NotificationPermissionComponent from "../../components/public_router/NotificationPermissionComponent/NotificationPermissionComponent";
// provider
import ManageProductComponent from "../../components/private_router/Provider/ManageProduct/ManageProduct";


//customer



// Create store
const store = createStore(rootReducer);

// appContainer => 1 pageForm
// khi mới vào app => check isAuthenticated để đưa vào trong private Router như 1 prop => xác định có cho router đến k

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: undefined
    };
  }

  componentWillMount() {
     console.log(store.getState().authenticationInfo);
    window.addEventListener("scroll", this._handleScroll);
    // check token dang nhap
    getStorageService("token").then(token => {
      if (token !== null && token !== "token invalid") {
        ckeckTokenService(token).then(statusToken => {
          //console.log(statusToken)
          if (statusToken.data.status === 'live' ) {
            store.dispatch(Login({ isLogin: true, role: statusToken.data.role}));
            this.setState({ isAuthenticated: true });
          }
        });
      } else {
        store.dispatch(Login({ isLogin: false, role: null}));
        this.setState({ isAuthenticated: false }, () => {
          //console.log(this.state.isAuthenticated);
        });
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  _handleScroll(event) {
    let Header = document.getElementById("Header");
    let wrapRouter = document.getElementById("Wrap-router");
    let searchHeader = document.getElementById("Search-header");
    let headerMenu = document.getElementById("Header-menu");
    let detailMenu = document.getElementById("Menu-detail") ;  


    let positionScrollBar = window.scrollY;
    // console.log(positionScrollBar)
    if (positionScrollBar < 45 ) {
      if( detailMenu !== null){
        detailMenu.classList.remove("Display-none");
      }
      if (positionScrollBar < 25) {
        wrapRouter.style.marginTop = 0;
        Header.classList.remove("Position-fixed");
        searchHeader.classList.remove("Style-search-header");
        headerMenu.classList.remove("Style-menu-header");
      }
    } else {
      wrapRouter.style.marginTop = "90px";
      Header.classList.add("Position-fixed");
      searchHeader.classList.add("Style-search-header");
      headerMenu.classList.add("Style-menu-header");
      if( detailMenu !== null){
        detailMenu.classList.add("Display-none");
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router basename={'/beego/'} >
          <div className="App-container">
            <HeaderComponent />
            {/* chú ý private router => nếu pass props thông thường (auth = {isAuthenticated}) => không nhận dc
                https://tylermcginnis.com/react-router-pass-props-to-components/  */}
            <div id="Wrap-router">
              <Switch>
                <Route history={createBrowserHistory} path="/" exact component={HomeComponent} />
                <Route path="/signup" exact component={SignUpComponent} />
                <Route path="/login" exact component={LoginComponent}/>
                {/* Provider */}
                <PrivateRoute  path="/provider/manage/product" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "provider" component={ManageProductComponent} />
                {/* Customer */}
                <PrivateRoute path="/customer/list-product-of-user"  exact  authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter="customer" component={ListProductOfUserComponent} />                  
               
                {/* Admin */}
                <PrivateRoute  path="/admin/manage" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "admin" component={ManageUserComponent} />
                <PrivateRoute  path="/admin/manage/user-account" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "admin" component={ManageUserComponent} />
                <PrivateRoute  path="/admin/manage/category" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "admin" component={ManageCategoryComponent} />
                <PrivateRoute  path="/admin/manage/discount" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "admin" component={ManageDiscountComponent} />
                <PrivateRoute  path="/admin/manage/payment" exact authed={store.getState().authenticationInfo.isLogin} currentRole={store.getState().authenticationInfo.role} roleRouter = "admin" component={ManagePaymentComponent} />
               
                <Route path="/redirect/without-permission" exact component={NotificationPermissionComponent}/>
                <Route component={NoMatchComponent} />
              </Switch>
            </div>
            <FooterWithRouter />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
//Router https://www.sitepoint.com/react-router-v4-complete-guide/
// 1337x.to

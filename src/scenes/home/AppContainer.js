import React, { Component } from "react";
import "./AppContainer.css";
import { createBrowserHistory } from "history";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers/rootReduces";
import { Login } from "../../redux/actions/checkAuthorizeAction";

import HeaderComponent from "../../components/public_router/HeaderComponent/HeaderComponent";
import LoginComponent from "../../components/private_router/General/LoginComponent/LoginComponent";
import SignUpComponent from "../../components/private_router/General/SignUpComponent/SignUpComponent";
import NoMatchComponent from "../../components/public_router/NoMatchComponent/NoMatchComponent";
import HomeComponent from "../../components/public_router/HomeComponent/HomeComponent";

import FooterWithRouter from "../../components/public_router/FooterComponent/FooterComponent";
import NotificationPermissionComponent from "../../components/public_router/NotificationPermissionComponent/NotificationPermissionComponent";
import TaskComponent from "../../components/public_router/TaskComponent/TaskComponent";

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
    // getStorageService("token").then(token => {
    //   if (token !== null && token !== "token invalid") {
    //     ckeckTokenService(token).then(statusToken => {
    //       //console.log(statusToken)
    //       if (statusToken.data.status === 'live' ) {
    //         store.dispatch(Login({ isLogin: true, role: statusToken.data.role}));
    //         this.setState({ isAuthenticated: true });
    //       }
    //     });
    //   } else {
    //     store.dispatch(Login({ isLogin: false, role: null}));
    //     this.setState({ isAuthenticated: false }, () => {
    //       //console.log(this.state.isAuthenticated);
    //     });
    //   }
    // });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  _handleScroll(event) {
    let Header = document.getElementById("Header");

    let positionScrollBar = window.scrollY;
    // console.log(positionScrollBar)
    if (positionScrollBar < 45) {
      Header.classList.remove("Position-fixed");
    } else {
      Header.classList.add("Position-fixed");
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App-container">
            <HeaderComponent />
            <div id="Wrap-router">
              <Switch>
                <Route
                  history={createBrowserHistory}
                  path="/"
                  exact
                  component={HomeComponent}
                />
                <Route path="/signup" exact component={SignUpComponent} />
                <Route path="/login" exact component={LoginComponent} />
                <Route path="/task/:id" exact component={TaskComponent} />

                <Route
                  path="/redirect/without-permission"
                  exact
                  component={NotificationPermissionComponent}
                />
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

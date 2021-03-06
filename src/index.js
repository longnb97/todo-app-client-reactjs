import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter, Route, Link } from "react-router-dom";
import AppContainer from "./scenes/home/AppContainer";

ReactDOM.render(
  <BrowserRouter>
      <AppContainer />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

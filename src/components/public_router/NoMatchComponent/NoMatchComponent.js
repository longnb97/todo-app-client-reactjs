import React, { Component } from "react";
import "./NoMatchComponent.css";
import "./NoMatchComponentMore.css";
import {  Button } from "react-bootstrap";

class NoMatchComponent extends Component {
  render() {
    return (
      <div className="NoMatch-component">
        <div className="limiter">
          <div className="container-login100  Background-login">
            <div className="wrap-login100  wrap-login100 p-l-50 p-r-50 p-t-62 p-b-33">
             
                   <img src={require("../../../assets/image/page-not-found.jpg")} className="Width-img"/>
                   {/* <Button
                      type='button'
                      onClick={() => { this.props.history.push('/') }}
                    >
                      Click Me!
                    </Button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoMatchComponent;

import React, { Component } from "react";
import "./HomeComponent.css";
import { getInfoUserLocal } from "../../../service/login-service";
import { ListProject } from "./ListProject/ListProject";

class HomeComponent extends Component {

  componentDidMount(){
    var userInfo = getInfoUserLocal();
    console.log(userInfo);
  } 
  render() {
    return (
      <div className="Home-component">
          <div
            className="container-home"
          >
            <ListProject />
            
          </div>
 
      </div>
    );
  }
}

export default HomeComponent;

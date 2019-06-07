import React, { Component } from "react";
import { SliderCategory } from "./SliderCategory/SliderCategory";
import "./HomeComponent.css";
import { SliderAdvert } from "./SliderAdvert/SliderAdvert";
import { ListIProduct } from "./ListIProduct/ListIProduct";

class HomeComponent extends Component {
  componentDidMount(){
  } 
  render() {
    return (
      <div className="Home-component">
          <div
            className="container-home"
          >
            <SliderAdvert />
            <SliderCategory />
            <ListIProduct />
            <ListIProduct />
            <ListIProduct />
            <ListIProduct />
          </div>
 
      </div>
    );
  }
}

export default HomeComponent;

import React from "react";
import Slider from "react-slick";
import "./ListIProduct.css";
import { Row, Col, Button } from "react-bootstrap";
import ReadMoreReact from 'read-more-react';

export class ListIProduct extends React.Component {
  _sliceText(text, max){
    if (  text.length > max ) {  return text.slice(0, max) + "..."; }
    else {return  text }

  }
  render() {
    return (
      <div className="full-width">
        <p className="title-slider-category">Danh mục sản phẩm</p>
        <Row className="no-margin">
          <Col xs={12} sm={6} md={4} lg={3} className="no-padding">
            <div className="cartProductCover">
              <div className="cartProduct">
                <div className="crop">
                  <img src={require("../../../../assets/image/product.jpg")} />
                </div>
                <p className="name-product">
                  {this._sliceText("Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng", 56)}
                    {/* <ReadMoreReact  min={10} max={100} readMoreText={"Xem thêm"} text={"Tên Sp: Tên sản phẩm: Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng"} /> */}
                </p>
               
                <div>
                  <span className="cost" > Giá: 50000đ</span>
                  <span className="sell-number" > 1000 đã bán</span>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3} className="no-padding">
            <div className="cartProductCover">
              <div className="cartProduct">
                <div className="crop">
                  <img src={require("../../../../assets/image/product.jpg")} />
                </div>
                <p className="name-product">
                  {this._sliceText("Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng", 56)}
                    {/* <ReadMoreReact  min={10} max={100} readMoreText={"Xem thêm"} text={"Tên Sp: Tên sản phẩm: Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng"} /> */}
                </p>
               
                <div>
                  <span className="cost" > Giá: 50000đ</span>
                  <span className="sell-number" > 1000 đã bán</span>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3} className="no-padding">
            <div className="cartProductCover">
              <div className="cartProduct">
                <div className="crop">
                  <img src={require("../../../../assets/image/product.jpg")} />
                </div>
                <p className="name-product">
                  {this._sliceText("Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng", 56)}
                    {/* <ReadMoreReact  min={10} max={100} readMoreText={"Xem thêm"} text={"Tên Sp: Tên sản phẩm: Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng"} /> */}
                </p>
               
                <div>
                  <span className="cost" > Giá: 50000đ</span>
                  <span className="sell-number" > 1000 đã bán</span>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3} className="no-padding">
            <div className="cartProductCover">
              <div className="cartProduct">
                <div className="crop">
                  <img src={require("../../../../assets/image/product.jpg")} />
                </div>
                <p className="name-product">
                  {this._sliceText("Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng", 56)}
                    {/* <ReadMoreReact  min={10} max={100} readMoreText={"Xem thêm"} text={"Tên Sp: Tên sản phẩm: Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng"} /> */}
                </p>
               
                <div>
                  <span className="cost" > Giá: 50000đ</span>
                  <span className="sell-number" > 1000 đã bán</span>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} sm={6} md={4} lg={3} className="no-padding">
            <div className="cartProductCover">
              <div className="cartProduct">
                <div className="crop">
                  <img src={require("../../../../assets/image/product.jpg")} />
                </div>
                <p className="name-product">
                  {this._sliceText("Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng", 56)}
                    {/* <ReadMoreReact  min={10} max={100} readMoreText={"Xem thêm"} text={"Tên Sp: Tên sản phẩm: Xịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắngXịt trống nắng"} /> */}
                </p>
               
                <div>
                  <span className="cost" > Giá: 50000đ</span>
                  <span className="sell-number" > 1000 đã bán</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

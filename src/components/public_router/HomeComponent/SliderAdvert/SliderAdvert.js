import React from "react";
import Slider from "react-slick";
import "./SliderAdvert.css";
import { Row, Col, Button } from "react-bootstrap";

export class SliderAdvert extends React.Component {
  render() {
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div className="full-width">
        <p className="title-slider-category">Danh mục sản phẩm</p>
        <Row className="no-margin">
          <Col xs={12} sm={12} md={8} lg={8} className="no-padding">
            <Slider {...settings}>
              <div className="cartItem">
                1
              </div>
              <div className="cartItem">
               2
              </div>
            </Slider>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4} className="no-padding advert-right">
            <div className="advert-child">
                1
            </div>
            <div className="advert-child">
                1
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

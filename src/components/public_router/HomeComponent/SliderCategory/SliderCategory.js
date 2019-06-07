import React from "react";
import Slider from "react-slick";
import "./SliderCategory.css"

export class SliderCategory extends React.Component {
    render() {
        const settings = {
          infinite: true,
          speed: 1000,
          slidesToShow: 8,
          slidesToScroll: 2,
          dots: false,
        };
        return (
          <div className ="full-width">
            <p className="title-slider-category">Danh mục sản phẩm</p>
            <Slider {...settings}>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>
              <div className="cartItemCover">
                <div className="squareCartItem">
                <h3>1</h3>
                </div>
              </div>

            </Slider>
          </div>
        );
      }
    }
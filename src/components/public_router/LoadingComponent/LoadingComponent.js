import React, { Component } from "./node_modules/react";
import "./LoadingComponent.css";
import LoadingOverlay from "./node_modules/react-loading-overlay";
import RingLoader from "./node_modules/react-spinners/RingLoader";
import ClipLoader from './node_modules/react-spinners/ClipLoader';
import { css } from './node_modules/@emotion/core';
 
// https://www.react-spinners.com/
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;
class LoadingComponent extends Component {

  render() {
    return (
      <div className="full-screen">
        <LoadingOverlay
          active={true}
          fadeSpeed= {500}
          spinner={<RingLoader 
            className="spiner"
            css={override}
            sizeUnit={"px"}
            size={70}
            color={'#ffffff'}
          />}
          text="Đang kiểm tra dữ liệu"
        >
        </LoadingOverlay>
      </div>
    );
  }
}

export default LoadingComponent;

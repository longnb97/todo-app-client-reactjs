import React, { Component } from "react";
import "./ManageProduct.css";
import { Row, Col, Button, Table, Modal, Dialog } from "react-bootstrap";
import cancelRequest, {
  getListCategoryWithPermision
} from "../../../../service/admin-service";
import Spinner from "react-spinner-material";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import { ProductInfoModel } from "../../../../model/productinfo.model";
import axios from "axios";
import ReadMoreReact from "read-more-react";
import {
  addNewProduct,
  getAllProductOfCustomer
} from "../../../../service/customer-service";

class ManageProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errGetCategory: {},
      listCategory: [],
      listSourceCategory: [],
      listRootCategory: [],
      processing: false,
      addText: "Thêm mới",
      addSuccess: false,
      showSuccessMessage: false,

      listProduct: [],
      productName: "",
      productCost: "",
      productDescription: "",
      categoryID: "",
      isShowProduct: true,
      maxProductOrder: "",
      quantityProduct: ""
    };
  }

  componentDidMount() {
    this._getListCategoryWithPermision();
    this._getListProductForCustomer();
  }

  _getListProductForCustomer() {
    getAllProductOfCustomer().then(resListProduct => {
      console.log(resListProduct);
      this.setState({ listProduct: resListProduct.data }, () => {
        console.log(this.state.listProduct);
      });
    });
  }

  _interpolationListCategory(arrAll, arrRoot, k) {
    // tạo ra mảng mới kiểu tree bằng cách nội suy từ mảng all category và rootCategory
    let arrResultInterpolation = [...arrRoot]; // deep copy
    let arrParentLength = arrAll.length;
    let arrChildLength = arrRoot.length;
    if (
      arrParentLength === undefined ||
      arrChildLength === undefined ||
      arrParentLength === 0 ||
      arrChildLength === 0
    ) {
      return 0;
    } else if (arrAll.length > 0 && arrRoot.length > 0) {
      arrRoot.forEach((arrRootElement, index) => {
        let newArrChild = [];
        // loop
        arrAll.forEach((arrAllElement, i) => {
          if (
            arrAllElement.parentId !== null &&
            arrAllElement.parentId._id === arrRootElement._id
          ) {
            newArrChild.push(arrAllElement);
          }
        });

        arrRoot[index].child = newArrChild;
        arrRoot[index].level = k + 1;
        this._interpolationListCategory(
          arrAll,
          newArrChild,
          arrRoot[index].level
        );
      });
    }
    return arrResultInterpolation;
  }

  _getListCategoryWithPermision() {
    axios
      .all([
        getListCategoryWithPermision("all", 0, 350),
        getListCategoryWithPermision("root", 0, 350)
      ])
      .then(arrListCategory => {
        this.setState({
          listSourceCategory: arrListCategory[0].data,
          listRootCategory: arrListCategory[1].data
        });
        let convertDataListCategory = this._interpolationListCategory(
          arrListCategory[0].data,
          arrListCategory[1].data,
          0
        );
        this.setState({ listCategory: convertDataListCategory });
      })
      .catch(e => this.setState({ errGetCategory: e }));
  }

  _renderSelectCategory(listCategory) {
    let listOption;
    if (listCategory.length > 0) {
      listOption = listCategory.map((itemCategory, index) => {
        let listOptionTG;
        // chèn thêm 1 dấu cách vào trước option
        if (itemCategory.level === 1) {
          listOptionTG = (
            <option
              key={"level-" + itemCategory._id}
              value={itemCategory._id}
              className={"option-level-" + itemCategory.level}
            >
              {itemCategory.name}
            </option>
          );
        } else if (itemCategory.level === 2) {
          listOptionTG = (
            <option
              key={"level-" + itemCategory._id}
              value={itemCategory._id}
              className={"option-level-" + itemCategory.level}
            >
              &nbsp;&nbsp; {itemCategory.name}
            </option>
          );
        } else if (itemCategory.level === 3) {
          listOptionTG = (
            <option
              key={"level-" + itemCategory._id}
              value={itemCategory._id}
              className={"option-level-" + itemCategory.level}
            >
              &nbsp;&nbsp;&nbsp;&nbsp; {itemCategory.name}
            </option>
          );
        } else if (itemCategory.level === 4) {
          listOptionTG = (
            <option
              key={"level-" + itemCategory._id}
              value={itemCategory._id}
              className={"option-level-" + itemCategory.level}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {itemCategory.name}
            </option>
          );
        } else if (itemCategory.level === 4) {
          listOptionTG = (
            <option
              key={"level-" + itemCategory._id}
              value={itemCategory._id}
              className={"option-level-" + itemCategory.level}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {itemCategory.name}
            </option>
          );
        }

        // nội suy
        if (itemCategory.child !== undefined && itemCategory.child.length > 0) {
          listOptionTG = [
            listOptionTG,
            this._renderSelectCategory(itemCategory.child)
          ];
          return listOptionTG;
        } else {
          return listOptionTG;
        }
      });
    }
    return listOption;
  }

  _renderListProduct(listProduct) {
    let listProductDetail;
    listProductDetail = listProduct.map((product, index) => (
      // chèn thêm 1 dấu cách vào trước option
      <tr key={"level-" + product._id}>
       <td>{product.name} </td>
        <td>{product.description} </td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td>{product.maxOrder}</td>
        <td>
          <Button className="edit-button">Edit</Button>
          <Button className="delete-button">Del</Button>
        </td>
      </tr>
    ));

    return listProductDetail;
  }

  validateData() {
    let validateErr = "";
    if (
      this.state.productName === "" ||
      this.state.productCost === "" ||
      this.state.quantityProduct === "" ||
      this.state.maxProductOrder === "" ||
      this.state.quantityProduct === ""
    ) {
      validateErr += "Bạn phải nhập đủ các trường";
    }
  }
  _addNewProduct() {
    // console.log(this.state.productName, this.state.productCost, this.state.productDescription, this.state.quantityProduct,this.state.maxProductOrder, this.state.categoryID)
    let newProduct = new ProductInfoModel(
      this.state.productName,
      this.state.productCost,
      this.state.productDescription,
      this.state.maxProductOrder,
      this.state.quantityProduct,
      this.state.categoryID,
      false,
      true
    );
    this.setState({ processing: true, showSuccessMessage: false }, () => {
      let newProduct = new ProductInfoModel(
        this.state.productName,
        this.state.productCost,
        this.state.productDescription,
        this.state.maxProductOrder,
        this.state.quantityProduct,
        this.state.categoryID,
        false,
        true
      );

      addNewProduct(newProduct)
        .then(resNewsProduct => {
          if (resNewsProduct.data.message === "Add Product success") {
            this.setState(
              {
                productName: "",
                productCost: "",
                productDescription: "",
                maxProductOrder: "",
                quantityProduct: "",
                addSuccess: true,
                showSuccessMessage: true,
                processing: false
              },
              () => {
                let listProduct = this.state.listProduct;
                let newListProduct = listProduct.concat([resNewsProduct.data.data]);
                this.setState( {listProduct : newListProduct});
                ToastsStore.success("Thêm category thành công");
              }
            );
          }
        })
        .catch(errData => {
          this.setState({
            processing: false,
            addSuccess: false,
            showSuccessMessage: false
          });
          ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
          console.log(errData);
        });
    });
  }

  render() {
    return (
      <div className="Profile-component">
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />

        <div className="container-login100 Profile">
          <Row>
            <Col xs={12} sm={4} md={4} lg={3} className="col-padding-top">
              <div className="tab-add-category">
                <p className="title-tab">Thêm mới SẢN PHẨM</p>
                <p className="sub-title"> Tên sản phẩm</p>
                <input
                  className="input-style"
                  type="text"
                  value={this.state.productName}
                  onFocus={() => {
                    this.setState({ showSuccessMessage: false });
                  }}
                  onChange={productName => {
                    this.setState({ productName: productName.target.value });
                  }}
                  name="category-name"
                />
                {/* Giá sản phẩm */}
                <p className="sub-title">
                  {" "}
                  Giá sản phẩm{" "}
                  <span className="text-primary">( vd: 10000đ )</span>
                </p>
                <input
                  className="input-style input-style-currence"
                  type="text"
                  placeholder="đ"
                  value={this.state.productCost}
                  onFocus={() => {
                    this.setState({ showSuccessMessage: false });
                  }}
                  onChange={productCost => {
                    this.setState({ productCost: productCost.target.value });
                  }}
                  name="category-name"
                />
                {/* Mô tả sản phẩm */}
                <p className="sub-title"> Mô tả sản phẩm</p>

                <textarea
                  className="input-style textarea-min-height"
                  rows="4"
                  cols="50"
                  value={this.state.productDescription}
                  onFocus={() => {
                    this.setState({ showSuccessMessage: false });
                  }}
                  onChange={productDes => {
                    this.setState({
                      productDescription: productDes.target.value
                    });
                  }}
                />

                <p className="sub-title">
                  Số lượng tối đa cho phép đặt mỗi lần
                </p>
                <input
                  className="input-style"
                  type="text"
                  value={this.state.maxProductOrder}
                  onFocus={() => {
                    this.setState({ showSuccessMessage: false });
                  }}
                  onChange={maxOrder => {
                    this.setState({ maxProductOrder: maxOrder.target.value });
                  }}
                  name="category-name"
                />

                <p className="sub-title"> Số sản phẩm bán</p>
                <input
                  className="input-style"
                  type="text"
                  value={this.state.quantityProduct}
                  onFocus={() => {
                    this.setState({ showSuccessMessage: false });
                  }}
                  onChange={slProduct => {
                    this.setState({ quantityProduct: slProduct.target.value });
                  }}
                  name="category-name"
                />

                <p className="sub-title"> Category cha</p>
                <select
                  className="input-style"
                  onChange={parentId =>
                    this.setState({
                      parentCategoryID: parentId.target.value,
                      categoryID: parentId.target.value
                    })
                  }
                >
                  <option key="no-parent" value="">
                    Không có
                  </option>
                  {this.state.listCategory.length > 0 ? (
                    this._renderSelectCategory(this.state.listCategory)
                  ) : (
                    <option className="text-danger">Lỗi load data</option>
                  )}
                </select>
                {/* <p className="note-select">
                  Không có: Sản phẩm không thuộc Category nào.
                </p> */}
                <p className="sub-title">Trạng thái sản phẩm</p>
                <div className="check-isShow">
                  <input
                    name="isShowProduct"
                    type="checkbox"
                    checked={this.state.isShowProduct}
                    onChange={() =>
                      this.setState(
                        {
                          isShowProduct: !this.state.isShowProduct
                        },
                        () => {
                          // console.log(this.state.isShowProduct);
                        }
                      )
                    }
                  />
                  <span>Cho phép người dùng có thể nhìn thấy sản phẩm</span>
                </div>
                <div>
                  {/* processing */}
                  <div
                    className={
                      "Processing " +
                      (this.state.processing === true
                        ? "block"
                        : "display-none")
                    }
                  >
                    <Spinner
                      size={20}
                      spinnerColor={"#3d9191"}
                      spinnerWidth={4}
                      visible={true}
                    />
                    <span>Processing ...</span>
                  </div>

                  {/* responseMessage */}
                  <div
                    className={
                      "Processing " +
                      (this.state.processing === false &&
                      this.state.showSuccessMessage === true
                        ? "block"
                        : "display-none") +
                      (this.state.addSuccess === true ? " SUCCESS" : " FAIL")
                    }
                  >
                    <i
                      className={
                        this.state.addSuccess === true
                          ? "far fa-check-circle"
                          : "far fa-times-circle"
                      }
                    />
                    <span>
                      {" "}
                      {this.state.addSuccess === true
                        ? "Thành công"
                        : "Thất bại"}{" "}
                    </span>
                  </div>

                  <button
                    className="button-add"
                    disabled={this.setState.processing}
                    onClick={this._addNewProduct.bind(this)}
                  >
                    {this.state.addText}
                  </button>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={8} md={8} lg={9} className="col-padding-top">
              <div className="tab-list-category">
                <p className="title-tab">Danh sách Category</p>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Tên Sản phẩm</th>
                      <th>Mô tả Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số sản phẩm đang bán</th>
                      <th>Số sp / 1 lần mua</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this._renderListProduct(this.state.listProduct)}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ManageProductComponent;

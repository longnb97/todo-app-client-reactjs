import React, { Component } from "react";
import "./EditTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
 
// task 1 1
class EditTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      isOpenForm: false,
      taskEdit: {},
      editOption: 0,
      formTitle: ""
  
    };
    this._openForm = this._openForm.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this._openForm);
   
  }

  _openForm(){
      let isOpenForm = this.state.isOpenForm;
      this.setState({isOpenForm :  !isOpenForm }, () =>{
        if (this.state.isOpenForm === true){
          let task = this.props.taskEdit;
          this.setState({taskEdit : task, editOption : 1, formTitle: "Chỉnh sửa nhãn"}, () => console.log(this.props.taskEdit))
        }
      });
      
  }

  renderLoadingData(getDataSuccess) {
    return (
      <div
        className={getDataSuccess === false ? "spinnerClass" : "d-none"}
      >
        <Spinner
          size={30}
          spinnerColor={"#0052cc"}
          spinnerWidth={2}
          visible={true}
          className="spinerCustom"
        />
        <p className="text-center text-loading">Đang tải xuống ...</p>
      </div>
    );
  }

  selectEditTask(optionIndex) {
    console.log(optionIndex);
    // eslint-disable-next-line default-case
    switch (optionIndex) {
      case 1:
          this.setState({editOption : 1, formTitle: "Chỉnh sửa nhãn"});
        break;
      case 2:
          this.setState({editOption : 2 , formTitle: "Thay đổi thành viên"})
        break;
      case 3:
          this.setState({editOption : 3 , formTitle: "Di chuyển" })
        break;
      case 4:
          this.setState({editOption : 4 , formTitle: "Thay đổi ngày hết hạn"})
        break;
    }
  }

  render() {
    return (
      <div className= { this.state.isOpenForm === true ? "edit-task-component" : "d-none-width-height" }  >
        <div className="edit-task">
          <div className="menu-edit-task">
            <button className= {"menu-item " + (this.state.editOption === 1 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 1)}> Chỉnh sửa nhãn </button>
            <button className= {"menu-item " + (this.state.editOption === 2 ? "menu-item-active" : "")}  onClick={this.selectEditTask.bind(this, 2)}> Thay đổi thành viên</button>
            <button className= {"menu-item " + (this.state.editOption === 3 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 3)}> Di chuyển </button>
            <button className= {"menu-item " + (this.state.editOption === 4 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 4)}> Thay đổi ngày hết hạn</button>
            <button className="menu-item text-danger" id = "exit-button" onClick={this._openForm.bind(this)}> Thoát</button>
          </div>
          <div className="form-edit-task">
            <p className="title-form">{this.state.formTitle}</p>
            <div className="form-detail">
                <div className= {"" + (this.state.editOption === 1 ? "d-block" : "d-none")} >
                   <h4>Mô tả: </h4> 
                  <h5 className="text-success"> {this.state.taskEdit.description} </h5>
                  <input type="text" className="input-edit" />
                  <button className="accept-button">Thay đổi</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTaskComponent;

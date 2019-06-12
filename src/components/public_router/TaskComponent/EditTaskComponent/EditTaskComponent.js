import React, { Component } from "react";
import "./EditTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";

class EditTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      listTaskToDo: [],
      listTaskDoing: [],
      listTaskDone: [],
      getDataSuccess: false,
      isOpenForm: false
    };
    this.openForm = this.openForm.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this.openForm);
  }

  openForm(){
      let isOpenForm = this.state.isOpenForm;
      this.setState({isOpenForm :  !isOpenForm });
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

  selectEditTask(optionIndex){
    console.log(optionIndex)
  } 

  render() {
    return (
      <div className= { this.state.isOpenForm === true ? "edit-task-component" : "d-none-width-height" }  >
        <div className="edit-task">
          <div className="menu-edit-task">
            <button className="menu-item" onClick={this.selectEditTask.bind(this, 1)}> Chỉnh sửa nhãn </button>
            <button className="menu-item" onClick={this.selectEditTask.bind(this, 2)}> Thay đổi thành viên</button>
            <button className="menu-item" onClick={this.selectEditTask.bind(this, 3)}> Di chuyển </button>
            <button className="menu-item" onClick={this.selectEditTask.bind(this, 4)}> Thay đổi ngày hết hạn</button>
            <button className="menu-item" onClick={this.openForm.bind(this)}> Thoát</button>
          </div>
          <div className="form-edit-task">
            <p className="title-form">Chỉnh sửa nhãn</p>
            <div className="form-detail">
                <p></p>
              <input type="text" className="input-edit" />
              <button className="accept-button">Thay đổi</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTaskComponent;

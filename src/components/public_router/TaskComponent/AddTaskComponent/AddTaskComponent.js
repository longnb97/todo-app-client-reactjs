import React, { Component } from "react";
import "./AddTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
import {RadioGroup, Radio} from 'react-radio-group';

class AddTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      isOpenFormAdd: false,
      taskEdit: {
        status: "doing.gif"
      },
      editOption: 0,
      formTitle: "", 
      changeSuccess: false
    };
    this._openForm = this._openForm.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this._openForm);
   
  }

  _openForm(){
      let isOpenFormAdd = this.state.isOpenFormAdd;
      this.setState({isOpenFormAdd :  !isOpenFormAdd }, () =>{
        if (this.state.isOpenFormAdd === true){
          let task = this.props.taskEdit;
          this.setState({taskEdit : task, editOption : 1, formTitle: "Chỉnh sửa nhãn"}, () => console.log(this.props.taskEdit))
        }
      });
      
  }

  renderLoadingData(loading, size, text) {
    return (
      <div
        className={loading === true ? "spinnerClass" : "d-none"}
      >
        <Spinner
          size={size}
          spinnerColor={"#0052cc"}
          spinnerWidth={2}
          visible={true}
          className="spinerCustom"
        />
        <p className="text-center text-loading">{text}</p>
      </div>
    );
  }


  selectEditTask(optionIndex) {
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

  changeStatusTask(status){
    let taskEdited = Object.assign({}, this.state.taskEdit);
    taskEdited.status = status;
    this.setState({ taskEdit: taskEdited, loading : true} , () => {  console.log(this.state.taskEdit)})
  }

  render() {
    return (
      <div className= { this.state.isOpenFormAdd === true ? "edit-task-component" : "d-none-width-height" }  >
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
                  <h4>Mô tả </h4> <hr/>
                  <h5 className="task-description"> {this.state.taskEdit.description} </h5> <hr/>
                  <h5>Nhập mô tả mới: </h5>
                  <input type="text" className="input-edit" />
                  <button className="accept-button">Thay đổi</button>
                </div>

                <div className= {"" + (this.state.editOption === 2 ? "d-block" : "d-none")} >
                  <h4>Các thành viên thực hiện</h4><hr/>
                  <h5 className="task-description"> {this.state.taskEdit.description} </h5> <hr/>
                  <input type="text" className="input-edit" />
                  <button className="accept-button">Thay đổi</button>
                </div>

                <div className= {"" + (this.state.editOption === 3 ? "d-block" : "d-none")} >
                  <h4>Trạng thái của task</h4> <hr/>
                  <h5 className= { "task-description " + 
                      (this.state.taskEdit.status === "doing" ? "text-primary " : "") +
                      (this.state.taskEdit.status === "todo" ? "text-success " : "") +
                      (this.state.taskEdit.status === "done" ? "text-danger " : "")
                  }> 
                  
                  <img src = {require("../../../../assets/image/icon/todo.gif")} className= { "img-gif " +(this.state.taskEdit.status !== "todo" ? "d-none" : "")}/>
                  <img src = {require("../../../../assets/image/icon/doing.gif")} className= { "img-gif " +(this.state.taskEdit.status !== "doing" ? "d-none" : "")}/>
                  <img src = {require("../../../../assets/image/icon/done.gif")} className= { "img-gif " +(this.state.taskEdit.status !== "done" ? "d-none" : "")}/>

                  {this.state.taskEdit.status} 
                  </h5> <hr/> 

                  <h4>Thay đổi trạng thái </h4><br/>
                  <div className="pos-relative">
                    <div className= {(this.state.changeSuccess === true ? "disable-radio-group" : "d-none")}></div>
                    <RadioGroup name="status" onChange={(value) => this.changeStatusTask(value)} >
                      <Radio value="todo" />&nbsp; Trong tiến trình<br/>
                      <Radio value="doing" />&nbsp; Đang thực hiện<br/>
                      <Radio value="done" />&nbsp; Đã hoàn thành<br/>
                    </RadioGroup>
                  </div>

                  <br/>
                  {this.renderLoadingData(this.state.changeSuccess, 30, "Đang xử lý ...")}
                  <p className="text-primary">Đã thay đổi trạng thái thành công</p>
                  <p className="text-danger">Thay đổi trạng thái không thành công</p>
                </div>


                <div className= {"" + (this.state.editOption === 4 ? "d-block" : "d-none")} >
                  <h4>Thời gian hết hạn: </h4> <hr/>
                  <h5 className="task-due_date"> {this.state.taskEdit.due_date} </h5> <hr/>
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

export default AddTaskComponent;

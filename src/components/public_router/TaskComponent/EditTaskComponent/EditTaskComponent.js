import React, { Component } from "react";
import "./EditTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
 
<<<<<<< HEAD
// task 1 1
=======
// task
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
class EditTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
<<<<<<< HEAD
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
      
=======
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
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
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

<<<<<<< HEAD
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
=======
  selectEditTask(optionIndex){
    console.log(optionIndex)
  } 
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609

  render() {
    return (
      <div className= { this.state.isOpenForm === true ? "edit-task-component" : "d-none-width-height" }  >
        <div className="edit-task">
          <div className="menu-edit-task">
<<<<<<< HEAD
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
                   <h4>Mô tả: </h4> <hr/>
                  <h5 className="task-description"> {this.state.taskEdit.description} </h5> <hr/>
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
                  <h4>Trạng thái của task:  </h4> <hr/>
                  <h5 className="task-description"> {this.state.taskEdit.status} </h5> <hr/>
                  <input type="text" className="input-edit" />
                  <button className="accept-button">Thay đổi</button>
                </div>


                <div className= {"" + (this.state.editOption === 4 ? "d-block" : "d-none")} >
                  <h4>Thời gian hết hạn: </h4> <hr/>
                  <h5 className="task-due_date"> {this.state.taskEdit.due_date} </h5> <hr/>
                  <input type="text" className="input-edit" />
                  <button className="accept-button">Thay đổi</button>
                </div>

=======
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
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTaskComponent;

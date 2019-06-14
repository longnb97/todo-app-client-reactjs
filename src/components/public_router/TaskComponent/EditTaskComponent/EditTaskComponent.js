import React, { Component } from "react";
import "./EditTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
import {RadioGroup, Radio} from 'react-radio-group';
import { updateTask, deleteTask } from "../../../../service/task-service";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import moment from "moment";

class EditTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      isOpenFormEdit: false,
      editingTask: false,
      editSuccess: "", // true -> hien thi success; false => hien thi loi; "" => khong hien gi
      taskEdit: {
        status: "doing.gif"
      },
      currentStatus : "", // trạng thái ban đầu của taskEdit
      editOption: 0,
      formTitle: "", 
      changeSuccess: false,
      newTaskName: "",
      newTaskStatus: "",
      newtaskDueDate: ""
    };
    this.openFormEditTask = this.openFormEditTask.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this.openFormEditTask);
  }

  formatTime(time) {
    if (time) {
      return moment(time)
        .format("DD/MM/YYYY")
        .toString();
    } else {
      return "_ _ _";
    }
  }

  resetData(){
    this.setState({
      newTaskName: "",
      newTaskStatus: "",
      newtaskDueDate: "",
      editingTask: false,
      editSuccess: ""
    })
  }

  openFormEditTask(){
      this.resetData();
      let isOpenFormEdit = this.state.isOpenFormEdit;
      this.setState({isOpenFormEdit :  !isOpenFormEdit }, () =>{
        if (this.state.isOpenFormEdit === true){
          let task = this.props.taskEdit;
          this.setState({currentStatus: this.props.taskEdit.status ,taskEdit : task, editOption : 1, formTitle: "Chỉnh sửa nhãn"})
        }
      });    
  }

  sendTaskEditedToParent(task, methodName, currentStatus){
    this.props.childSendTaskEdit(task, methodName, currentStatus);
  }


  deleteTask(){
    this.setState({editingTask : true, editSuccess: ""});
    if (this.state.taskEdit.id !== "" && this.state.taskEdit.id !== undefined){
      deleteTask(this.state.taskEdit.id).then(
        resDelete => {
          console.log(resDelete);
          if(resDelete.data.success === 1){
                this.setState({ editingTask : false , editSuccess: true});
                this.sendTaskEditedToParent(this.state.taskEdit,'delete', this.state.currentStatus);
                ToastsStore.success("Đã xóa task thành công");
                this.openFormEditTask(); 
          }
        }
      ).catch(
        e => {
          this.setState({ editingTask : false , editSuccess: false}, () => {ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");});
        }
      )
    }
  }

  editTask(){
    this.setState({editingTask : true, editSuccess: ""});
    let taskEdit = {
      id : this.state.taskEdit.id,
      owner : this.state.taskEdit.owner,
      dueDate : this.state.taskEdit.due_date,
      due_date : this.state.taskEdit.due_date,
      projectId : this.state.taskEdit.project_id,
      project_id : this.state.taskEdit.project_id,
      status : this.state.taskEdit.status,
      description : this.state.taskEdit.description,
      image : this.state.taskEdit.image,
      active : this.state.taskEdit.active
    };

    // data edit
    taskEdit.description = this.state.newTaskName === "" ? this.state.taskEdit.description : this.state.newTaskName;
    taskEdit.status = this.state.newTaskStatus === "" ? this.state.taskEdit.status :  this.state.newTaskStatus ;

    taskEdit.dueDate = this.state.newtaskDueDate ==="" ?  this.state.taskEdit.due_date : this.state.newtaskDueDate;
    taskEdit.due_date = this.state.newtaskDueDate ==="" ?  this.state.taskEdit.due_date : this.state.newtaskDueDate; 

    // this.setState({taskEdit : taskEdit, editingTask : false , editSuccess: true});
    // this.sendTaskEditedToParent(taskEdit, "edit", this.state.currentStatus);// send new task to update at taskComponent
    
    updateTask(taskEdit, taskEdit.id).then(
      resUpdateTask => {
        console.log(taskEdit);
        console.log(resUpdateTask);
        if(resUpdateTask.data.success === 1){
          this.setState({taskEdit : taskEdit, editingTask : false , editSuccess: true});

          this.sendTaskEditedToParent(taskEdit, "edit", this.state.currentStatus);// send new task to update at taskComponent
          ToastsStore.success("Đã edit task thành công");
        }
        else{
          this.setState({taskEdit : taskEdit, editingTask : false , editSuccess: false});
          ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
        }
      }
    ).catch(
      e =>{
        this.setState({editSuccess: false});
        ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
      }
    )

  }

  changeStatusTask(status){
    this.setState({newTaskStatus : status}, () => {
      this.editTask();
    })
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
    // eslint-disabled-next-line default-case
    // eslint-disable-next-line default-case
    this.setState({editSuccess : ""})
    switch (optionIndex) {
      case 1:
        this.setState({ editOption: 1, formTitle: "Chỉnh sửa nhãn" });
        break;
      case 2:
        this.setState({ editOption: 2, formTitle: "Thay đổi thành viên" });
        break;
      case 3:
        this.setState({ editOption: 3, formTitle: "Di chuyển" });
        break;
      case 4:
        this.setState({ editOption: 4, formTitle: "Thay đổi ngày hết hạn" });
        break;
      case 5:
        this.setState({ editOption: 5, formTitle: "Xóa Task" });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className= { this.state.isOpenFormEdit === true ? "edit-task-component" : "d-none-width-height" }  >
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="edit-task">
          <div className="menu-edit-task">
            <button disabled = {this.state.editingTask === true ? true: false} className= {"menu-item " + (this.state.editOption === 1 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 1)} > Chỉnh sửa nhãn </button>
            <button disabled = {this.state.editingTask === true ? true: false} className= {"menu-item " + (this.state.editOption === 2 ? "menu-item-active" : "")}  onClick={this.selectEditTask.bind(this, 2)} > Thay đổi thành viên</button>
            <button disabled = {this.state.editingTask === true ? true: false} className= {"menu-item " + (this.state.editOption === 3 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 3)} > Di chuyển </button>
            <button disabled = {this.state.editingTask === true ? true: false} className= {"menu-item " + (this.state.editOption === 4 ? "menu-item-active" : "")} onClick={this.selectEditTask.bind(this, 4)} > Thay đổi ngày hết hạn</button>
            <button disabled = {this.state.editingTask === true ? true: false} className= {"menu-item text-danger delete-button " + (this.state.editOption === 5 ? "menu-item-del-active" : "")} onClick={this.selectEditTask.bind(this, 5)}> Xóa Task</button>
            <button disabled = {this.state.editingTask === true ? true: false} className="menu-item text-danger delete-button "  onClick={this.openFormEditTask.bind(this)}> Thoát</button>
          </div>
          <div className="form-edit-task">
            <p className="title-form">{this.state.formTitle}</p>
            <div className="form-detail">
                <div className= {"" + (this.state.editOption === 1 ? "d-block" : "d-none")} >
                  <h4>Mô tả </h4> <hr/>
                  <h5 className="task-description"> {this.state.taskEdit.description} </h5> <hr/>
                  <h5>Nhập mô tả mới: </h5>
                  <input type="text" className="input-edit" name="newTaskName" 
                    value = {this.state.newTaskName}
                    onChange={e =>
                        this.setState({ newTaskName: e.target.value })
                    }
                  />
                  <hr/>
                  <p className={ this.state.editSuccess === true ? "text-primary" : "d-none" }>Đã thay đổi trạng thái thành công</p>
                  <p className={ this.state.editSuccess === false ? "text-danger" : "d-none" }>Thay đổi trạng thái không thành công</p>

                  <button disabled = {this.state.editingTask === true ? true: false} className="accept-button" onClick={this.editTask.bind(this)} >
                  {this.state.editingTask === true ? 'Đang lưu các thay đổi của bạn ...': 'Thay đổi'}
                  </button>
                </div>

                <div className= {"" + (this.state.editOption === 2 ? "d-block" : "d-none")} >
                  <h4>Các thành viên thực hiện</h4><hr/>
                  <h5 className="task-description"> {this.state.taskEdit.description} </h5> <hr/>
                  <input type="text" className="input-edit" />
                  <hr/>
                  <p className={ this.state.editSuccess === true ? "text-primary" : "d-none" }>Đã thay đổi trạng thái thành công</p>
                  <p className={ this.state.editSuccess === false ? "text-danger" : "d-none" }>Thay đổi trạng thái không thành công</p>
                  <button disabled = {this.state.editingTask === true ? true: false } className="accept-button" onClick={this.editTask.bind(this)} >
                    {this.state.editingTask === true ? 'Đang lưu các thay đổi của bạn ...': 'Thay đổi'}
                  </button>
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
                    <div className= {(this.state.editingTask === true ? "disabled-radio-group" : "d-none")} ></div>
                    <RadioGroup name="status" onChange={(value) => this.changeStatusTask(value)} >
                      <Radio value="todo" />&nbsp; Trong tiến trình<br/>
                      <Radio value="doing" />&nbsp; Đang thực hiện<br/>
                      <Radio value="done" />&nbsp; Đã hoàn thành<br/>
                    </RadioGroup>
                  </div>
                  <br/><hr/>
                  {this.renderLoadingData(this.state.editingTask, 30, "Đang xử lý ...")}
                  <p className={ this.state.editSuccess === true ? "text-primary" : "d-none" }>Đã thay đổi trạng thái thành công</p>
                  <p className={ this.state.editSuccess === false ? "text-danger" : "d-none" }>Thay đổi trạng thái không thành công</p>
                </div>


                <div className= {"" + (this.state.editOption === 4 ? "d-block" : "d-none")} >
                  <h4>Thời gian hết hạn: </h4> <hr/>
                  <h5 className="task-due_date"> {this.formatTime(this.state.taskEdit.due_date)} </h5> <hr/>
                  <input
                      className="input-text input-date-edit"
                      type="date"
                      // dateFormat= 'yy-mm-dd'
                      onChange={e => { this.setState({ newtaskDueDate: e.target.value })} }
                    />{" "}
                    dd/mm/yyyy
                    <br /><hr/>
                  <p className={ this.state.editSuccess === true ? "text-primary" : "d-none" }>Đã thay đổi trạng thái thành công</p>
                  <p className={ this.state.editSuccess === false ? "text-danger" : "d-none" }>Thay đổi trạng thái không thành công</p>
                  <button disabled  = {this.state.editingTask === true || this.state.newtaskDueDate ==="" ? true : false} className="accept-button" onClick={this.editTask.bind(this)} >
                    {this.state.editingTask === true ? 'Đang lưu các thay đổi của bạn ...': 'Thay đổi'}
                  </button>
                </div>

                <div className= {"" + (this.state.editOption === 5 ? "d-block" : "d-none")} >
                  <h4 className = "text-danger">Bạn có chắc muốn xóa task này đi chứ !</h4><hr/>
                  <img src={require("../../../../assets/image/icon/delete.png")} className="del-icon"/>
                  <hr/>
                  <p className={ this.state.editSuccess === false ? "text-danger" : "d-none" }>Xóa không thành công</p>
                  <button disabled = {this.state.editingTask === true ? 1 : 0} className="accept-delete-button" onClick={this.deleteTask.bind(this)} >
                    {this.state.editingTask === true ? 'Đang xóa ...': 'Xóa'}
                  </button>
                </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditTaskComponent;

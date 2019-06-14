import React, { Component } from "react";
import "./AddTaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
import { RadioGroup, Radio } from "react-radio-group";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getInfoUserLocal } from "../../../../service/login-service";
import { addNewTask } from "../../../../service/task-service";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class AddTaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      isOpenFormAdd: false,
      editOption: 0,
      formTitle: "Thêm mới công việc",
      creatingTask: false,
      taskDescription: "",
      ownerId: "",
      taskDueDate: "",
      taskImg: "",
      withoutFieldVal : false,
      errAddTask: false
    };
    this._openForm = this._openForm.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this._openForm);
    let userInfo = getInfoUserLocal();
    if (userInfo !== undefined) {
      this.setState({ ownerId: userInfo.id });
    }
    this.setState({ taskDueDate: moment().format("YYYY-MM-DD") });
  }

  resetData(){
    this.setState({
      taskDescription: "",
      taskImg: "",
      errAddTask: false
    })
  }

  createNewTask() {
    let newTask = {
      projectId: this.props.projetId,
      project_id: this.props.projetId,
      owner: this.state.ownerId,
      dueDate: this.state.taskDueDate,
      due_date: this.state.taskDueDate,
      status: this.props.tasksNameAdded,
      description: this.state.taskDescription,
      image:
        this.state.taskImg !== ""
          ? this.state.taskImg
          : "https://haihoa.emmasoft.com.vn/artgallery/download?folder=collections&file=s%C3%A2n%20ph%C6%A1i%20htx.jpg"
    };
    console.log(newTask);
    if (newTask.project_id === "" || newTask.description === "") {
      this.setState({
        withoutFieldVal : true
      })
      ToastsStore.error("Có lỗi xảy ra, hãy kiểm tra bạn nhập đủ dữ liệu chưa !");
    }
    else{
      this.setState({ creatingTask: true, withoutFieldVal: false , errAddTask: false}, () => {
        addNewTask(newTask)
          .then(resCreateTask => {
            if (resCreateTask.data.success === 1) {
              this.sendNewTaskToParent(newTask, "create");// send new task to update at taskComponent
              ToastsStore.success("Thêm task thành công");
              this.resetData();
              this.setState({ creatingTask: false }, () => this._openForm());
            }
            else{
              console.log(resCreateTask.data.message)
              this.setState({ creatingTask: false, errAddTask: true });
              ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
            }
          })
          .catch(e => {
            this.setState({ creatingTask: false, errAddTask: true });
            ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
            console.log(e);
          });
      });
    }
  }

  _openForm() {
    let isOpenFormAdd = this.state.isOpenFormAdd;
    this.setState({ isOpenFormAdd: !isOpenFormAdd });
    this.resetData();
  }

  renderLoadingData(loading, size, text) {
    return (
      <div className={loading === true ? "spinnerClass" : "d-none"}>
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

  sendNewTaskToParent(task, methodName){
    this.props.childSendNewTask(task, methodName, null);// thêm task vào đâu (cột nào)
  }


  render() {
    return (
      <div
        className={
          this.state.isOpenFormAdd === true
            ? "edit-task-component"
            : "d-none-width-height"
        }
      >
        <ToastsContainer
          store={ToastsStore}
          position={ToastsContainerPosition.TOP_RIGHT}
        />
        <div className="edit-task">
          <div className="form-edit-task">
            <p className="title-form-add">{this.state.formTitle}</p>
            <div className="form-detail">
              <span>Mô tả công việc &nbsp;&nbsp;: </span>
              <input
                className="input-text"
                onChange={e =>
                  this.setState({ taskDescription: e.target.value })
                }
                value = {this.state.taskDescription}
                type="text"
                name="descriptionTask"
              />
              <br />
              <span>Thời gian kết thúc : </span>
              <input
                className="input-text input-date"
                type="date"
                // dateFormat= 'yy-mm-dd'
                value={this.state.taskDueDate}
                onChange={e => this.setState({ taskDueDate: e.target.value })}
              />{" "}
              mm/dd/yyyy
              <br />
              <span>Image công việc :&nbsp; </span>
              <input
                className="input-text"
                type="text"
                onChange={e => this.setState({ taskImg: e.target.value })}
              />
              <div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <img
                      src={require("../../../../assets/image/icon/todo.gif")}
                      className={
                        "img-gif " +
                        (this.props.tasksNameAdded !== "todo" ? "d-none" : "")
                      }
                    />
                    <img
                      src={require("../../../../assets/image/icon/doing.gif")}
                      className={
                        "img-gif " +
                        (this.props.tasksNameAdded !== "doing" ? "d-none" : "")
                      }
                    />
                    <img
                      src={require("../../../../assets/image/icon/done.gif")}
                      className={
                        "img-gif " +
                        (this.props.tasksNameAdded !== "done" ? "d-none" : "")
                      }
                    />
                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <hr />
                    <h5>{this.props.tasksNameAdded == "todo" ? "Đang trong tiến trình rồi, chuẩn bị làm rồi. Sếp lại bắt em làm luôn đúng không." :"" }</h5>
                    <h5>{this.props.tasksNameAdded == "doing" ? "Đang làm rồi, sắp ra thóc rồi, sắp được về với vợ con rồi, cố lên!" :"" }</h5>
                    <h5>{this.props.tasksNameAdded == "done" ? "Xong rồi đấy sếp" :"" }</h5>
                  </div>
                </div>

                <p className={"text-danger " + (this.state.withoutFieldVal === true ? "d-block" : "d-none")}>Bạn phải nhập đủ các trường</p>
                <p className={"text-danger " + (this.state.errAddTask === true ? "d-block" : "d-none")}>Có lỗi xảy ra, kiểm tra kết nối mạng và thử lại !</p>
                <hr />
                <button
                  onClick={this.createNewTask.bind(this)}
                  className="btn-create"
                  disabled={
                    this.state.creatingTask === true ||
                    this.state.taskDescription === ""
                        ? true
                        : false
                    }
                  >
                    {this.state.creatingTask === true ? "Creating ..." : "Create"}
                  </button>
                  <button
                    id="exit-add-button"
                  onClick={this._openForm.bind(this)}
                  className = {this.state.creatingTask === true ? "d-none" : ""}
                >
                  {" "}
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTaskComponent;

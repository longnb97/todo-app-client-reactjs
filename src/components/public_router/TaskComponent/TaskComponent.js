/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable default-case */
import React, { Component } from "react";
import "./TaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { getAllTaskByProjectId } from "../../../service/task-service";
import Spinner from "react-spinner-material";
import EditTaskComponent from "./EditTaskComponent/EditTaskComponent";
import AddTaskComponent from "./AddTaskComponent/AddTaskComponent";
import moment from "moment";
import TaskCommentComponent from "./TaskComentComponent/TaskCommentComponent";
import { getAllUserInProject } from "../../../service/comment-service";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

//heroku
class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      listUserInProject: [],
      listTaskToDo: [],
      listTaskDoing: [],
      listTaskDone: [],
      getDataSuccess: false,
      openFormEditTask: false,
      classFormEdit: "d-none-width-height",
      taskEdit: {},
      tasksNameAdded: "", // add của cột nào
      tasksNameEdited: "", // edit của cột nào
      getListNullOrErr : false
    };
    this.openFormEditTaskFromParent = this.openFormEditTaskFromParent.bind(this);
    this.openFormAddTaskFromParent = this.openFormAddTaskFromParent.bind(this);
    this.openTaskComentFromParent = this.openTaskComentFromParent.bind(this);
  }

  componentDidMount() {
    // this._getAllUserInProject();
    this._getAllTask();
    if (this.props.match.params.id === undefined) {
      this.setState({ noPram: true });
    }
  }

  _getAllUserInProject(){
    getAllUserInProject(this.props.match.params.id).then(
      resUsers => {
        if (resUsers && resUsers.success === 1){
          this.setState({listUserInProject :resUsers.data.data })
        }
        else{
          ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
        }
      }
    ).catch(
      e => {
        console.log('Lấy danh sách user thất bại');
        ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
      }
    )
  }

  _getAllTask() {
    let listTaskToDo = [],
      listTaskDoing = [],
      listTaskDone = [];
    getAllTaskByProjectId(this.props.match.params.id).then(result => {
      let tasks = result.data.data;
      if (tasks && tasks.length > 0) {
        tasks.forEach((task, index) => {
          if (task.status === "doing") {
            listTaskDoing.push(task);
          } else if (task.status === "todo") {
            listTaskToDo.push(task);
          } else if (task.status === "done") {
            listTaskDone.push(task);
          }
        });
        this.setState(
          {
            listTaskToDo: listTaskToDo,
            listTaskDoing: listTaskDoing,
            listTaskDone: listTaskDone,
            getDataSuccess: true,
            getListNullOrErr: false
          }
        );
      }
    }).catch(
      e => {
        console.log(e);
        ToastsStore.error("Có lỗi xảy ra, hãy thử lại !");
        this.setState({getListNullOrErr: true, getDataSuccess : true})
      }
    )
  }

  openFormEditTaskFromParent() {}
  openFormAddTaskFromParent() {}
  openTaskComentFromParent(){}

  passTaskItemToEditTaskComponent(task) {
    this.setState({ taskEdit: task });
  }

  addToListName(nameTasks) {
    this.setState({ tasksNameAdded: nameTasks }, () =>
      console.log(this.state.tasksNameAdded)
    );
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

  renderListTaskDetail(tasks) {
    let listRender = tasks.map((task, index) => (
      <div className="task-cover" key={index} 
         onClick={(e) => { 
            if(e.target && e.target.matches("img.edit-task-img") ){ // tag.className
                // console.log('click img');
              }
              else{
                // console.log('no click img');
                this.passTaskItemToEditTaskComponent(task);this.openTaskComentFromParent(); 
              }
            }
          }
      >
        <div>
          <p className="task-name">
            {task.description}
            <img src={require("../../../assets/image/icon/edit.png")}
              onClick={(e) => { 
                if(e.target && e.target.matches("img.edit-task-img") ){ // tag.className
                    // console.log('click img');
                    this.openFormEditTaskFromParent(); this.passTaskItemToEditTaskComponent(task); 
                  }
                  else{
                    // console.log('no click img')
                    this.openTaskComentFromParent(); 
                  }
                }
              }
              className="edit-task-img"  />
          </p>
          <p className="text-left">
            Ngày hết hạn:{" "}
            <span className="task-due-date"> {this.formatTime(task.due_date)}</span>
          </p>
        </div>
      </div>
    ));
    return listRender;
  }

  deleteItemFormArrById(array, Id) {
    for (var i = 0; i < array.length ; i++) {
      if (array[i].id === Id) {
        array.splice(i, 1);
      }
    }
    return array;
  }

  getTaskFromChild(task, methodName, curentStatus) {
    // sau khi có dữ liệu từ component thêm / sửa / xóa thì cập nhập form main
    if (methodName === "create") {
      switch (task.status) {
        case "todo":
          let listTaskToDo = Object.assign([], this.state.listTaskToDo);
          listTaskToDo.push(task);
          this.setState({ listTaskToDo: listTaskToDo });
          this._getAllTask(); // lấy lại dữ liệu cho chắc ăn
          break;
        case "doing":
          let listTaskDoing = Object.assign([], this.state.listTaskDoing);
          listTaskDoing.push(task);
          this.setState({ listTaskDoing: listTaskDoing });
          this._getAllTask(); // lấy lại dữ liệu cho chắc ăn
          break;
        case "done":
          let listTaskDone = Object.assign([], this.state.listTaskDone);
          listTaskDone.push(task);
          this.setState({ listTaskDone: listTaskDone });
          this._getAllTask(); // lấy lại dữ liệu cho chắc ăn
          break;
        default:
          break;
      }
    } else if (methodName === "edit") {
      // check xem trong trường hợp thay đổi trạng thái thì sẽ phải thay đổi trong mảng nào
      // nếu currentStatus != newStatus(task.status) => xóa mảng cũ đi và thêm vào bảng mới
      let listOld, listNew; // mảng cũ => xóa đi, mảng mới => thêm vào
      switch (task.status) {
        case "todo":
          listNew = "listTaskToDo";
          break;
        case "doing":
          listNew = "listTaskDoing";
          break;
        case "done":
          listNew = "listTaskDone";
          break;
      }
      switch (curentStatus) {
        case "todo":
          listOld = "listTaskToDo";
          break;
        case "doing":
          listOld = "listTaskDoing";
          break;
        case "done":
          listOld = "listTaskDone";
          break;
      }
      // xóa ở mảng cũ và thêm ở mảng mới
      console.log('cu',listOld, 'moi', listNew);

      // xoa phan tu o mang cu
      let listTaskOld = Object.assign([], this.state[listOld]);
      let listTaskOldRemoved = this.deleteItemFormArrById(listTaskOld, task.id) ;
      this.setState({ [listOld]: listTaskOldRemoved });

      // // them vao trong mang moi
      let listTaskNew = Object.assign([], this.state[listNew]);
      listTaskNew.push(task);
      this.setState({ [listNew]: listTaskNew });

    } else if (methodName === "delete") { 
      switch (task.status) {
        case "todo":
          let listTaskToDo = Object.assign([], this.state.listTaskToDo);
          let listTaskToDoRemoved = this.deleteItemFormArrById(listTaskToDo, task.id) ;
          this.setState({ listTaskToDo: listTaskToDoRemoved });
          break;
        case "doing":
          let listTaskDoing = Object.assign([], this.state.listTaskDoing);
          let listTaskDoingRemoved = this.deleteItemFormArrById(listTaskDoing, task.id) ;
          console.log(listTaskDoingRemoved);
          this.setState({ listTaskDoing: listTaskDoingRemoved });
          break;
        case "done":
          let listTaskDone = Object.assign([], this.state.listTaskDone);
          let listTaskDoneRemoved = this.deleteItemFormArrById(listTaskDone, task.id) ;
          this.setState({ listTaskDone: listTaskDoneRemoved });
          break;
        default:
          break;
      }
    }
  }

  renderLoadingData(getDataSuccess, size, text) {
    return (
      <div className={getDataSuccess === false ? "spinnerClass" : "d-none"}>
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

  render() {
    return (
      <div className="Task-component">
        <div className="container-home">
          <p
            className={
              this.state.noPram === false
                ? "display-none"
                : "display-block text-danger"
            }
          >
            Trang web bạn đang truy cập yêu cầu các thông tin cần thiết để xử lý
            dữ liệu, nhưng không tìm thấy. Vui lòng kiểm tra lại, hoặc truy cập
            từ một nguồn xác định
          </p>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
          <Row className="all-task">
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className="No-padding text-center col-custom"
            >
              <p className="col-name">Trong tiến trình</p>
              <hr />
              {this.renderLoadingData(
                this.state.getDataSuccess,
                30,
                "Đang tải xuống ..."
              )}
              {this.renderListTaskDetail(this.state.listTaskToDo)}
              <div
                className={
                  this.state.getDataSuccess === true
                    ? "add-task task-cover"
                    : "d-none"
                }
              >
                <p
                  className="task-name text-center"
                  onClick={() => {
                    this.openFormAddTaskFromParent();
                    this.addToListName("todo");
                  }}
                >
                  <span>+</span> Thêm thẻ khác
                </p>
              </div>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className="No-padding text-center col-custom"
            >
              <p className="col-name">Đang thực hiện</p>
              <hr />
              {this.renderLoadingData(
                this.state.getDataSuccess,
                30,
                "Đang tải xuống ..."
              )}
              {this.renderListTaskDetail(this.state.listTaskDoing)}
              <div
                className={
                  this.state.getDataSuccess === true
                    ? "add-task task-cover"
                    : "d-none"
                }
              >
                <p
                  className="task-name text-center"
                  onClick={() => {
                    this.openFormAddTaskFromParent();
                    this.addToListName("doing");
                  }}
                >
                  <span>+ &nbsp;</span> Thêm thẻ khác
                </p>
              </div>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={4}
              lg={4}
              className="No-padding text-center col-custom"
            >
              <p className="col-name">Đã hoàn thành</p>
              <hr />
              {this.renderLoadingData(
                this.state.getDataSuccess,
                30,
                "Đang tải xuống ..."
              )}
              {this.renderListTaskDetail(this.state.listTaskDone)}
              <div
                className={
                  this.state.getDataSuccess === true
                    ? "add-task task-cover"
                    : "d-none"
                }
              >
                <p
                  className="task-name text-center"
                  onClick={() => {
                    this.openFormAddTaskFromParent();
                    this.addToListName("done");
                  }}
                >
                  <span>+</span> Thêm thẻ khác
                </p>
              </div>
            </Col>
          </Row>

          <EditTaskComponent
            taskEdit={this.state.taskEdit}
            tasksNameAdded={this.state.tasksNameAdded}
            openFormPropEvent={click =>
              (this.openFormEditTaskFromParent = click)
            }
            childSendTaskEdit={this.getTaskFromChild.bind(this)}
          />
          <AddTaskComponent
            tasksNameAdded={this.state.tasksNameAdded} // edit ở cột doing , todo or done
            projetId={this.props.match.params.id}
            childSendNewTask={this.getTaskFromChild.bind(this)}
            openFormPropEvent={click =>
              (this.openFormAddTaskFromParent = click)
            }
          />
          <TaskCommentComponent
            listUserInProject = {this.state.listUserInProject}
            currentTask={this.state.taskEdit}
            openFormPropEvent={click => (this.openTaskComentFromParent = click) }
          />
        </div>
      </div>
    );
  }
}

export default TaskComponent;

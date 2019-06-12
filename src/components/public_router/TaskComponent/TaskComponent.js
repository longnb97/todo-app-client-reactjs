import React, { Component } from "react";
import "./TaskComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { getAllTaskByProjectId } from "../../../service/task-service";
import Spinner from "react-spinner-material";
import EditTaskComponent from "./EditTaskComponent/EditTaskComponent";

class TaskComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      listTaskToDo: [],
      listTaskDoing: [],
      listTaskDone: [],
      getDataSuccess: false,
      openFormEditTask: false,
      classFormEdit: "d-none-width-height",
<<<<<<< HEAD
      taskEdit: {}
    };
    this.openFormChildFromParent = this.openFormChildFromParent.bind(this);
=======
    };
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);
    let listTaskToDo = [],
      listTaskDoing = [],
      listTaskDone = [];

    if (this.props.match.params.id === undefined) {
      this.setState({ noPram: true });
    }

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
            getDataSuccess : true
          },
          () => {
<<<<<<< HEAD
            // console.log(this.state.listTaskDoing, this.state.listTaskToDo);
=======
            console.log(this.state.listTaskDoing, this.state.listTaskToDo);
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
          }
        );
      }
    });
  }

<<<<<<< HEAD
  openFormChildFromParent(){}

  passTaskItemToEditTaskComponent(task){
    this.setState({taskEdit : task})
=======
  openEditForm(){

>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
  }

  renderListTaskDetail(tasks) {
    let listRender = tasks.map((task, index) => (
      <div className="task-cover" key={index}>
        <div>
          <p className="task-name"  
<<<<<<< HEAD
              onClick={() => { this.openFormChildFromParent(); this.passTaskItemToEditTaskComponent(task);}}>
=======
              onClick={() => this.openForm()}>
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
              {task.description} 
              <img src= {require("../../../assets/image/icon/edit.png")}  
              className= "edit-task-img" />
          </p>
          <p className="text-left">Ngày hết hạn: <span className="due-date"> {task.due_date} </span></p>
        </div>
      </div>
    ));
    return listRender;
  }

  renderLoadingData(getDataSuccess) {
    return (
      <div
        className={ getDataSuccess === false ? "spinnerClass" : "d-none"}
      >
        <Spinner
          size={30}
          spinnerColor={"#0052cc"}
          spinnerWidth={2}
          visible={true}
          className="spinerCustom"
        />
        <p className="text-center text-loading">
          Đang tải xuống  ...
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="Task-component" >
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
              {this.renderLoadingData(this.state.getDataSuccess)}
              {this.renderListTaskDetail(this.state.listTaskToDo)}
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
              {this.renderLoadingData(this.state.getDataSuccess)}
              {this.renderListTaskDetail(this.state.listTaskDoing)}
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
              {this.renderLoadingData(this.state.getDataSuccess)}
              {this.renderListTaskDetail(this.state.listTaskDone)}
            </Col>
          </Row>

<<<<<<< HEAD
          <EditTaskComponent taskEdit = {this.state.taskEdit} openFormPropEvent={click => this.openFormChildFromParent = click} />
=======
          <EditTaskComponent openFormPropEvent={click => this.openForm = click} />
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD


export default TaskComponent;

=======
export default TaskComponent;
>>>>>>> d5a53163d61d0a94e376fee27c6fc2b3d27fb609

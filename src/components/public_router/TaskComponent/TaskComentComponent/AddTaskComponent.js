import React, { Component } from "react";
import "./TaskComentComponent.css";
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

class TaskComentComponent extends Component {
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
    this.openFormTaskComent = this.openFormTaskComent.bind(this);
  }

  componentDidMount() {
    // this.props.openFormPropEvent(this._openForm);
    // let userInfo = getInfoUserLocal();
    // if (userInfo !== undefined) {
    //   this.setState({ ownerId: userInfo.id });
    // }
    // this.setState({ taskDueDate: moment().format("YYYY-MM-DD") });
  }

  resetData(){
    this.setState({
      taskDescription: "",
      taskImg: "",
      errAddTask: false
    })
  }

  openFormTaskComent() {
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
            TaskComentComponent
      </div>
    );
  }
}

export default TaskComentComponent;

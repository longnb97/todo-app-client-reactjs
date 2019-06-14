import React, { Component } from "react";
import "./TaskCommentComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
import { RadioGroup, Radio } from "react-radio-group";
import DatePicker from "react-datepicker";
import moment from "moment";
// import { getInfoUserLocal } from "../../../../service/login-service";
import { getAllCommentInTask } from "../../../../service/comment-service";

import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";

class TaskCommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noPram: false,
      isOpenFormAdd: false,
      loadingComment: false
      
    };
    this.openFormTaskComment = this.openFormTaskComment.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this.openFormTaskComment);
    // let userInfo = getInfoUserLocal();
    // if (userInfo !== undefined) {
    //   this.setState({ ownerId: userInfo.id });
    // }
    // this.setState({ taskDueDate: moment().format("YYYY-MM-DD") });
  }

  formatTime(time) {
    if (time) {
      return moment(time)
        .format("DD/MM/YYYY")
        .toString();
    } else {
      return "Không xác định";
    }
  }

  resetData(){
    this.setState({
      taskDescription: "",
      taskImg: "",
      errAddTask: false
    })
  }

  openFormTaskComment() {
    let isOpenFormAdd = this.state.isOpenFormAdd;
    this.setState({ isOpenFormAdd: !isOpenFormAdd });
    if (isOpenFormAdd === false){
      console.log('no mo day', this.props.currentTask);
      // if(this.props.currentTask.id !== null &&  this.props.currentTask.id !== undefined && this.props.currentTask.id !== ""){
      //   console.log('no mo day', this.props.currentTask);
      //   this.setState({loadingComment : true}, () =>{
      //     getAllCommentInTask(this.props.currentTask.id).then(
      //       restComments => {
      //         console.log(this.props.listUserInProject);
      //         console.log(restComments)
      //       }
      //     )
      //   })
      // }
    }
  }

  getInfo(){
    console.log(this.props.currentTask)
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
        <div className="task-comment">
          <p className="btn exit-button" onClick={this.openFormTaskComment}> X </p>
            {/* <p className="btn exit-button" onClick={this.getInfo.bind(this)}> X </p> */}
          <Row className = "Col-reset">
              <Col xs={12} sm={12}  md={8} lg={8} className="no-padding text-center col-project-custom border-col-left" >
              
              </Col>
              <Col xs={12} sm={12}  md={4} lg={4} className="no-padding text-center col-project-custom" >
                <div className= "cover-img">
                  {/* <img className = "img-task" src = {this.props.currentTask.image !== "" && this.props.currentTask.image !== "none" ? this.props.currentTask.image : ""  } alt = "img" /> */}
                  <img className = "img-task" src = "data:image/jpeg;base64,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"/>
                </div>
                <div class="task-info">
                  <p>{this.props.currentTask.id}</p>

                  <p className = "task-description-detail">
                     <span className = "font-bold"> Mô tả : </span><span className="des-text"> Danh nhau khong  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "font-bold">Trạng thái : </span><span className="des-text"> Danh nhau khong  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "font-bold">Bắt đầu : </span><span className="des-text"> 20/5/12  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "font-bold">Kết thúc : </span><span className="des-text"> 20/5/12   </span>
                  </p><hr/>
              </div>
              </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TaskCommentComponent;

// active: 1
// created_at: "2019-06-14 00:23:03"
// description: "Lùi thông, làm tiếp"
// due_date: "2019-06-18"
// id: 13
// image: "none"
// owner: "2"
// project_id: 2
// status: "doing"
// updated_at: "2019-06-14 00:40:27"
// __proto__: Object
import React, { Component } from "react";
import "./TaskCommentComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import Spinner from "react-spinner-material";
import { RadioGroup, Radio } from "react-radio-group";
import DatePicker from "react-datepicker";
import moment from "moment";
import { getInfoUserLocal } from "../../../../service/login-service";
import { getAllCommentInTask , createNewComment } from "../../../../service/comment-service";

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
      loadingComment: false,
      newCommentContent: "",
      listComment : [],
      loadCommentErr: false,
      currentAccount : {},
      sendingComment: false
    };
    this.openFormTaskComment = this.openFormTaskComment.bind(this);
  }

  componentDidMount() {
    this.props.openFormPropEvent(this.openFormTaskComment);
    let currentAccount = getInfoUserLocal();
    this.setState({currentAccount : currentAccount});
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

  addNewComment(){
    let newComment = {
      account_id : this.state.currentAccount.id,
      type : "text",
      content : this.state.newCommentContent,
      task_id : this.props.currentTask.id,
      name: this.state.currentAccount.name,
    }
    this.setState({sendingComment : true}, () => {
      createNewComment(newComment).then(
        resCreateComment =>{
          console.log(resCreateComment.data.success);
          if(resCreateComment.data.success === 1){
            let comments = Object.assign([], this.state.listComment);
            comments.push(newComment);
            this.setState({ listComment:comments , loadCommentErr: this.formatTime,  sendingComment : false, newCommentContent: ""})
          }
        }
      ).catch(
        e => {
          console.log(e);
          this.setState({ sendingComment : false})
        }
      )
    })
  }


  openFormTaskComment() {
    let isOpenFormAdd = this.state.isOpenFormAdd;
    this.setState({ isOpenFormAdd: !isOpenFormAdd ,  listComment : []});
    if (isOpenFormAdd === false){
      setTimeout(() => {
        if(this.props.currentTask.id !== null &&  this.props.currentTask.id !== undefined && this.props.currentTask.id !== ""){
          // console.log('no mo day', this.props.currentTask);
          this.setState({loadingComment : true}, () =>{
            getAllCommentInTask(this.props.currentTask.id).then(
              restComments => {
                if(restComments && restComments.data.success === 1){
                  this.setState({listComment : restComments.data.data, loadCommentErr :false ,loadingComment : false }, () => {console.log(this.state.listComment)})
                }
              }
            ).catch(
              e =>{
                this.setState({listComment : [], loadingComment : false, loadCommentErr : true });
                console.log(e)
              } 
            )
        })
      }
      }, 200);
     
    }
  }

  renderListComment(comments, loading){
    if (loading === true){
      return (
        <div className={"spinnerClass"} >
          <Spinner
            size={30}
            spinnerColor={"#0052cc"}
            spinnerWidth={2}
            visible={true}
          />
          <p className="text-center text-loading">Đang tải ...</p>
        </div>
      )
    }
    else if (loading === false ){
      let listRender = comments.map((comment, index) => (
        <div className = "comment-item" key = {index}>
          <span className="user-name"> {comment.name} </span> &nbsp;&nbsp; <span className="user-comment"> {comment.content}</span>
        </div>
      ));
      return listRender;
    }
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
          <p className="btn exit-button" onClick={this.openFormTaskComment}> <i className="fa fa-times" aria-hidden="true"></i> </p>
          <Row className = "Col-reset">
              <Col xs={12} sm={12}  md={8} lg={8} className="no-padding text-center col-comment-custom border-col-left pos-relative" >
                <div className="cover-coment">
                   {this.renderListComment(this.state.listComment, this.state.loadingComment)}
                   <p className= {this.state.loadCommentErr === true && this.state.loadingComment === false ? "text-danger " : "d-none"}> Có lỗi xảy ra ! </p>
                </div>
                <div className="create-new-comment">
                  <input type="text" className="input-create-comment" name="newCommentContent" 
                    value = {this.state.newCommentContent}
                    onChange={e =>
                        this.setState({ newCommentContent: e.target.value }, () => console.log(this.state.newCommentContent))
                    }
                  />
                  <Button className="add-comment" 
                     onClick = {this.addNewComment.bind(this)}
                     disabled = {this.state.sendingComment === true ? true : false}
                  >  
                    <i className= {this.state.sendingComment !== true ? "fa fa-paper-plane" : "d-none"}  aria-hidden="true"></i> 
                    <span className= {this.state.sendingComment === true ? "margin-left-10px" : "d-none"}>
                        <Spinner
                          size={20}
                          spinnerColor={"#333"}
                          spinnerWidth={1}
                          visible={true}
                          
                        />
                    </span>
                  </Button>
                  </div>
              </Col>
              <Col xs={12} sm={12}  md={4} lg={4} className="no-padding text-center col-comment-custom" >
                <div className= "cover-img">
                  <img className = "img-task" src = {this.props.currentTask.image !== "" && this.props.currentTask.image !== "none" ? this.props.currentTask.image : "" } alt = "img" />
                </div>
                <div className="task-info">

                  <p className = "task-description-detail">
                     <span className = "user-name des-text"> Mô tả</span>:&nbsp;&nbsp; 
                     <span className="user-comment"> {this.props.currentTask.description}  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "user-name des-text">Trạng thái</span>:&nbsp;&nbsp;
                     <span className="user-comment"> {this.props.currentTask.status}  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "user-name des-text">Bắt đầu</span>:&nbsp;&nbsp;
                     <span className="user-comment"> {this.props.currentTask.created_at}  </span>
                  </p><hr/>
                  <p className = "task-description-detail">
                     <span className = "user-name des-text">Kết thúc</span>:&nbsp;&nbsp;
                     <span className="user-comment"> {this.props.currentTask.due_date}   </span>
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
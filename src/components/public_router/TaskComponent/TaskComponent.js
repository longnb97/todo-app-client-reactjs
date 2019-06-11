import React, { Component } from "react";
import "./TaskComponent.css";
import { getInfoUserLocal } from "../../../service/login-service";

class TaskComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noPram: false
    };
  }


  componentDidMount(){
    console.log(this.props.match.params.id)
    if (this.props.match.params.id === undefined){
      this.setState({noPram: true})
    }
  } 
  render() {
    return (
      <div className="Task-component">
          <div
            className="container-home"
          >
            <p className={this.state.noPram === false ? "display-none" : "display-block text-danger"} >
              Trang web bạn đang truy cập yêu cầu các thông tin cần thiết để xử lý dữ liệu, nhưng không tìm thấy. Vui lòng kiểm tra lại, hoặc truy cập từ một nguồn xác định
            </p>


          </div>
 
      </div>
    );
  }
}

export default TaskComponent;

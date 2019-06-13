import React from "react";
import Slider from "react-slick";
import "./ListProject.css";
import { Row, Col, Button } from "react-bootstrap";
import ReadMoreReact from "read-more-react";
import Spinner from "react-spinner-material";
import * as ProjectService from "../../../../service/project-service";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export class ListProject extends React.Component {
  state = {
    listProject: [],
    getlistProjectSuccess: false,
    name: "",
    type: "",
    description: "",
    accountId: "",
    dueDate: "",

  };
  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    ProjectService.getUserProjects(userData.id)
      .then(projects => {
        this.setState({
          listProject: projects.data.data,
          getlistProjectSuccess: true
        }, () => { console.log(this.state.listProject) });
      });
  }

  _sliceText(text, max) {
    if (text == undefined) {
      return "_ _ _";
    }
    else if (text.length > max) {
      return text.slice(0, max) + "...";
    } else {
      return text;
    }
  }

  datePick = (date) => {
    this.setState({
      projectDuedate: date
    });
  }

  onInputChange = (e) => {
    let stateName = e.target.name;
    let data = e.target.value;
    // console.log(stateName);
    this.setState({ [stateName]: data }, () => console.log(this.state.name));
  }

  createProject = () => {
    let { name, type, description, accountId, dueDate } = this.state;
    let data = { name, type, description, accountId, dueDate };
    ProjectService.createProject(data)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  renderListProjet = () => {
    let list = this.state.listProject.map((project, index) => (
      <Col
        xs={12}
        sm={12}
        md={3}
        lg={3}
        className="No-padding text-center col-project-custom"
        key={index}
      >
        <Link
          className="project-item d-block"
          to={{
            pathname: `/task/${project.id}`,
            query: { thing: "asdf", another1: "stuff" }
          }}
        >
          <div className="d-flex">
            <img
              src={require("../../../../assets/image/icon/icon-google.png")}
              className="project-img"
            />
            <div className="flex-1">
              <p className="project-name">
                {" "}
                {this._sliceText(project.name, 12)}
              </p>
              <div className="users">
                <img
                  src={require("../../../../assets/image/icon/icon-google.png")}
                  className="project-user"
                />
                <img
                  src={require("../../../../assets/image/icon/icon-google.png")}
                  className="project-user"
                />
                <img
                  src={require("../../../../assets/image/icon/icon-google.png")}
                  className="project-user"
                />
                <span className="add-user"> Add </span>
              </div>
            </div>
          </div>
          <div className="description">
            {this._sliceText(project.description, 30)}
          </div>
          <div className="due-date">
            {this._sliceText(project.due_date, 10)}
          </div>
        </Link>
      </Col>
    ));
    return list;
  }

  render() {
    return (
      <div className="full-width">
        <Row className="list-project">
          <p className="title-slider-category">Project của bạn</p>
          <div
            className={
              this.state.getlistProjectSuccess === false
                ? "spinnerClass"
                : "d-none"
            }
          >
            <Spinner
              size={70}
              spinnerColor={"#0052cc"}
              spinnerWidth={4}
              visible={true}
              className="spinerCustom"
            />
            <p className="text-center text-loading">
              Đang tải xuống các project của bạn
            </p>
          </div>
          {this.renderListProjet()}
        </Row>
        <div>
          <input className="btn" onChange={this.onInputChange} type="text" placeholder="projectName" name="name" />
          <input className="btn" onChange={this.onInputChange} type="text" placeholder="projectType" name="type" />
          <input className="btn" onChange={this.onInputChange} type="text" placeholder="projectDescription" name="description" />
          <input className="btn" onChange={this.onInputChange} type="text" placeholder="projectAccountId" name="accountId" />
          <DatePicker
            selected={this.state.projectDuedate}
            onChange={this.datePick}//only when value has changed
            onSelect={() => console.log(this.state.projectDuedate)} //when day is clicked
            dateFormat="yyyy/MM/dd"
          />
          <button onClick={this.createProject}>create</button>
        </div>
      </div>
    );
  }
}

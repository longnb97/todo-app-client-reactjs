import React from "react";

import * as ProjectService from "../../../../service/project-service";
import "./ListProject.css";

import Slider from "react-slick";
import { Row, Col, Button } from "react-bootstrap";
import ReadMoreReact from "read-more-react";
import Spinner from "react-spinner-material";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "path";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition
} from "react-toasts";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "0%",
    transform: "translate(-50%, -50%)"
  }
};
export class ListProject extends React.Component {
  state = {
    listProject: [],
    getlistProjectSuccess: false,
    name: "",
    type: "",
    description: "",
    accountId: "",
    dueDate: "",
    showModal: false
  };
  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    ProjectService.getUserProjects(userData.id).then(projects => {
      this.setState(
        {
          listProject: projects.data.data,
          getlistProjectSuccess: true
        },
        () => {
          console.log(this.state.listProject);
        }
      );
    });
  }

  _sliceText(text, max) {
    if (text == undefined) {
      return " ";
    } else if (text.length > max) {
      return text.slice(0, max) + "...";
    } else {
      return text;
    }
  }

  datePick = date => {
    this.setState({
      dueDate: date
    });
  };

  formatTime(time) {
    if (time) {
      return moment(time)
        .format("DD/MM/YYYY")
        .toString();
    } else {
      return "_ _ _";
    }
  }

  getFirstCharacterProjectName(projectName) {
    let firstCharacter = projectName.slice(0, 1);
    return firstCharacter.toString().toUpperCase();
  }

  onInputChange = e => {
    let stateName = e.target.name;
    let data = e.target.value;
    // console.log(stateName);
    this.setState({ [stateName]: data }, () => console.log(this.state.name));
  };

  createProject = () => {
    let { name, type, description, dueDate } = this.state;
    let user = JSON.parse(localStorage.getItem("userData"));
    let accountId = user.id;
    let data = { name, type, description, accountId, dueDate };
    console.log(data);
    ProjectService.createNewProject(data)
      .then(response => {
        console.log(response);
        this.showModal();
        ToastsStore.success("Tạo project thành công !");
      })
      .catch(error => console.log(error));
  };

  showModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

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
            <div className="project-img">
              {this.getFirstCharacterProjectName(project.name)}
            </div>
            <div className="flex-1">
              <p className="h-30px" />
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

          <p className="project-name">{project.name}</p>

          <div className="description">
            {this._sliceText(project.description, 30)}
          </div>
          <div className="cover-date">
            <div className="start-date">
              {this.formatTime(project.created_at)}
            </div>
            <div className="due-date">{this.formatTime(project.due_date)}</div>
          </div>
        </Link>
      </Col>
    ));
    return list;
  };

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

          <Col
            xs={12}
            sm={12}
            md={3}
            lg={3}
            className="No-padding text-center col-project-custom"
          >
            <button className="btn btn-primary" onClick={this.showModal}>
              +
            </button>
          </Col>
        </Row>
        <div />
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.showModal}
          style={customStyles}
        >
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Project name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="awesome project"
              name="name"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Project type</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              name="type"
              onChange={this.onInputChange}
              defaultValue={"Personal"}
            >
              <option>Company</option>
              <option>Oranization</option>
              <option>Personal</option>
              <option>Student</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect2">
              Project description{" "}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="description"
              name="description"
              onChange={this.onInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Due date</label>
            <DatePicker
              selected={this.state.dueDate}
              onChange={date => {
                this.datePick(date);
              }}
              dateFormat="yyyy/MM/dd"
            />
          </div>
          <button className="btn btn-primary" onClick={this.createProject}>
            Create
          </button>
          <button className="btn" onClick={this.showModal}>
            Cancel
          </button>
        </ReactModal>
      </div>
    );
  }
}

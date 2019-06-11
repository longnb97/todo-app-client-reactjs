import React from "react";
import Slider from "react-slick";
import "./ListProject.css";
import { Row, Col, Button } from "react-bootstrap";
import ReadMoreReact from "read-more-react";
import Spinner from "react-spinner-material";
import { getAllProjectService } from "../../../../service/project-service";
import { Link } from "react-router-dom";

export class ListProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProject: [],
      getlistProjectSuccess: false
    };
  }
  componentDidMount() {
    getAllProjectService().then(projects => {
      console.log(projects.data.data);
      this.setState({
        listProject: projects.data.data,
        getlistProjectSuccess: true
      });
    });
  }

  _sliceText(text, max) {
    if (text.length > max) {
      return text.slice(0, max) + "...";
    } else {
      return text;
    }
  }

  renderListProjet() {
    let list = this.state.listProject.map((project, index) => (
      <Col
        xs={12}
        sm={12}
        md={3}
        lg={3}
        className="No-padding text-center col-custom"
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
                {this._sliceText(project.name, 14)}
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
      </div>
    );
  }
}

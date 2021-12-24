import React, { useState, useEffect } from "react";
import axios from "axios";
import { Jumbotron, Card, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import image1 from "../../images/course_cover1.jpg"
import image2 from "../../images/course_cover2.jpg"
import image3 from "../../images/course_cover3.png"
import "./Dashboard.css"

var imageArr = [image1, image2, image3];

const Dashboard = props => {
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);

  const getCourses = () => {

    axios.get(`/api/course/get-courses/${props.auth.user.id}`).then((response) => {
      const data = []
      for (let i = 0; i < response.data.length; i++) {
        data.push(response.data[i].course_title);
      }
      setCourses(data);
      setFetching(false);
    })
  }

  useEffect(() => getCourses(), []);
  const { user } = props.auth;

  const renderCourses = () => {
    if (fetching) {
      return <h4 class="loading">Loading...</h4>;
    }

    if (courses.length == 0) {
      return (
        <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
          <Card
            style={{ width: '18rem' }}
            className="mb-2"
          >
            <Card.Header></Card.Header>
            <Card.Body>
              <Card.Title>You have not created any courses yet </Card.Title>
              <Button variant="primary" href="/create-course">
                Create a Course
              </Button>
            </Card.Body>
          </Card>


        </div>
      )
    }
    if (courses.length > 0) {
      return (
        <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
          {courses.map((item, idx) =>
            <Card key={idx} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={imageArr[0]} />
              <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                  Autumn 2021
                </Card.Text>

                <DropdownButton id="dropdown-basic-button" title="View Course Assessments" style={{ marginTop: '8px' }}>
                  <Dropdown.Item href="/quizes">Quizes</Dropdown.Item>
                  <Dropdown.Item href="/assignments">Assignments</Dropdown.Item>
                  <Dropdown.Item href="/project">Project</Dropdown.Item>
                  <Dropdown.Item href="/midterm">Midterm</Dropdown.Item>
                  <Dropdown.Item href="/final">Final</Dropdown.Item>
                </DropdownButton>
              </Card.Body>
            </Card>
          )}
        </div>
      )
    }

  }

  return (
    <Jumbotron fluid style={{ textAlign: "center", height: "100vh" }}>
      <h4>
        <b>Hey there,</b> {user.name.split(" ")[0]}
        <p>
          Welcome to Auto-Grade 👏
        </p>
      </h4>
      {renderCourses()}




    </Jumbotron>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);

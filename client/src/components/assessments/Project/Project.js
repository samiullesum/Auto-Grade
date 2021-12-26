import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import ProjectModal from "./ProjectModal";
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Table, Badge } from "react-bootstrap";

const Projects = props => {

    const [projects, setProjects] = useState([]);
    const [total, setTotal] = useState();
    const [showModal, setShowModal] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { course, section } = useParams();
    const { user } = props.auth;

    const getProjectData = () => {

        axios.get('/api/course/get-project-marks', {
            params: {
                faculty: user.id,
                section: section,
                course: course
            }
        }).then((response) => {
            const data = [];

            for (let i = 0; i < response.data.length; i++) {
                const item = {
                    id: response.data[i].id,
                    name: response.data[i].name,
                    projects: response.data[i].project
                }
                data.push(item);
            }
            setProjects(data);
            setFetching(false);
        })
    }
    const getCourseData = () => {
        axios.get(`/api/course/get-course/${course}`).then((response) => {
            setTotal(response.data.project);
        })
    }

    useEffect(() => getCourseData(), []);
    useEffect(() => getProjectData(), []);

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleModal = () => {
        setShowModal(true);
    }

    const renderProjectData = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (projects.length === 0) {
            return (
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{course}</Card.Header>
                        <Card.Body>
                            <Card.Title>No Project Data found for this course</Card.Title>
                            <Button variant="primary" href="/upload-Project-marks">
                                Upload Project marks
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const projectAvg = (project) => {

            let marks = project.map(item => parseInt(item.marksObtained));
            let totalm = project.map(item => parseInt(item.totalMarks));
            let sum = marks.reduce((a, b) => a + b, 0);
            let totalmSum = totalm.reduce((a, b) => a + b, 0);

            return ((total * sum) / totalmSum).toFixed(1);
        }

     
        if (projects.length > 0) {
            return (
                <>
                    <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">📄 Project Marks for {course}</Badge></h1></div>
                    <ProjectModal showModal={showModal} toggle={toggleModal} />
                    <Button style={{ marginBottom: "3vw" }} onClick={handleModal}>Edit Project Marks</Button>
                    <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Project1</th>
                                <th>Project2</th>
                                <th>Project3</th>
                                <th>Project4</th>
                                <th>Project5</th>
                                <th>Project6</th>
                                <th>Avg.({total})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item, idx) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.projects[0] ? item.projects[0].marksObtained : 0}</td>
                                    <td>{item.projects[1] ? item.projects[1].marksObtained : 0}</td>
                                    <td>{item.projects[2] ? item.projects[2].marksObtained : 0}</td>
                                    <td>{item.projects[3] ? item.projects[3].marksObtained : 0}</td>
                                    <td>{item.projects[4] ? item.projects[4].marksObtained : 0}</td>
                                    <td>{item.projects[5] ? item.projects[5].marksObtained : 0}</td>
                                    <td>{isNaN(projectAvg(item.projects)) ? 0 : projectAvg(item.projects) }</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            )
        }
    }

    return (
        <Container fluid="md" style={{ marginTop: "3vw" }}>
            {renderProjectData()}
        </Container>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Projects);

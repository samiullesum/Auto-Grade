import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Table, Badge } from "react-bootstrap";
import AssignmentModal from './AssignmentModal'

const Assignments = props => {

    const [assignments, setAssignments] = useState([]);
    const [total, setTotal] = useState();
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { course, section } = useParams();
    const { user } = props.auth;

    const getAssignmentData = () => {

        axios.get('/api/course/get-assignment-marks', {
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
                    assignments: response.data[i].assignments
                }
                data.push(item);
            }
            setAssignments(data);
            setFetching(false);
        })
    }
    const getCourseData = () => {
        axios.get(`/api/course/get-course/${course}`).then((response) => {
            setTotal(response.data.assignment);
          })
    }

    useEffect(() => getAssignmentData(), []);
    useEffect(() => getCourseData(), []);

    const renderAssignmentData = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (assignments.length === 0) {
            return (
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{course}</Card.Header>
                        <Card.Body>
                            <Card.Title>No Assignment Data found for this course</Card.Title>
                            <Button variant="primary" href="/upload-assignment-marks">
                                Upload Assignment marks
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const assignmentAvg = (assignment) => {

            let marks = assignment.map(item => parseInt(item.marksObtained));
            let totalm = assignment.map(item => parseInt(item.totalMarks));
            let sum = marks.reduce((a, b) => a + b, 0);
            let totalmSum = totalm.reduce((a, b) => a + b, 0);
            
            return ((total * sum)/totalmSum).toFixed(1);
        }
        const toggleModal = () => {
            setShowModal(!showModal) 
          }
    

        const handleModal = () => {
            setShowModal(true);
        }

        const totalMarksGenerate = () => {
            let total = assignments[0].assignments[0].totalMarks;
            return total;
        }

        if (assignments.length > 0) {
            return (
                <>
                    <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary"><span role="img" aria-label="image">📄</span> Assignment Marks for {course}</Badge></h1></div>
                    <AssignmentModal showModal={showModal} toggle={toggleModal} />
                    <Button style={{marginBottom: "3vw"}} onClick={handleModal}>Edit Assignment Marks</Button>
                    <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Assignment1({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Assignment2({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Assignment3({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Assignment4({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Assignment5({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Assignment6({totalMarksGenerate() ? totalMarksGenerate() : 15})</th>
                                <th>Avg.({total})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((item, idx) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.assignments[0] ? item.assignments[0].marksObtained : 0}</td>
                                    <td>{item.assignments[1] ? item.assignments[1].marksObtained : 0}</td>
                                    <td>{item.assignments[2] ? item.assignments[2].marksObtained : 0}</td>
                                    <td>{item.assignments[3] ? item.assignments[3].marksObtained : 0}</td>
                                    <td>{item.assignments[4] ? item.assignments[4].marksObtained : 0}</td>
                                    <td>{item.assignments[5] ? item.assignments[5].marksObtained : 0}</td>
                                    <td>{assignmentAvg(item.assignments)}</td>
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
            {renderAssignmentData()}
        </Container>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Assignments);

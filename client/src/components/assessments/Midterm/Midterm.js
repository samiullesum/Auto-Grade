import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Table, Badge } from "react-bootstrap";

const Midterm = props => {

    const [midterm, setMidterm] = useState([]);
    const [total, setTotal] = useState();
    const [fetching, setFetching] = useState(true);
    const { course, section } = useParams();
    const { user } = props.auth;

    const getMidtermData = () => {

        axios.get('/api/course/get-midterm-marks', {
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
                    midterm: response.data[i].midterm
                }
                data.push(item);
            }
            setMidterm(data);
            setFetching(false);
        })
    }
    const getCourseData = () => {
        axios.get(`/api/course/get-course/${course}`).then((response) => {
            setTotal(response.data.midterm);
          })
    }

    useEffect(() => getCourseData(), []);
    useEffect(() => getMidtermData(), []);

    const renderMidtermData = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (midterm.length === 0) {
            return (
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{course}</Card.Header>
                        <Card.Body>
                            <Card.Title>No Midterm Data found for this course</Card.Title>
                            <Button variant="primary" href="/upload-midterm-marks">
                                Upload Midterm marks
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const midtermAvg = (mid) => {
            let marks = mid.map(item => parseInt(item.marksObtained));
            let totalm = mid.map(item => parseInt(item.totalMarks));
            let sum = marks.reduce((a, b) => a + b, 0);
            let totalmSum = totalm.reduce((a, b) => a + b, 0);
            return ((total * sum)/totalmSum).toFixed(1);
        }

        const totalMarksGenerate = () => {
            let total = midterm[0].midterm[0].totalMarks;
            return total;
        }

        if (midterm.length > 0) {
            return (
                <>
                    <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">📄 Midterm Marks for {course}</Badge></h1></div>
                    <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Total({totalMarksGenerate() ? totalMarksGenerate() : 100})</th>
                                <th>Avg.({total})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {midterm.map((item, idx) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.midterm[0] ? item.midterm[0].marksObtained : 0}</td>
                                  
                                    <td>{midtermAvg(item.midterm)}</td>
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
            {renderMidtermData()}
        </Container>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Midterm);

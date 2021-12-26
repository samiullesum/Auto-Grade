import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import FinalModal from "./FinalModal";
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Table, Badge } from "react-bootstrap";

const Final = props => {

    const [final, setFinal] = useState([]);
    const [total, setTotal] = useState();
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const { course, section } = useParams();
    const { user } = props.auth;

    const getFinalData = () => {

        axios.get('/api/course/get-final-marks', {
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
                    final: response.data[i].final
                }
                data.push(item);
            }
            setFinal(data);
            setFetching(false);
        })
    }

    const getCourseData = () => {
        axios.get(`/api/course/get-course/${course}`).then((response) => {
            setTotal(response.data.final);
        })
    }

    useEffect(() => getCourseData(), []);
    useEffect(() => getFinalData(), []);

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleModal = () => {
        setShowModal(true);
    }

    const renderFinalData = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (final.length === 0) {
            return (
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{course}</Card.Header>
                        <Card.Body>
                            <Card.Title>No final exam data found for this course</Card.Title>
                            <Button variant="primary" href="/upload-final-marks">
                                Upload Final Exam Marks
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const finalAvg = (f) => {
            let marks = f.map(item => parseInt(item.marksObtained));
            let totalm = f.map(item => parseInt(item.totalMarks));
            let sum = marks.reduce((a, b) => a + b, 0);
            let totalmSum = totalm.reduce((a, b) => a + b, 0);
            return ((total * sum) / totalmSum).toFixed(1);
        }

    

        if (final.length > 0) {
            return (
                <>
                    <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">📄 Final Marks for {course}</Badge></h1></div>
                    <FinalModal showModal={showModal} toggle={toggleModal} />
                    <Button style={{ marginBottom: "3vw" }} onClick={handleModal}>Edit Final Marks</Button>
                    <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Total</th>
                                <th>Avg.({total})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {final.map((item, idx) =>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.final[0] ? item.final[0].marksObtained : 0}</td>
                                    <td>{isNaN(finalAvg(item.final)) ? 0 : finalAvg(item.final)}</td>
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
            {renderFinalData()}
        </Container>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Final);

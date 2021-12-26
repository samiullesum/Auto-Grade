import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import { useParams } from 'react-router-dom'
import { Container, Card, Button, Table, Badge } from "react-bootstrap";
import QuizModal from './QuizModal'

const Quizes = props => {

    const [quizes, setQuizes] = useState([]);
    const [total, setTotal] = useState();
    const [fetching, setFetching] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [hideModal, setHideModal] = useState(false);
    const { course, section } = useParams();
    const { user } = props.auth;

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const getQuizData = () => {
        axios.get('/api/course/get-quiz-marks', {
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
                    quizes: response.data[i].quizes
                }
                data.push(item);
            }
            setQuizes(data);
            setFetching(false);
        })
    }

    const getCourseData = () => {
        axios.get(`/api/course/get-course/${course}`).then((response) => {
            setTotal(response.data.quiz);
        })
    }

    const handleModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setHideModal(true);
    }

    useEffect(() => getQuizData(), []);
    useEffect(() => getCourseData(), []);

    const quizAvg = (quiz) => {
       
        let marks = quiz.map(item => parseInt(item.marksObtained));
        let totalm = quiz.map(item => parseInt(item.totalMarks));
        let sum = marks.reduce((a, b) => a + b, 0);
        let totalmSum = totalm.reduce((a, b) => a + b, 0);

        return ((total * sum) / totalmSum).toFixed(1);
        
    }

    function totalMarksGenerate () {
        if(typeof quizes[0].quizes[0].totalMarks === 'undefined') {
          return -1;
        }
        
        
    }


    const renderQuizData = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (quizes.length === 0) {
            return (
                <>
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Header>{course}</Card.Header>
                        <Card.Body>
                            <Card.Title>No Quiz Data found for this course</Card.Title>
                            <Button variant="primary" href="/upload-quiz-marks">
                                Upload Quiz marks
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                </>
            )
        }


        if (quizes.length > 0) {
            return (
                <>
                    <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">📄 Quiz Marks for {course}</Badge></h1></div>
                    <QuizModal showModal={showModal} toggle={toggleModal} />
                    <Button style={{ marginBottom: "3vw" }} onClick={handleModal}>Edit Quiz Marks</Button>
                    <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Quiz1</th>
                                <th>Quiz2</th>
                                <th>Quiz3</th>
                                <th>Quiz4</th>
                                <th>Quiz5</th>
                                <th>Quiz6</th>
                                <th>Avg.({total})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizes.map((item, idx) =>
                                <tr>
                                    <td key={idx}>{item.id}</td>
                                    <td key={idx}>{item.name}</td>
                                    <td key={idx}>{item.quizes[0] ? item.quizes[0].marksObtained : 0}</td>
                                    <td key={idx}>{item.quizes[1] ? item.quizes[1].marksObtained : 0}</td>
                                    <td key={idx}>{item.quizes[2] ? item.quizes[2].marksObtained : 0}</td>
                                    <td key={idx}>{item.quizes[3] ? item.quizes[3].marksObtained : 0}</td>
                                    <td key={idx}>{item.quizes[4] ? item.quizes[4].marksObtained : 0}</td>
                                    <td key={idx}>{item.quizes[5] ? item.quizes[5].marksObtained : 0}</td>
                                    <td key={idx}>{isNaN(quizAvg(item.quizes)) ? 0 : quizAvg(item.quizes)}</td>
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
            {renderQuizData()}
        </Container>
    )

}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Quizes);

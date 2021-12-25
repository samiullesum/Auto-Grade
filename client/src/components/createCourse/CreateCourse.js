import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Badge, Card } from "react-bootstrap";
import { createCourse, updateQuizData } from "../../actions/courseActions";
import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
import StudentEnrollment from "../../images/studentEnrollment.jpg"
const buttonRef = React.createRef();

class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            section: "",
            noOfStudents: "",
            quizPercentage: "",
            assignmentPercentage: "",
            projectPercentage: "",
            midtermPercentage: "",
            finalPercentage: "",
            courseFile: null,
            student: [],
            quizes: [],
            assignments: [],
            project: [],
            midterm: [],
            final: [],
            Quiz1: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleOpenDialog = (e) => {
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }
    handleOnFileLoad = (data) => {
        let student_arr = [];
        for (let i = 1; i < data.length - 1; i++) {
            let item = {
                id: data[i].data[0],
                name: data[i].data[1],
                course: this.state.title,
                section: this.state.section,
                faculty: this.props.auth.user.id,
                quizes: [],
                assignments: [],
                project: this.state.project,
                midterm: this.state.midterm,
                final: this.state.final
            }
            student_arr.push(item)
        }
        this.setState({ student: student_arr });
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
    }

    handleRemoveFile = (e) => {
        if (buttonRef.current) {
            buttonRef.current.removeFile(e)
        }
    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const course = {
            title: this.state.title,
            section: this.state.section,
            quizPercentage: this.state.quizPercentage,
            assignmentPercentage: this.state.assignmentPercentage,
            projectPercentage: this.state.projectPercentage,
            midtermPercentage: this.state.midtermPercentage,
            finalPercentage: this.state.finalPercentage,
            noOfStudents: this.state.noOfStudents,
            faculty: user.id,
            student: this.state.student
        };
        console.log(course);
        createCourse(course);
    }

    handleUpdate = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const course = {
            title: this.state.title,
            section: this.state.section,
            noOfStudents: this.state.noOfStudents,
            faculty: user.id,
            student: this.state.student
        };
        
        updateQuizData(course);

    }
    render() {
        return (
            <Container fluid="md">
                <Row style={{ marginTop: "3vw" }}>
                    <Col md="8">
                        <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">Create a New Course</Badge></h1></div>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Course Title</Form.Label>
                                <Form.Control as="select" onChange={this.handleChange} id="title">
                                    <option>Select a Course</option>
                                    <option value="CSE451">CSE451</option>
                                    <option value="CSE425">CSE425</option>
                                    <option value="CSE315">CSE315</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Section</Form.Label>
                                <Form.Control type="text" placeholder="Section No." onChange={this.handleChange} id="section" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Number of Students</Form.Label>
                                <Form.Control type="text" placeholder="Number of Students" onChange={this.handleChange} id="noOfStudents" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Percentage on Quiz</Form.Label>
                                <Form.Control type="text" placeholder="Enter a number from 0 to 100" onChange={this.handleChange} id="quizPercentage" />
                                <Form.Text className="text-muted">
                                    Enter 0 if no marks on Quiz
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Percentage on Assignment</Form.Label>
                                <Form.Control type="text" placeholder="Enter a number from 0 to 100" onChange={this.handleChange} id="assignmentPercentage" />
                                <Form.Text className="text-muted">
                                    Enter 0 if no marks on Assignment
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Percentage on Project</Form.Label>
                                <Form.Control type="text" placeholder="Enter a number from 0 to 100" onChange={this.handleChange} id="projectPercentage" />
                                <Form.Text className="text-muted">
                                    Enter 0 if no marks on Project
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Percentage on Midterm</Form.Label>
                                <Form.Control type="text" placeholder="Enter a number from 0 to 100" onChange={this.handleChange} id="midtermPercentage" />
                                <Form.Text className="text-muted">
                                    Enter 0 if no marks on Midterm
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Percentage on Final</Form.Label>
                                <Form.Control type="text" placeholder="Enter a number from 0 to 100" onChange={this.handleChange} id="finalPercentage" />
                                <Form.Text className="text-muted">
                                    Enter 0 if no marks on Final
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Upload a list of enrolled students with Name and ID</Form.Label>
                                <CSVReader
                                    ref={buttonRef}
                                    onFileLoad={this.handleOnFileLoad}
                                    onError={this.handleOnError}
                                    noClick
                                    noDrag
                                    onRemoveFile={this.handleOnRemoveFile}
                                >
                                    {({ file }) => (
                                        <aside
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginBottom: 10
                                            }}
                                        >
                                            <Button
                                                type='button'
                                                style={{ height: '45px', marginTop: '5px' }}
                                                onClick={this.handleOpenDialog}
                                            >
                                                Browse file
                                            </Button>
                                            <div
                                                style={{
                                                    borderWidth: 1,
                                                    borderStyle: 'solid',
                                                    borderColor: '#ccc',
                                                    height: 45,
                                                    lineHeight: 2.5,
                                                    marginTop: 5,
                                                    marginBottom: 5,
                                                    paddingLeft: 13,
                                                    paddingTop: 3,
                                                    width: '69%',
                                                    background: '#fff'
                                                }}
                                            >
                                                {file && file.name}
                                            </div>
                                            <Button
                                                style={{ height: '45px', marginTop: '5px' }}
                                                onClick={this.handleRemoveFile}
                                            >
                                                Remove File
                                            </Button>
                                        </aside>
                                    )}
                                </CSVReader>
                                <Form.Text className="text-muted">
                                    Upload a file in CSV format
                                </Form.Text>
                            </Form.Group>


                            <Button variant="primary" type="submit" style={{ height: '45px', marginTop: '3vw' }}>
                                Create Course
                            </Button>
                        </Form>
                    </Col>
                    <Col md="4">
                        <Card style={{ width: '30rem' }}>

                            <Card.Body>
                                <Card.Title style={{ marginLeft: "4.5vw" }}>Sample File Format</Card.Title>
                                <Card.Img style={{ height: '70vh' }} variant="top" src={StudentEnrollment} />
                            </Card.Body>
                        </Card>
                    </Col>
               
                </Row>

            </Container>

        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CreateCourse);


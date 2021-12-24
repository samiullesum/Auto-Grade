import React, { Component } from 'react';
import { Form, Button, Container, Col, Row, Card, Badge } from "react-bootstrap";
import { uploadMidtermMarks } from "../../../actions/courseActions";
import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
import SampleData from "../../../images/SampleMarksData.jpg"
const buttonRef = React.createRef();


class UploadMidterm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: "",
            midtermTitle: "Midterm",
            totalMarks: "",
            section: "",
            noOfStudents: "",
            courseFile: null,
            Midterm: [],

        };
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    handleOpenDialog = (e) => {

        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }


    handleMidtermFileLoad = (data) => {
        let marks = [];
        for (let i = 1; i < data.length - 1; i++) {
            let item = {
                id: data[i].data[0],
                marksObtained: data[i].data[2],
            }
            marks.push(item);

        }
        //console.log(marks);
        this.setState({ Midterm: marks })

    }
    handleUploadMidtermMarks = (e) => {
        e.preventDefault();
        const marks = {
            title: this.state.midtermTitle,
            totalMarks: this.state.totalMarks,
            course_title: this.state.course,
            section: this.state.section,
            Midterm: this.state.Midterm,
        };

        uploadMidtermMarks(marks);

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
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.removeFile(e)
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }
    onFileChange(e) {
        this.setState({ courseFile: e.target.files[0] })
    }
 
    render() {
        return (
            <Container fluid="md">
                <Row style={{ marginTop: "5vw" }}>
                    <Col md="8">
                        <div><h1 style={{ marginBottom: "3vw" }}><Badge bg="primary">Upload Midterm Marks</Badge></h1></div>
                        <Form>
                        <Form.Group className="mb-3">
                                <Form.Label>Select a Course</Form.Label>
                                <Form.Control as="select" onChange={this.handleChange} id="course">
                                    <option>Select a Course</option>
                                    <option value="CSE451">CSE451</option>
                                    <option value="CSE425">CSC301</option>
                                    <option value="CSE315">CSE425</option>
                                </Form.Control>
                            </Form.Group>
                           
                            <Form.Group className="mb-3" >
                                <Form.Label>Total Marks</Form.Label>
                                <Form.Control type="text" placeholder="Total marks" onChange={this.handleChange} id="totalMarks" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Section</Form.Label>
                                <Form.Control type="text" placeholder="Section No." onChange={this.handleChange} id="section" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Upload a list of Midterm marks</Form.Label>
                                <CSVReader
                                    ref={buttonRef}
                                    onFileLoad={this.handleMidtermFileLoad}
                                    onError={this.handleOnError}
                                    noClick
                                    noDrag
                                    onRemoveFile={this.handleMidtermRemoveFile}
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
                                                Browse Midterm File
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
                                                    width: '60%'
                                                }}
                                            >
                                                {file && file.name}
                                            </div>
                                            <Button
                                                style={{ height: '45px', marginTop: '5px' }}
                                                onClick={this.handleMidtermRemoveFile}
                                            >
                                                Remove File
                                            </Button>
                                        </aside>
                                    )}
                                </CSVReader>
                                <Form.Text className="text-muted">
                                    Upload a file in CSV format (File should contain data of Student ID, Student Name and Obtained marks of each student
                                </Form.Text>
                                <Form.Text className="text-muted">
                                    File should contain data of Student ID, Student Name and Obtained marks of each student
                                </Form.Text>
                            </Form.Group>


                        </Form>

                        <Button variant="primary" type="submit" style={{ height: '45px', marginTop: '3vw' }} onClick={this.handleUploadMidtermMarks}>
                            Upload Midterm Marks
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Card style={{ width: '30rem' }}>

                            <Card.Body>
                                <Card.Title style={{ marginLeft: "3.3vw" }}>Sample File Format</Card.Title>
                                <Card.Img variant="top" src={SampleData} />
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

export default connect(mapStateToProps)(UploadMidterm);


import React, { Component } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import { createCourse, uploadQuizMarks } from "../../actions/courseActions";
import { CSVReader } from "react-papaparse";
import { connect } from "react-redux";
const buttonRef = React.createRef();


class CreateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            section: "",
            noOfStudents: "",
            courseFile: null,
            student: [],
            quizes: [],
            assignments: [],
            project:[],
            midterm: [],
            final: [],
            Quiz1: [],
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }


    handleQuizFileLoad = (data) => {
        let marks = [];
        
        
        for(let i = 1; i < data.length-1; i++) {
            let item = {
                id: data[i].data[0],
                marksObtained: data[i].data[2],
            }
            marks.push(item);
          
        }
        //console.log(marks);
        this.setState({Quiz1: marks})
        
    }
    handleUploadQuizMarks = (e) => {
      e.preventDefault();
      const marks = {
        title: "Quiz1",
        totalMarks: 15,
        course_title: this.state.title,
        section: this.state.section,
        Quiz1: this.state.Quiz1,
    };

    uploadQuizMarks(marks);

    }

    handleOnFileLoad = (data) => {
        let student_arr = [];
        //console.log(data)
        for(let i = 1; i < data.length-1; i++) {
            
            let item ={
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
     
        this.setState({student: student_arr});
        
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
    handleSubmit = e => {

        e.preventDefault();
        const { user } = this.props.auth;
        
        console.log(this.state.student);


        const course = {
            title: this.state.title,
            section: this.state.section,
            noOfStudents: this.state.noOfStudents,
            faculty: user.id,
            student: this.state.student
        };

        createCourse(course);
    }
    render() {
        return (
            <Container fluid="md">
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
                    <Form.Group className="mb-3">
                        <Form.Label>Upload a list of enrolled students with Name and ID</Form.Label>
                        <Form.Control type="file" onChange={this.onFileChange} />
                        <Form.Text className="text-muted">
                            Upload a file in CSV format
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Course
                    </Button>
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
                                        width: '60%'
                                    }}
                                >
                                    {file && file.name}
                                </div>
                                <Button
                                
                                    onClick={this.handleRemoveFile}
                                >
                                    Remove
                                </Button>
                            </aside>
                        )}
                    </CSVReader>
                </Form>
                <CSVReader
                        ref={buttonRef}
                        onFileLoad={this.handleQuizFileLoad}
                        onError={this.handleOnError}
                        noClick
                        noDrag
                        onRemoveFile={this.handleQuizRemoveFile}
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
                                    style={{height: '45px', marginTop: '5px'}}
                                    onClick={this.handleOpenDialog} 
                                >
                                    Browse Quiz file
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
                                style={{height: '45px', marginTop: '5px'}}
                                    onClick={this.handleQuizRemoveFile}
                                >
                                    Remove
                                </Button>
                            </aside>
                        )}
                    </CSVReader>
                    <Button variant="primary" type="submit" onClick={this.handleUploadQuizMarks}>
                        Upload Quiz Marks
                    </Button>
            </Container>

        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(CreateCourse);


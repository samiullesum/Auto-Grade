import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { AddNewStudent } from "../../actions/courseActions";



const AddStudentModal = ({ showModal, toggle, user }) => {
    const [show, setShow] = useState(false);
    const [marks, setMarks] = useState("");
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [course, setCourse] = useState("");
    const [section, setSection] = useState("");

    const handleClose = () => setShow(false);

    const handleID = e => {
        setID(e.target.value)
    }
    const handleName = e => {
        setName(e.target.value)
    }
    const handleCourse = e => {
        setCourse(e.target.value)
    }
    const handleSection = e => {
        setSection(e.target.value)
    }
    const handleMarks = e => {
        setMarks(e.target.value)
    }

    const handleAddStudent = () => {
        let item = {
            id: id,
            name: name,
            course: course,
            section: section,
            faculty: user.id,
            quizes: [],
            assignments: [],
            project: [],
            midterm: [],
            final: []
        }
        console.log(item);
        AddNewStudent(item);
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Add A New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Student ID" onChange={handleID} id="id" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Student Name" onChange={handleName} id="name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Select a Course</Form.Label>
                            <Form.Control as="select" onChange={handleCourse} id="course">
                                <option>Select a Course</option>
                                <option value="CSE451">CSE451</option>
                                <option value="CSE425">CSC301</option>
                                <option value="CSE315">CSE425</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Course Section</Form.Label>
                            <Form.Control type="text" placeholder="Enter Section Number" onChange={handleSection} id="section" />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleAddStudent}>
                            Add A New Student
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggle}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddStudentModal;
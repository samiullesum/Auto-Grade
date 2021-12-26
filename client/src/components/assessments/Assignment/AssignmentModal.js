import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { updateAssignment } from "../../../actions/courseActions"


const AssignmentModal = ({ showModal, toggle }) => {
    const [show, setShow] = useState(false);
    const [assignment, setAssignment] = useState("");
    const [course, setCourse] = useState("");
    const [marks, setMarks] = useState("");
    const [id, setID] = useState("");

    const handleClose = () => setShow(false);

    const handleCourse = e => {
        setCourse(e.target.value)
    }
    const handleAssignment = e => {
        setAssignment(e.target.value)
    }
    const handleMarks = e => {
        setMarks(e.target.value)
    }
    const handleID = e => {
        setID(e.target.value)
    }

    const handleUpdateAssignment = async (e) => {
        e.preventDefault();
        const data = {
            course: course,
            assignment: assignment,
            marks: marks,
            id: id
        }
        updateAssignment(data);
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
                    <Modal.Title>Update Quiz Marks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Student ID" onChange={handleID} id="id" />
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
                        <Form.Group className="mb-3">
                            <Form.Label>Select an Assignment</Form.Label>
                            <Form.Control as="select" onChange={handleAssignment} id="assignment">
                                <option>Select an Assignment</option>
                                <option value="Assignment1">Assignment1</option>
                                <option value="Assignment2">Assignment2</option>
                                <option value="Assignment3">Assignment3</option>
                                <option value="Assignment4">Assignment4</option>
                                <option value="Assignment5">Assignment5</option>
                                <option value="Assignment6">Assignment6</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Updated Marks</Form.Label>
                            <Form.Control type="text" placeholder="Enter updated marks" onChange={handleMarks} id="marks" />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleUpdateAssignment}>
                            Update Assignment Data
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

export default AssignmentModal;
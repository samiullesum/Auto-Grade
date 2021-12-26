import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { updateMidterm } from "../../../actions/courseActions"


const MidtermModal = ({ showModal, toggle }) => {
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");
  const [id, setID] = useState("");

  const handleClose = () => setShow(false);

  const handleCourse = e => {
    setCourse(e.target.value)
  }

  const handleMarks = e => {
    setMarks(e.target.value)
  }
  const handleID = e => {
    setID(e.target.value)
  }

  const handleUpdateMidterm = async (e) => {
    e.preventDefault();
    const data = {
      course: course,
      marks: marks,
      id: id
    }
    updateMidterm(data);
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
          <Modal.Title>Update Midterm Marks</Modal.Title>
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
            <Form.Group className="mb-3" >
              <Form.Label>Updated Marks</Form.Label>
              <Form.Control type="text" placeholder="Enter updated marks" onChange={handleMarks} id="marks" />
            </Form.Group>
            <Button variant="secondary" onClick={handleUpdateMidterm}>
              Update Midterm Data
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

export default MidtermModal;
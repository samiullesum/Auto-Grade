import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { updateQuiz } from "../../../actions/courseActions"


const QuizModal = ({ showModal, toggle }) => {
  const [show, setShow] = useState(false);
  const [quiz, setQuiz] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");
  const [id, setID] = useState("");

  const handleClose = () => setShow(false);

  const handleCourse = e => {
    setCourse(e.target.value)
  }
  const handleQuiz = e => {
    setQuiz(e.target.value)
  }
  const handleMarks = e => {
    setMarks(e.target.value)
  }
  const handleID = e => {
    setID(e.target.value)
  }

  const handleUpdateQuiz = async (e) => {
    e.preventDefault();
    const data = {
      course: course,
      quiz: quiz,
      marks: marks,
      id: id
    }
    updateQuiz(data);
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
              <Form.Label>Select a Quiz</Form.Label>
              <Form.Control as="select" onChange={handleQuiz} id="quiz">
                <option>Select a Quiz</option>
                <option value="Quiz1">Quiz1</option>
                <option value="Quiz2">Quiz2</option>
                <option value="Quiz3">Quiz3</option>
                <option value="Quiz4">Quiz4</option>
                <option value="Quiz5">Quiz5</option>
                <option value="Quiz6">Quiz6</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Updated Marks</Form.Label>
              <Form.Control type="text" placeholder="Enter updated marks" onChange={handleMarks} id="marks" />
            </Form.Group>
            <Button variant="secondary" onClick={handleUpdateQuiz}>
              Update Quiz Data
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

export default QuizModal;
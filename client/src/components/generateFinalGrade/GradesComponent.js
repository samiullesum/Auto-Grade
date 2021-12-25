import React from "react";

import { Container, Card, Table } from "react-bootstrap";

const GradesComponent = ({ fetching, grades }) => {

    const renderGrades = () => {
        if (fetching) {
            return <h4 className="loading">Loading...</h4>;
        }
        if (grades.length === 0) {
            return (
                <div style={{ display: 'table', margin: '0 auto', paddingTop: '5vw' }}>
                    <Card
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                        <Card.Body>
                            <Card.Title>Course grade has not been generated yet</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        const generateGrade = (total) => {
            if(total >= 90) {
                return "A";
            }
            else if(total >= 85 && total < 90) {
                return "A-";
            }
            else if(total >= 80 && total < 85) {
                return "B+";
            }
            else if(total >= 75 && total < 80) {
                return "B";
            }
            else if(total >= 70 && total < 75) {
                return "B-";
            }
            else if(total >= 65 && total < 70) {
                return "C+";
            }
            else if(total >= 60 && total < 65) {
                return "C";
            }
            else if(total >= 55 && total < 60) {
                return "C-";
            }
            else if(total >= 50 && total < 55) {
                return "D+";
            }
            else if(total >= 45 && total < 50) {
                return "D";
            }
            else {
                return "F";
            }
            

        }

        if (grades.length > 0) {
            return (
                <Table striped bordered hover size="sm" style={{ background: "#fff" }}>
                    <thead>
                        <tr>
                            <th scope="col">Student ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Total</th>
                            <th scope="col">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.name}</td>
                                <td>{ticket.total}</td>
                                <td>{generateGrade(ticket.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )

        }
    }

    return (
        <Container fluid="md" style={{ marginTop: "3vw" }}>
            {renderGrades()}
        </Container>
    );
};

export default GradesComponent;
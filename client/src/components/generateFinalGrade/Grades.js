import React, { useEffect, useState } from "react";
import { Container, Button, Row } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom'
import GradesComponent from './GradesComponent';
import generatePDF from "./GeneratePDF";

const Tickets = props => {

    const [tickets, setTickets] = useState([]);
    const [grades, setGrades] = useState([]);
    const [fetching, setFetching] = useState(true);
    const { user } = props.auth;
    const { course, section } = useParams();
    

    const getGrades = () => {

        axios.get('/api/course/generate-grade', {
            params: {
                faculty: user.id,
                section: section,
                course: course
            }
        }).then((response) => {
            console.log(response);
            const data = [];

            for (let i = 0; i < response.data.length; i++) {
                const item = {
                    id: response.data[i].id,
                    name: response.data[i].name,
                    total: response.data[i].total,
                }
                data.push(item);
            }
            setGrades(data);
            setFetching(false);
        })
    }

    useEffect(() => getGrades(), []);

    const reportGrades = grades;

    return (
            <>
            <Container fluid="md" style={{ marginTop: "3vw" }}>
                <Row>

                    <Button style={{marginLeft: "15px"}}
                        onClick={() => generatePDF(reportGrades)}
                    >
                        Generate PDF Grade Report
                    </Button>

                </Row>
                <Row>
                <GradesComponent fetching={fetching} grades={grades} />
                </Row>
                
            </Container>
            
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Tickets);


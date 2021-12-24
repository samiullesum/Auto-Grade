import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { loginUser, logoutUser } from "../actions/authActions";

import { Navbar, Nav, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "../index.css";

const Header = props => {


  function renderLinks(a) {
    if (a.isAuthenticated) {
        return (
          <Nav>
         {/*    <DropdownButton id="dropdown-basic-button" title="Select an Assessment" style={{ marginTop: '8px' }}>
              <Dropdown.Item href="/quizes">Quizes</Dropdown.Item>
              <Dropdown.Item href="/assignments">Assignments</Dropdown.Item>
              <Dropdown.Item href="/project">Project</Dropdown.Item>
              <Dropdown.Item href="/midterm">Midterm</Dropdown.Item>
              <Dropdown.Item href="/final">Final</Dropdown.Item>
            </DropdownButton> */}
            <Nav.Link href="/dashboard">
              <Button variant="primary">
                My Courses
              </Button>
            </Nav.Link>
            <Nav.Link href="/create-course">
              <Button variant="primary" style={{ marginRight: '8px' }}>
                Create a Course
              </Button>
            </Nav.Link>
            <DropdownButton id="dropdown-basic-button" title="Account" style={{ marginTop: '8px' }}>
              <Dropdown.Item onClick={onLogoutClick}>Log out</Dropdown.Item>

            </DropdownButton>
          </Nav>
        )
    

    } else {
      return (
        <Nav>
          <Nav.Link href="/register">
            <Button
              variant="primary"
              style={{ width: "100px", fontWeight: "600" }}
            >
              Sign up
            </Button>
          </Nav.Link>
          <Nav.Link eventKey={2} href="/login">
            <Button
              variant="success"
              style={{ width: "100px", fontWeight: "600" }}
            >
              Sign in
            </Button>
          </Nav.Link>
        </Nav>
      );
    }
  }

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };


  const currentRoute = window.location.pathname;
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
      <Navbar.Brand href="/" style={{ color: "#092040", fontWeight: '700' }}>
        Auto-Grade

      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={
          currentRoute === "/register"
            ? { backgroundColor: "#0275d8" }
            : { backgroundColor: "#57b846" }
        }
      />

      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        {renderLinks(props.auth)}
      </Navbar.Collapse>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, logoutUser })(Header);

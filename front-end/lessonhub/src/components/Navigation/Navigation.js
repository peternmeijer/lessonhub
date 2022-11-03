import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Lesson Hub</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
              <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
}

export default Navigation;
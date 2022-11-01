import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import React from "react";

const Navigation = () => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Lesson Hub</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link href="#home">Calendar</Nav.Link>
              <Nav.Link href="#features">Lessons</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
}

export default Navigation;
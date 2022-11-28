import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { Button } from '@mui/material';

const Navigation = () => {
  const { logOutUser } = useContext(UserContext);


    const logOut = async () => {
      try {
        // Calling the logOutUser function from the user context.
        const response = await logOutUser();
        window.location.reload(true);
        localStorage.removeItem("user")
        // Now we will refresh the page, and the user will be logged out and
        // redirected to the login page because of the <PrivateRoute /> component.
        
      } catch (error) {
        alert(error)
      }

    }
  

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/">Lesson Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
              <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>
              <Nav.Link as={Link} to="/lessonbuilder">Lesson Builder</Nav.Link>
              <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
              <Nav.Link as={Link} to="/activitybuilder">Activity Builder</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Button variant="contained" onClick={logOut} >Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

}

export default Navigation;
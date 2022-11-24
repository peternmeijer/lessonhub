import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { Button } from '@mui/material';

const Navigation = () => {

  const { logOutUser } = useContext(UserContext);

  // This function is called when the user clicks the "Logout" button.
  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const loggedOut = await logOutUser();
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Lesson Hub</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>
            <Nav.Link as={Link} to="/lessonbuilder">Lesson Builder</Nav.Link>
            <Nav.Link as={Link} to="/activity">Activities</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Button variant="contained" onClick={logOut}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

/**
 * THE LOGOUT SOURCE CODE FOR THIS PORTION WAS REFERENCED FROM THIS ARTICLE:
 * ALL CREDIT GOES TO CREATOR
 * https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/
 */

import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { Button } from '@mui/material';
import logo from '../../assets/logo-color.png'

const Navigation = () => {
  const { logOutUser } = useContext(UserContext);
  const accountType = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).accountType : null

  const logOut = async () => {
    try {
      // Calling the logOutUser function from the user context.
      const response = await logOutUser();
      //window.location.reload(true);
      localStorage.removeItem("user")
      // Now we will refresh the page, and the user will be logged out and
      // redirected to the login page because of the <PrivateRoute /> component.

    } catch (error) {
      alert(error)
    }

  }

  if(accountType == null)
  {
    logOut()
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} style={{width: '250px'}}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {accountType=="Instructor" || accountType=="Student" ? <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>: <></>}
              {accountType=="Instructor"  || accountType=="Student"? <Nav.Link as={Link} to="/courses">Courses</Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/lessons">Lessons</Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/lessonbuilder">Lesson Builder</Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/activities">Activities</Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/activitybuilder">Activity Builder</Nav.Link> : <></>}
              {accountType=="Instructor" ||accountType=="Administrator" ? <Nav.Link as={Link} to="/admin">Admin</Nav.Link> : <></> }
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              {accountType != null ? <Button variant="contained" onClick={logOut} >Logout</Button> : <></>}
              {accountType == null ? <Nav.Link as={Link} to="/login">Sign In</Nav.Link> : <></>}
              {accountType == null ? <Nav.Link as={Link} to="/register">Register</Nav.Link> : <></>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

}

export default Navigation;
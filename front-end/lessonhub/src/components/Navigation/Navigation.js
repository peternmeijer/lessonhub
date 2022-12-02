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
import Button from "react-bootstrap/Button"
import logo from '../../assets/logo-white.png'
import "./nav.css"

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
      <Navbar collapseOnSelect expand="lg" style={{"background":"#F5BA41"}} >
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} style={{width: '250px'}}></img></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {accountType=="Instructor" || accountType=="Student" ? <Nav.Link as={Link} to="/calendar"><b>Calendar</b></Nav.Link>: <></>}
              {accountType=="Instructor"  || accountType=="Student"? <Nav.Link as={Link} to="/courses"><b>Courses</b></Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/lessons" ><b>Lessons</b></Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/lessonbuilder" ><b>Lesson Builder</b></Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/activities" ><b>Activities</b></Nav.Link>: <></>}
              {accountType=="Instructor" ? <Nav.Link as={Link} to="/activitybuilder" ><b>Activity Builder</b></Nav.Link> : <></>}
              {accountType=="Instructor" ||accountType=="Administrator" ? <Nav.Link as={Link} to="/admin" ><b>Admin</b></Nav.Link> : <></> }
              <Nav.Link as={Link} to="/about"><b>About</b></Nav.Link>
              {accountType != null ? <Button variant="logout" className="ms-3" onClick={logOut} ><b>Logout</b></Button> : <></>}
              {accountType == null ? <Nav.Link as={Link} to="/login"><b>Sign In</b></Nav.Link> : <></>}
              {accountType == null ? <Nav.Link as={Link} to="/register"><b>Register</b></Nav.Link> : <></>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

}

export default Navigation;
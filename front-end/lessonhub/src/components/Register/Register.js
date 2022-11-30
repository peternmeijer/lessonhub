import React, {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSearchParams } from "react-router-dom";
import {registerUser} from '../Utils/apiCalls'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    

    const [searchParams, setSearchParams] = useSearchParams();
    const token_param = searchParams.get("token")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState(token_param)
    
    const register = () =>{

        if(username.trim() == "" || !(username.split(" ").length == 1))
        {
            alert("Please enter a valid username - no spaces allowed.")
            return
        }
        if(password.trim() == "" || password.trim().length < 10)
        {
            alert("Please enter a valid password -  length must be >= 10 characters.")
            return
        }
        if(firstname.trim() == "")
        {
            alert("Please enter a firstname.")
            return
        }
        if(lastname.trim() == "")
        {
            alert("Please enter a lastname.")
            return
        }
        if(token.trim() == "")
        {
            alert("Please enter a registration token (ask your instructor or system administrator).")
            return
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const validEmail = emailRegex.test(email.trim())
        if(!validEmail)
        {
            alert("Please enter a valid email.")
            return
        }

        const register_object = {
            username: username.trim(),
            password: password.trim(),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim()
        } 

        registerUser(token, register_object, (response)=>{
            if(response.data.success)
            {
                alert("Succesfully created account.")
                navigate('/login');
            }
        }, (error) =>{
            if(error.response.data.error="Invalid Token")
            {
                alert("Invalid Token. Contact your instructor or administrator for a new token.")
            }
        })

    }

    return (<Container style={{ flexDirection: "column",  alignItems: 'center', justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
                <Row>
                    <h1>Register</h1>
                    <hr></hr>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Enter username" value={username} onChange={(event)=>setUserName(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="Enter password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="Enter first name" value={firstname} onChange={(event)=>setFirstName(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Enter last name" value={lastname} onChange={(event)=>setLastName(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control placeholder="Enter email" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" style={{color: "red"}}>
                                <Form.Label>Registration Token (ask your instructor or system administrator)</Form.Label>
                                <Form.Control placeholder="Paste your registration token here" value={token} onChange={(event)=>setToken(event.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" onClick={()=>register()}>Register</Button>
                        </Form>
                    </Col>
                </Row>   
            </Container>  
    )
}

export default Register;
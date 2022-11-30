import React, {useState} from "react";
import logo from '../../assets/logo-color.png'
import {createRegisterToken} from "../Utils/apiCalls"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Admin = () => {
    const [accountType, setAccountType] = useState("")
    const [registerToken, setRegisterToken] = useState(null)

    const base_url = window.location.href.replace("/admin", "") + "/register/?token="
    const userAccountType = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).accountType : null

    const getToken = () =>{
        if(accountType == "Student" || accountType == "Administrator" || accountType == "Instructor")
        {   
            const payload = {
                accountType: accountType
            }
            createRegisterToken(payload, (response) =>{
                if(response.data.success)
                {
                    console.log(response)
                    setRegisterToken(response.data.registerToken.token)
                }
            }, (error)=>{
                console.log(error)
                alert("An error has occured. Please try again later. " + error.response.data.error)
            })
        }
    }
    return (
        <>
            <Container style={{ flexDirection: "column",  alignItems: 'center', justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
                <Row>
                    <h1>Register</h1>
                    <hr></hr>
                </Row>
                {registerToken == null ?
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Account Type</b></Form.Label>
                                <Form.Select value={accountType} onChange={(event)=>setAccountType(event.target.value)}>
                                    <option value="">Select Account Type</option>
                                    <option value="Student">Student</option>
                                    {userAccountType == "Administrator" ? <option value="Instructor">Instructor</option> : <></>}
                                    {userAccountType == "Administrator" ? <option value="Administrator">Administrator</option> : <></>}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" size="sm" onClick={()=>getToken()}>Create Registration Token</Button>
                        </Form>
                    </Col>
                </Row> :
                <Row>
                    <Form.Group>
                        <Form.Label>Token</Form.Label>
                        <Form.Control disabled type="text" value={registerToken}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Register URL</Form.Label>
                        <Form.Control disabled type="text" value={base_url + registerToken}></Form.Control>
                    </Form.Group>
                    <Button variant="warning" className="mt-3" style={{width:"20%"}} size="sm" onClick={()=>setRegisterToken(null)}>Create Another Token</Button>
                </Row>}
            </Container>  
        </>
    );
}

export default Admin;
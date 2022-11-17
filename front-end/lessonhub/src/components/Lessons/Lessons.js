import React from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Lessons = () => {

    return (
        <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <h1>Create Lesson</h1>
            <hr></hr>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Lesson Title</Form.Label>
                    <Form.Control placeholder="Enter Lesson Title" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Lessons;
import React, { useState } from "react";
import {InputGroup , Form, Button} from "react-bootstrap"

const ActivityBuilder = () => {

    const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]

    return (
        

        <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <h1>Create Activity</h1>
            <hr></hr>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Activity Title</Form.Label>
                    <Form.Control placeholder="Enter Lesson Title" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control placeholder="Estimated Duration" />
                </Form.Group>

                
                <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          Button
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
                

                <Form.Group>
                        <Form.Label>Equipment</Form.Label>
                        <Form.Control placeholder="Estimated Duration" />
                        <Form.Button>Test</Form.Button>  
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Password" />
                </Form.Group>
                

                <Button variant="primary" type="submit">
                    Create Activity
                </Button>
            </Form>
        </div>
    );
}

export default ActivityBuilder;
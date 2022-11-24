import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { BsXLg } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";

const ActivityTask = (props) => {
    const {name, position, maxPos, description, incPos, decPos, rmTask} = props

    return (
        <Row>
            <Col sm={10}>
                <h5 className="ms-3">{position}. {name}</h5>
                <p className="ms-5">{description}</p>
            </Col>
            <Col sm={2}>
                <ButtonGroup aria-label="Basic example" size="sm">
                    {position > 1 ? <Button variant="secondary" onClick={decPos}><BsArrowUp /></Button> : <></>}
                    {position < maxPos ? <Button variant="secondary" onClick={incPos}><BsArrowDown /></Button> : <></>}
                    <Button variant="danger" onClick={rmTask}><BsXLg /></Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
}

export default ActivityTask
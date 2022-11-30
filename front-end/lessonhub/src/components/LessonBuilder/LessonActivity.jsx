/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { BsXLg } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";

const LessonActivity = (props) => {
    const { num, activity, maxPos, decPos, incPos, rmActivity } = props
    return (<Row className="mb-3">
        <Col sm={10}>
            <span><h5>{num + 1 + ". " + activity.name + " (" + activity.duration + (activity.duration > 1 ? " mins" : " min") + ")"}</h5> </span>
            {activity.materials.length > 0 ? <span style={{ display: "block" }}> Materials: {activity.materials.toString()}</span> : <></>}
            {activity.equipment.length > 0 ? <span style={{ display: "block" }}> Equipment: {activity.equipment.toString()} </span> : <></>}
            {activity.tags.length > 0 ? <span> Tags: {activity.tags.toString()} </span> : <></>}
            {activity.tasks.length > 0 ? <div className="ms-4">
                <h6 className="mt-2">Tasks:</h6>
                {activity.tasks.map((task, i) => <>
                    <span key={i + "LATN"}>{(num + 1) + String.fromCharCode(i + 97) + ". " + task.name}</span>
                    <p key={i + "LATP"} className="ms-3">{task.description}</p>
                </>)}
            </div> : <></>}
        </Col>
        <Col sm={2}>
            <ButtonGroup aria-label="Basic example" size="sm">
                {num > 0 ? <Button variant="secondary" onClick={() => decPos(num)}><BsArrowUp /></Button> : <></>}
                {num < maxPos ? <Button variant="secondary" onClick={() => incPos(num)}><BsArrowDown /></Button> : <></>}
                <Button variant="danger" onClick={() => rmActivity(num)}><BsXLg /></Button>
            </ButtonGroup>
        </Col>
    </Row>)
}

export default LessonActivity
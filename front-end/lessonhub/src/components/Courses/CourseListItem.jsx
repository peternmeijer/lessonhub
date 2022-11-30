import React from "react"
import Button from 'react-bootstrap/Button';

import { BsBoxArrowUpRight } from "react-icons/bs";

const CourseListItem = (props) => {
    const {course, setViewingCourse} = props
    return (
        <tr className="m-3">
        <td>{course.name}</td>
        <td><Button  className = "ms-3" onClick={() => {setViewingCourse(course)}}variant="primary" size="sm" >View Course</Button></td>
        </tr>
        )
}

export default CourseListItem;
/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState} from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import AddLessonModal from './AddLessonModal'
import {updateCourseDB, getStudentsList } from "../Utils/apiCalls"
import { useEffect } from "react";

const CoursePage = (props) => {
    const {setViewingCourse, deleteCourseDB} = props

    const [course, setCourse] = useState(props.course)
    const [studentList, setStudentList] = useState([])
    const [showRenameModal, setShowRenameModal] = useState(false)
    const [showAddMemberModal, setShowAddMemberModal] = useState(false)
    const [newName, setNewName] = useState(course.name)
    const [showAddLessonModal, setShowAddLessonModal] = useState(false)
    const isInstructor = JSON.parse(localStorage.getItem("user")).accountType == "Instructor"

    useEffect(() => {
        if(isInstructor)
        getStudentsList((response) => {
            
            if(response.data.success){
                setStudentList(response.data.students.filter(student => course.members.filter(member => member._id == student._id).length == 0))   
            }
        }, (error)=>{console.log(error)})
    }, []);

    useEffect(() =>{
        setCourse({_id: course._id, name: course.name, members: course.members, scheduledLessons: course.scheduledLessons.sort((a,b) => (new Date(a.date) > new Date(b.last_nom)) ? 1 : ((new Date(b.date) > new Date(a.last_nom)) ? -1 : 0))})

    }, [course.scheduledLessons])

    const updateCourse = (data) => {
        //extract fields from data passed
        const {name, members, scheduledLessons} = data
        
        //check that new name is not empty
        if(name.trim() != "")
        {   
            //create update object
            let course_update = {
                name: name,
                members: members,
                scheduledLessons: scheduledLessons
            }

            //send request to backend to update course
            updateCourseDB(course._id, course_update, (response) => {
                
                if(response.data.success)
                {
                    setCourse(response.data.course)
                    
                }
            }, (error) => {console.log(error)})
        }
        else
        {
            alert("New name cannot be empty.")
        }
    }

    //add a student to the class via backend (triggered upon click)
    const addStudentToClass = (student) => {
        updateCourse({name: course.name, members: [...course.members, student._id], scheduledLessons: course.scheduledLessons})
        setStudentList(studentList.filter(s => s._id != student._id))
    }

    //method when unscheduling button clicked
    const unscheduleLesson = (scheduledLesson) => {
        console.log(scheduledLesson)
        console.log(course.scheduledLessons)
        updateCourse({name: course.name, members: course.members, scheduledLessons: course.scheduledLessons.filter(lesson => lesson.lesson._id != (scheduledLesson.lesson._id))})
    }

    return (
        <>
        <Container style={{ flexDirection: "column",  justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
            <Row>
            <h1>{course.name} <Button className="ms-4 mb-1" variant="outline-secondary" onClick={()=> {setViewingCourse(null)}}>Back To Courses</Button></h1>
                <hr></hr>
            </Row>
                    <Tabs
            defaultActiveKey="lessons"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
            <Tab eventKey="lessons" title="Lessons">
                {isInstructor ? <Button variant="primary" onClick={() => setShowAddLessonModal(true)}>Schedule Lesson</Button> : <></>}
                <Table borderless>
                    <tbody> 
                        {course.scheduledLessons.map(scheduledLesson => <tr><td>{scheduledLesson.lesson.title}</td><td>{(new Date(scheduledLesson.date)).toLocaleString()}</td>{isInstructor ? <td><Button variant="danger" size="sm" onClick={()=>unscheduleLesson(scheduledLesson)}>Unschedule</Button></td> :<></>}</tr>)}
                    </tbody>
                </Table>
            </Tab>
            <Tab eventKey="profile" title="Members">
                {course.members.map(student => <span>{student.firstname + " " + student.lastname} {JSON.parse(localStorage.getItem("user")).accountType == "Instructor" ? <Button variant="danger" size="sm" className="mb-1 ms-3"> Delete </Button> : <></>}</span>)}
            </Tab>
            {isInstructor ? <Tab eventKey="contact" title="Manage">
            <Button className="mb-3" style={{display: "block"}} variant="outline-warning" onClick={()=> {setShowAddMemberModal(true)}}>Add Member</Button>
            <Button className="mb-3" style={{display: "block"}} variant="outline-secondary" onClick={()=> {setShowRenameModal(true)}}>Rename Course</Button>
            <Button className="mb-3" variant="outline-danger" onClick={()=> {deleteCourseDB(course)}}>Delete Course</Button>
            </Tab>
            : <></>}
            </Tabs>
           
        </Container>
        <Modal
        size="lg"
        show={showRenameModal}
        onHide={() => setShowRenameModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <h1 style={{textAlign: 'center', paddingTop: '10px'}}>Rename Course</h1>
           
        <Modal.Body>
                <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control placeholder="Enter Course Name" value={newName} onChange={(event)=>{setNewName(event.target.value)}}/>
                </Form.Group>
        </Modal.Body>
        <Modal.Footer>
                    <Button variant="success" onClick={() => {updateCourse({name: newName, members: course.members, scheduledLessons: course.scheduledLessons}); setShowRenameModal(false)}}>
						Rename
					</Button>
					<Button variant="outline-danger" onClick={() => setShowRenameModal(false)}>
						Cancel
					</Button>
				</Modal.Footer>
        </Modal>
        <Modal
        size="lg"
        show={showAddMemberModal}
        onHide={() => setShowAddMemberModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <h1 style={{textAlign: 'center', paddingTop: '10px'}}>Add Members</h1>
           
        <Modal.Body>
                {studentList.map(student => <><span>{student.username}</span><Button variant="success" className="ms-3" size="sm" onClick={()=>addStudentToClass(student)}>Add To Class</Button></>)}
        </Modal.Body>
        <Modal.Footer>
					<Button variant="outline-secondary" onClick={() => setShowAddMemberModal(false)}>
						Close
					</Button>
				</Modal.Footer>
        </Modal>
        {showAddLessonModal ? <AddLessonModal course={course} updateCourse={updateCourse} setShowAddLessonModal={setShowAddLessonModal}></AddLessonModal> : <></>}
        </>
    )
}

export default CoursePage;
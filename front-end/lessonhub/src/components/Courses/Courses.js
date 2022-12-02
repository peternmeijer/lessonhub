/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getCourses, createCourse, deleteCourse} from "../Utils/apiCalls"
import CourseListItem from './CourseListItem'
import CoursePage from './CoursePage'

const Courses = () => {

    //states for courses and modal control and viewing a course page
    const [courses, setCourses] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [viewingCourse, setViewingCourse] = useState(null)
    const [newCourse, setNewCourse] = useState({name: ""})

    useEffect(() => {
        getCourseList()
    }, [viewingCourse]);
    
    const getCourseList = () =>
    {
        getCourses(function(response){
            if(response.data.success)
            {
                const courseList = response.data.courses
                
                if(courseList)
                {
                    setCourses(courseList)
                }
            }
        }, function(error){console.log(error)})
    }

    const createNewCourse = () =>
    {
        
        if(newCourse.name.trim() == "")
        {
            alert("Course name cannot be blank.")
            return
        }

        createCourse(newCourse, (response)=>{
            if(response.data.success)
            {
                getCourseList()
            }
            else
            {
                alert("An error occured while creating course.")
            }
        }, (error) =>{
            alert("An error occured while creating course.")
            console.log(error)
        })
        
        setShowModal(false)
    }

    const deleteCourseDB = (course) =>
    {
        deleteCourse(course._id, (response) =>{
            if(response.data.success)
            {
                getCourseList()
                setViewingCourse(null)
            }else
            {
                alert("Error occured while trying to delete course.")
            }
        }, (error) =>{
            console.log(error)
        })
    }
    
    return (
        <>
        {!viewingCourse ? 
        <><Container style={{ flexDirection: "column",  justifyContent: 'center', height: '90vh',  paddingTop: "20px" }}>
            <Row>
                <h1>Courses {JSON.parse(localStorage.getItem("user")).accountType == "Instructor" ? <Button className="ms-4 mb-1" variant="outline-secondary" onClick={()=> {setShowModal(true); setNewCourse({name:""})}}>Create Course</Button> : <></>}</h1>
                <hr></hr>
            </Row>
            <Table borderless size="lg">
                <tbody>
                    {courses.map(course => 
                        <CourseListItem key={course._id} course={course} setViewingCourse={setViewingCourse}></CourseListItem>
                    )}
                </tbody>
            </Table>
           
        </Container>
        <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <h1 style={{textAlign: 'center', paddingTop: '10px'}}>Create New Course</h1>
               
        <Modal.Body>
                <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control placeholder="Enter Course Name" value={newCourse.name} onChange={(event)=>{setNewCourse({name: event.target.value})}}/>
                </Form.Group>
        </Modal.Body>
        <Modal.Footer>
                    <Button variant="success" onClick={() => {createNewCourse()}}>
						Create
					</Button>
					<Button variant="outline-danger" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
				</Modal.Footer>
        </Modal>
        </>
        : <>
        <CoursePage course={viewingCourse} setViewingCourse={setViewingCourse} deleteCourseDB={deleteCourseDB}></CoursePage></>}
        </>
        
    );
    

}

export default Courses;
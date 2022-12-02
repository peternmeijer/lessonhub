/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Fuse from 'fuse.js'
import {getLessons} from '../Utils/apiCalls'

const AddLessonModal = (props) => {
    const {setShowAddLessonModal, course, updateCourse} = props
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [searched, setSearched] = useState(false)
    const [availableLessons, setAvailableLessons] = useState([])
    const [scheduleLesson, setScheduleLesson] = useState(null)
    const isInstructor = JSON.parse(localStorage.getItem("user")).accountType == "Instructor"
    const [scheduleLessonDate, setScheduleLessonDate] = useState("")
    const [scheduleLessonTime, setScheduleLessonTime] = useState("N")

    useEffect(() => {
        if(isInstructor)
        getLessons((response) => {
            if(response.data.success){
                setAvailableLessons(response.data.lessons.filter(lesson => course.scheduledLessons.filter(l => l.lesson._id == lesson._id).length == 0))
            }
        }, (error)=>{console.log(error)})
    }, []);

    
    const saveScheduledLesson = () => {
        
        if(scheduleLesson != null && scheduleLessonDate.trim() != "" && scheduleLessonTime.trim() != "")
        {
            try
            {
                //verify that date input is valid format
                const dateRegex = /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/
                const validDate = dateRegex.test(scheduleLessonDate)

                const dateTime = parseInt(scheduleLessonTime)
                
                if(isNaN(dateTime) || dateTime > 17 || dateTime < 8)
                {
                    alert("Invalid time format.")
                    return
                }
                
                if(!validDate)
                {
                    alert("Invalid date format.")
                    return
                }
                //split up date input by dashes
                const date_tokens = scheduleLessonDate.split("-").map(token => parseInt(token))
                
                //create date object for putting in database
                let lesson_date = new Date()
                lesson_date.setHours(dateTime)
                lesson_date.setYear(date_tokens[0])
                lesson_date.setMonth(date_tokens[1]-1)
                lesson_date.setDate(date_tokens[2])
                lesson_date.setMinutes(0)
                lesson_date.setSeconds(0)
                
                const lesson_object = {
                    lesson: scheduleLesson._id,
                    date: lesson_date.toISOString()
                }
                
                updateCourse({name: course.name, members: course.members, scheduledLessons: [...course.scheduledLessons, lesson_object]})
                setScheduleLesson(null)
                setShowAddLessonModal(false)
            }
            catch(error)
            {
                alert("Error occured while scheduling lesson.")
                console.log(error)
            }
        }
    }

    const searchList = (query) => {
        if(query.trim() == "")
        {
            return
        }
        else
        {
            const options = {
                 isCaseSensitive: false,
                // includeScore: false,
                 shouldSort: true,
                // includeMatches: false,
                // findAllMatches: false,
                // minMatchCharLength: 1,
                // location: 0,
                threshold: 0.1,
                // distance: 100,
                // useExtendedSearch: false,
                 ignoreLocation: true,
                // ignoreFieldNorm: false,
                // fieldNormWeight: 1,
                keys: [
                  "title",
                  "description",
                  "tags"
                ]
              };

            const fuse = new Fuse(availableLessons, options);
            
            let fuse_results = fuse.search(query)
            
            let lesson_results = fuse_results.map(result => result.item)
            
            setSearched(true)
            setSearchResults(lesson_results)
        }
    }
    
    return(
        <Modal
        size="lg"
        show={true}
        onHide={() => setShowAddLessonModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        >
        <h1 style={{textAlign: 'center', paddingTop: '10px'}}>Schedule Lesson</h1>
           
        <Modal.Body>
            {scheduleLesson == null ? <>
                <InputGroup>
                            <Form.Control
                            placeholder="Search"
                            aria-label=""
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <Button onClick={()=> {setSearchTerm(""); setSearched(false); setSearchResults([])}}variant="outline-secondary" id="button-addon2">
                                Clear
                            </Button>
                            <Button onClick={() => searchList(searchTerm)}variant="outline-success" id="button-addon3">
                                Search
                            </Button>
                        </InputGroup>
                        <Table borderless size="sm">
                            <tbody>
                                {searched && searchResults.length == 0 ? <tr><span style={{"color":"red"}}>None</span></tr> : searchResults.map(lesson => <tr><span>{lesson.title}<Button variant="success" className="m-3" size="sm" onClick={()=>setScheduleLesson(lesson)}>Schedule</Button></span></tr>)}
                            </tbody>
                        </Table>
                    </>
                 : <>
                    <span><b>Scheduling Lesson: </b>{scheduleLesson.title}</span>
                    <Form.Group className="m-3">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" value={scheduleLessonDate} onChange={(event)=>{setScheduleLessonDate(event.target.value)}}/>
                        <Form.Label>Select Time</Form.Label>
                        <Form.Select value={scheduleLessonTime} onChange={(event)=>{setScheduleLessonTime(event.target.value)}}>
                            <option value="N">Select Time</option> 
                            <option value="8">8 AM</option>
                            <option value="9">9 AM</option>
                            <option value="10">10 AM</option>
                            <option value="11">11 AM</option>
                            <option value="12">12 PM</option>
                            <option value="13">1 PM</option>
                            <option value="14">2 PM</option>
                            <option value="15">3 PM</option>
                            <option value="16">4 PM</option>
                            <option value="17">5 PM</option>
                        </Form.Select >
                    </Form.Group>
                 </>
            }
            </Modal.Body>
                    <Modal.Footer>
                            {scheduleLesson != null ? <Button variant="success" onClick={()=> saveScheduledLesson()}>Schedule</Button> : <></>}
                            <Button variant="outline-secondary" onClick={() => setShowAddLessonModal(false)}>
                                Close
                            </Button>
            </Modal.Footer>
        </Modal>
        
    )
}

export default AddLessonModal;
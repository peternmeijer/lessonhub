/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

/**
 * THE SOURCE CODE FOR THIS PORTION WAS REFERENCED FROM THIS YOUTUBE VIDEO:
 * ALL CREDIT GOES TO CREATOR
 * https://www.youtube.com/watch?v=lyRP_D0qCfk
 */

import React, { useEffect, useState } from "react";
import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import { parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-datepicker/dist/react-datepicker.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getCourses } from "../Utils/apiCalls";

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const Calendar = () => {

    const [allEvents, setAllEvents] = useState([])

    const [lesson, setLesson] = useState(null)

    //Fetch courses from backend to display on calendar
    useEffect(() => {
        setAllEvents([])
        getCourses((response => {
            if (response.data.success) {
                const courses = response.data.courses
                let events = []
                for (let x = 0; x < courses.length; x++) {
                    for (let k = 0; k < courses[x].scheduledLessons.length; k++) {
                        let title = courses[x].scheduledLessons[k].lesson.title
                        let startDate = new Date(courses[x].scheduledLessons[k].date)
                        let endDate = (new Date(courses[x].scheduledLessons[k].date))
                        endDate.setHours(endDate.getHours() + 1)
                        events = [...events, { title: title, start: startDate, end: endDate, lesson: courses[x].scheduledLessons[k].lesson }]
                    }
                }
                
                setAllEvents(events)
            }
        }), (error) => console.log(error))
    }, [])

    return (
        <>
            <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                <br></br>
                <h1>Calendar</h1>
                <Cal localizer={localizer} onSelectEvent={(event) => setLesson(event.lesson)} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: '90%', width: '90%', margin: "50px" }}></Cal>
            </div>
            {lesson == null ? <></> : <><Modal show={true} onHide={() => setLesson(null)} size="lg">
                <Modal.Body  style={{ wordBreak: 'break-word', overflow: "hidden"}}>
                    <h1 style={{ textAlign: 'center' }}>{lesson.title}</h1>
                    <br></br>
                    <h4>Description</h4>
                    <p>{lesson.description}</p>
                    {(lesson.video_link == null || lesson.video_link == "") ? <></> : <>
                        <h4>Tutorial Video</h4>
                        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <iframe width="700" height="350"
                                src={lesson.video_link}>
                            </iframe>
                        </div></>}
                    <br></br>
                    {lesson.activities.length > 0 ? <>
                        <h4>Activities</h4>
                        {
                            lesson.activities.map((activity, i) => <>
                                <h5>{i + 1 + ". " + activity.name}</h5>
                                <span style={{ "display": "block" }}>Materials: {activity.materials}</span>
                                <span style={{ "display": "block" }}>Equipment: {activity.equipment}</span>
                                <span style={{ "display": "block" }}>Tags: {activity.tags}</span>
                                {activity.tasks.length > 0 ? <>
                                    <h6 className="ms-3 mt-3">Tasks</h6>
                                    {activity.tasks.map((task, i) => <div className="ms-5"><span>{i + 1 + ". " + task.name}</span><p className="ms-3">{task.description}</p></div>)}
                                </> :
                                    <></>}
                            </>)
                        }</> : <></>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setLesson(null)}>
                        Back to Calendar
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
            }
        </>);
}

export default Calendar;


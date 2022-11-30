import React, { useEffect, useState } from "react";
import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import { parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form"
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

const events = []

const Calendar = () => {

    const [allEvents, setAllEvents] = useState(events)

    const [show, setShow] = useState(false);

    useEffect(()=>{
        getCourses((response=>{
            if(response.data.success)
            {
                const courses = response.data.courses
                let events = []
                for(let x =0; x < courses.length; x++)
                {   
                    for(let k = 0; k < courses[x].scheduledLessons.length; k++)
                    {
                        let title = courses[x].scheduledLessons[k].lesson.title
                        let startDate = new Date(courses[x].scheduledLessons[k].date)
                        let endDate = (new Date(courses[x].scheduledLessons[k].date))
                        endDate.setHours(endDate.getHours() + 1)
                        events = [...events, {title: title, start: startDate, end: endDate }]
                    }
                }
                console.log(events)
                setAllEvents([...allEvents, ...events])
            }
        }), (error)=>console.log(error))
    }, [])

    return (
        <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <br></br>
            <h1>Calendar</h1>
            
            <Cal localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: '90%', width: '90%', margin: "50px" }}></Cal>
        </div>
    );
}

export default Calendar;


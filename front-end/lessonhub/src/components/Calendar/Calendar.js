import React, { useState } from "react";
import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import { parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form"

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

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
    const [allEvents, setAllEvents] = useState(events)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div style={{ flexDirection: "column", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
            <br></br>
            <h1>Calendar</h1>
            <div>
                <Button style={{ width: '150px' }} variant="contained" onClick={handleShow}>Add Lesson</Button>
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Body>
                        <Form>
                            <h1 style={{textAlign: 'center'}}>Add Lesson</h1>
                            <br></br>
                            <Form.Group className="mb-3">
                                <Form.Label>Lesson Title</Form.Label>
                                <Form.Control placeholder="Lesson Title"
                                    value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <DatePicker placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" onClick={handleAddEvent}>
                            Add Lesson to Calendar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Cal localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: '90%', width: '90%', margin: "50px" }}></Cal>
        </div>
    );
}

export default Calendar;


/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LessonCard = (props) => {

	const {lesson, setEditLesson} = props
	const user_id = JSON.parse(localStorage.getItem("user"))._id
	
	const showEdit = user_id == lesson.owner
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//Render components from backend on each card displayed on lessons page
	//When clicked, show lesson information and activities
	return (
		<>
			<div className='tc bg-washed-yellow dib br2 pa3 ma2 grow bw2 shadow-5 pointer' style={{verticalAlign: "top"}}>
				<div onClick={handleShow}>
					<h2>{lesson.title}</h2>
					{lesson.video_link != null && lesson.video_link != "" ? <iframe width="420" height="315"
						src={lesson.video_link}>
					</iframe> : <div style={{width: "420px", height: "315px", wordBreak: 'break-word', overflow: "hidden"}}>{lesson.description}<p></p><p>(No video preview.)</p></div>}
				</div>
			</div>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Body>
					<h1 style={{textAlign: 'center'}}>{lesson.title}</h1>
					<br></br>
					<h4>Description</h4>
					<p  style={{ wordBreak: 'break-word', overflow: "hidden"}}>{lesson.description}</p>
					{lesson.video_link != null && lesson.video_link != "" ? <>
					<h4>Tutorial Video</h4>
					<div style={{ justifyContent: 'center', textAlign: 'center' }}>
						<iframe width="700" height="350"
							src={lesson.video_link}>
						</iframe>
					</div></> : <></>}
					{lesson.activities.length > 0 ? <><br></br>
					<h4>Activities</h4>
					{
						lesson.activities.map((activity, i) => <>
							<h5>{i+1 + ". " + activity.name}</h5>
							<span style={{"display":"block"}}>Materials: {activity.materials}</span>
							<span style={{"display":"block"}}>Equipment: {activity.materials}</span>
							<span style={{"display":"block"}}>Tags: {activity.materials}</span>
							{activity.tasks.length > 0 ? <>
								<h6 className="ms-3 mt-3">Tasks</h6>
								{activity.tasks.map((task, i) => <div className="ms-5"><span>{i+1 +". " + task.name}</span><p className="ms-3">{task.description}</p></div>)}
							</>:
							<></>}
						</>)
					} </> : <></>}
				</Modal.Body>
				<Modal.Footer>
					{showEdit ? <Button variant="primary" onClick={()=>setEditLesson(lesson)}>
						Edit Lesson
					</Button> : <></>}
					<Button variant="primary" onClick={handleClose}>
						Back to Lessons
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default LessonCard;
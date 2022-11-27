import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LessonCard = ({ id, name, email }) => {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<div className='tc bg-light-green dib br2 pa3 ma2 grow bw2 shadow-5 pointer'>
				<div onClick={handleShow}>
					<h2>{name}</h2>
					<p>{email}</p>
					<iframe width="420" height="315"
						src="https://www.youtube.com/embed/C2CVlvSSFO4">
					</iframe>
				</div>
			</div>
			<Modal show={show} onHide={handleClose} size="lg">
				<Modal.Body>
					<h1 style={{textAlign: 'center'}}>{name}</h1>
					<br></br>
					<h4>Time Commitment:</h4>
					<p>{email}</p>
					<h4>Description</h4>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
						galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
					<h4>Tutorial Video</h4>
					<div style={{ justifyContent: 'center', textAlign: 'center' }}>
						<iframe width="700" height="350"
							src="https://www.youtube.com/embed/C2CVlvSSFO4">
						</iframe>
					</div>
					<br></br>
					<h4>Activities</h4>
					<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
						galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Back to Lessons
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default LessonCard;
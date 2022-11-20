import React from 'react';

const LessonCard = ({ id, name, email}) => {
	return(
		<div className = 'tc bg-light-green dib br2 pa3 ma2 grow bw2 shadow-5'>
			<div>
				<p>{id}</p>
				<h2>{name}</h2>
				<p>{email}</p>
			</div>
		</div>
	);
}

export default LessonCard;
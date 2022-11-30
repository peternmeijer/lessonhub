import React from 'react';
import LessonCard from '../LessonCard/LessonCard'

const LessonCardList = ({lessonData}) => {

	const cardComponent = lessonData.map((lesson, i) => {
		console.log(lessonData)
		return(
			<LessonCard lesson={lesson}/>
			) 
	})

	return(
		<div>
    		{cardComponent}
		</div>
	);
}

export default LessonCardList;
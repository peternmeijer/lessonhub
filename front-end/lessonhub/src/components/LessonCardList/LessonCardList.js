/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from 'react';
import LessonCard from '../LessonCard/LessonCard'

//Display list of cards on lesson page, each with associated data
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
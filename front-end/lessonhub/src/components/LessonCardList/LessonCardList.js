import React from 'react';
import LessonCard from '../LessonCard/LessonCard'

const LessonCardList = ({lessonData}) => {

	const cardComponent = lessonData.map((user, i) => {
		return(
			<LessonCard 
				key = {i} 
				id ={lessonData[i].id} 
				name = {lessonData[i].name} 
				email = {lessonData[i].email}/>
			) 
	})

	return(
		<div>
    		{cardComponent}
		</div>
	);
}

export default LessonCardList;
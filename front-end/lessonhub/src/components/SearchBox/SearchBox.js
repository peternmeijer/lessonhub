import React from 'react';

const SearchBox = ({searchfield, searchChange}) => {
    return(
        <div class = "form">
        <input 
            className = 'pa3 ba center shadow-5 inputBox'
            type='search' 
            placeholder ='Search Lessons' 
            onChange={searchChange}
        />
        </div>
    )
}

export default SearchBox;
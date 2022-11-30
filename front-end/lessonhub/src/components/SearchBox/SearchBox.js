/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React from 'react';
import Form from 'react-bootstrap/Form'

//Code to render a searchbox to take in user search to update lesson cards on lessons page
const SearchBox = ({ searchfield, searchChange }) => {
    return (
        <div>
            <Form>
                <Form.Group className="mb-3 center w-30">
                    <Form.Control type='search' placeholder="Search Lessons" onChange={searchChange} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchBox;
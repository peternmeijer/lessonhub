import React from 'react';
import Form from 'react-bootstrap/Form'

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
/**
 * Authors: Peter Meijer, Nolan Morris, Nathan Pogue
 */

import React, {useState} from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"

const FormMultiAdd = (props) => {
    const {title, placeholder, buttonText, input, setInput, list, setList} = props

    const onAdd = () => {
        if(input.trim() != "" && !list.includes(input))
        {
            setList([...list, input])
            setInput("")
            return
        }

        alert(`${title} cannot be blank or duplicate.`)
        setInput("")
    }

    const removeItem = (item) => {
        setList(list.filter(listItem => listItem != item))
    }

    return (
        <Form.Group className="mb-3">
        <Form.Label>{title}</Form.Label>
        <InputGroup className="mb-3">
            
            <Form.Control
            placeholder={placeholder}
            value = {input}
            onChange = {(event) => {setInput(event.target.value);}}
            aria-describedby="basic-addon2"
            />
            <Button onClick = {onAdd} variant="outline-secondary" id="button-addon2">{buttonText}</Button>
        </InputGroup>
        <ul id="Materials_list">{list.map(item => <li key={item} >{item} <Button className="m-1" onClick={() => removeItem(item)} variant="secondary" size="sm">x</Button></li>)}</ul>
        
        </Form.Group>
    )
}

export default FormMultiAdd;
import "./Users.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/esm/Button";

const Users = (props) => {
  const { data, addSelected } = props;
  const [tag, setTag] = useState([]);
  // const [registeredUser, setRegiteredUser] = useState([])

  const onselect = (selected) => {
    console.log("****************")
    console.log({ tag })
    console.log({ data })
    // setTag([...tag, data.firstName + " " + data.lastName])
    setTag([{ fN: selected.firstName, lN: selected.lastName, pP: selected.profilePicture }, ...tag])
    // setRegiteredUser([data._id, ...registeredUser])
    addSelected(selected._id)

  }
  useEffect(() => {
    console.log("new born")
  }, [])

  return (
    <div >
      <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-dark"
          title="Invite Members"
          id="input-group-dropdown-1"
        >
          {data.map((std) => <div key={std._id} >
            <Dropdown.Item href="#" onClick={() => onselect(std)} >
              <img style={{ width: "30px", height: "auto" }} src={`http://localhost:7400/images/${std.profilePicture}`}></img>
              {std.firstName} {std.lastName}
            </Dropdown.Item>
          </div>)}
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" />

      </InputGroup>
      <div className="d-flex flex-row ml-1">
        <h4>Members:</h4>
        {tag.map((e) => (
          <div key={e.firstName + e.lastName} className="border rounded p-1 m-1 border-primary">
            <img style={{ width: "30px", height: "auto" }} src={`http://localhost:7400/images/${e.pP}`}></img>
            {e.fN} {e.lN}
            <Button color="danger">x</Button>
          </div>
        ))}
      </div>
      {/* <div className="tag">{tag}</div> */}

      {/* <div >
        {tag.map((e) => {
          <div >e</div>
        })}
      </div> */}

    </div>
  )
}

export default Users;
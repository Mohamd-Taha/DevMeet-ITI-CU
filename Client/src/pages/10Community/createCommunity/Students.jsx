import "./Students.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
 import React, { useState } from 'react';

const Students = (props) => {
    const {data}=props;
    const [tag,setTag]=useState(""); 
     const onsearch=(data)=>{
        setTag(data)
  
    }
    
   
    return (
        <div >
           {/* {data.map((std)=><div  key={std.id} >
            <div id='choose_tag' onClick={()=>onsearch(std.name)}>name:{std.name}</div>

           </div>)} */}
          
            
            <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-dark"
          title="Invite Members"
          id="input-group-dropdown-1"
        >
             {data.map((std)=><div  key={std.id} >
          <Dropdown.Item href="#" onClick={()=>onsearch(std.name)} >{std.name}</Dropdown.Item>
          </div>)} 
        </DropdownButton>
        <Form.Control aria-label="Text input with dropdown button" />
        
      </InputGroup>
      <div className="tag">{tag}</div>
           
        </div>
    );
};

export default Students;
import React from 'react';
import Search from './Search';
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./createCommunity.css"
import Users from './Users';
import axios from 'axios';
const CreateCommunity = () => {

  let { user } = useAuthContext();
  user = user.user;
  let registeredNumber = 0;
  let communityAdmin = {
    adminId: users._id,
    adminName: user.firstName + " " + user.lastName
  }

  // it was a try to make one state holding all values but it fails cuz of i can't get e.target.name
  const [state, setState] = useState({
    communityName: "",
    communityTopic: "",
    communityDescription: "",
    registeredUsers: "",
    color: "",
    city: "",
    state: "",
    zip: 0,
    checkMe: false
  })
  //tradtional way

  //to get the follower of the current user and store it the the below state
  const [users, setUsers] = useState([
    { id: 1, name: "eman", email: "eman@gmail.com" },
    { id: 2, name: "basmala", email: "basmala@gmail.com" },
    { id: 3, name: "Mohamed", email: "mohamed@gmail.com" },
    { id: 4, name: "abdelrahman", email: "abdelrahman@gmail.com" },
    { id: 5, name: "omar", email: "omar@gmail.com" },
  ]);
  const [result, setResult] = useState([]);
  const [filteredData, setFiltered] = useState(users);
  const sendSearchTxt = (searchdata) => {
    let arr = searchdata.split(" ");
    axios.post("http://localhost:7400/search", {
      firstName: arr[0],
      lastName: arr[1]
    }).then((res) => {
      setResult(res.data);

    })
    let Arr = users.filter((std) => std.name.toLowerCase().includes(searchdata.toLowerCase()));
    setFiltered(Arr);
  }
  const [commName, setCommName] = useState();
  const [commTopic, setCommTopic] = useState();
  const [commDesc, setCommDesc] = useState();
  const [commCover, setCommCover] = useState();
  const [commIcon, setCommIcon] = useState();
  const [registeredUsers, setRegisteredUser] = useState([]);


  const addSelectedUsers = (usr) => {
    setRegisteredUser(usr, ...registeredUsers);
  }

  const handleChange = evt => {
    console.log(evt)
    const name = evt.target.name;
    console.log("🚀 ~ file: createCommunity.jsx:51 ~ name:", name)
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setState({
      ...state,
      [name]: value
    })
    // console.log(state)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // setSuccess(null)
    const formData = new FormData()
    formData.append("image1", commCover)
    formData.append("image2", commIcon)
    formData.append("communityName", commName)
    formData.append("communityTopic", commTopic)
    formData.append("communityDescription", commDesc)
    formData.append("registeredUsers", registeredUsers)
    formData.append("registeredNumber", registeredNumber)
    formData.append("communityAdmin", communityAdmin)


    axios.post(`http://localhost:7400/communities/create`, formData, { withCredentials: true, })

      .then((response) => {
        if (response)
          console.log("Community Added Sucessfully")

      })
      .catch((err) => { console.log(err) })

    setCommName("")
    setCommCover("")
    setCommDesc("");
    setCommIcon("")
    setCommCover("")

  }
  useEffect(() => {
    registeredNumber = registeredUsers.length;

  }, [registeredUsers])

  return (

    <div className="container">

      <div className='row mt-5'>
        <h3 className='text-center' >Create Community</h3>
        <form action="">
          <h5>Community Name</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control className='space' type="text" title='communityName' onChange={(e) => { setCommName(e.target.value) }} placeholder="please enter your Community Name" />
          </Form.Group>
          <h5>Topic:</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control className='space' type="text" onChange={(e) => { setCommTopic(e.target.value) }} placeholder="please enter the topic of your community" />
          </Form.Group>
          <h5>Description</h5>

          <Form>
            <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1" >
              <Form.Control className='textarea' onChange={(e) => { setCommDesc(e.target.value) }} as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <Form.Group controlId="formFile" className="mb-3">

            <h5 className='text-left'>Community Cover</h5>
            <Form.Control type="file" onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setCommCover(file);
              }
            }} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <h5>Community Icon</h5>
            <Form.Control type="file" onChange={(e) => {
              let file = e.target.files[0];
              if (file) {
                setCommIcon(file);
              }
            }} />
          </Form.Group>
          <Search send={sendSearchTxt} ></Search>
          <Users data={result} addSelected={addSelectedUsers}></Users>
          <div className='text-center'>
            <input type="submit" value="Submit" className='mybuttonsubmit mb-3' /></div>
        </form>
      </div>
    </div>


  );
};

export default CreateCommunity;
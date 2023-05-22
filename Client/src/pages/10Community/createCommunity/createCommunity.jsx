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
import NavBar from '../../../Components/NavBar';
import { useTranslation } from 'react-i18next';

const CreateCommunity = () => {
  let communityId;
  let { user } = useAuthContext();
  user = user.user;
  let registeredNumber = 0;
  let communityAdmin = {
    adminId: user._id,
    adminName: user.firstName + " " + user.lastName
  }
  let [t, i18n] = useTranslation();
  let classBasedOnLang;
  if (i18n.language === "ar") {
    classBasedOnLang = "rtl"
  }
  else
    classBasedOnLang = "ltl"
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

  const [result, setResult] = useState([]);
  const [filteredData, setFiltered] = useState([]);

  const sendSearchTxt = (searchdata) => {
    let arr = searchdata.split(" ");
    axios.post("http://localhost:7400/search", {
      firstName: arr[0],
      lastName: arr[1]
    }).then((res) => {
      setResult(res.data);

    })
    // let Arr = result.filter((std) => std.name.toLowerCase().includes(searchdata.toLowerCase()));
    // setFiltered(Arr);
  }

  const [commName, setCommName] = useState();
  const [commTopic, setCommTopic] = useState();
  const [commDesc, setCommDesc] = useState();
  const [commCover, setCommCover] = useState();
  const [commIcon, setCommIcon] = useState();
  const [registeredUsers, setRegisteredUser] = useState([]);
  const [counter, setCounter] = useState(1);

  const addSelectedUsers = (usr) => {
    setRegisteredUser([usr, ...registeredUsers]);
    console.log("registeredUsers")
    console.log(registeredUsers)
    setCounter(counter + 1);
    console.log({ counter })
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
    // add admin to registered users
    setRegisteredUser([user._id, ...registeredUsers]);
    console.log({ counter });
    const formData = new FormData()
    formData.append("image1", commCover)
    formData.append("image2", commIcon)
    formData.append("communityName", commName)
    formData.append("communityTopic", commTopic)
    formData.append("communityDescription", commDesc)
    formData.append("registeredUsers", JSON.stringify(registeredUsers))
    formData.append("registeredNumber", counter)
    formData.append("communityAdmin", communityAdmin)


    axios.post(`http://localhost:7400/communities/create`, formData, { withCredentials: true, })

      .then((response) => {
        if (response)
          console.log("Community Added Sucessfully")

        communityId = response.data._id;
        console.log({ communityId })


      })
      .catch((err) => { console.log(err) })

    setCommName("")
    setCommCover("")
    setCommDesc("");
    setCommIcon("");
    setCommCover("");
    setCommTopic("")

    let promises = [];
    for (let i = 0; i < registeredUsers.length; i++) {
      promises.push(
        axios.post('/http://localhost:7400/communities/register', {
          userId: registeredUsers[i],
          communityId: communityId
        }).then(response => {
          // do something with response
          console.log(response)
        })
      )
    }

    Promise.all(promises).then(() => console.log("users"));


    // for (let i = 0; i < registeredUsers.length; i++) {
    //   axios.post(`http://localhost:7400/communities/register`, {
    //     userId: registeredUsers[i],
    //     communityId: communityId
    //   }).then((res) => {
    //     console.log(`new community is added to user ${registeredUsers[i]}`)
    //   })
    // }


    /**
  registeredUsers.map((usr) => {
    axios.post(`http://localhost:7400/communities/register`, {
      userId: usr,
      communityId: communityId
    }).then((res) => {
      console.log(`new community is added to user ${usr}`)
    })

  })
   */

  }
  useEffect(() => {
    registeredNumber = registeredUsers.length;

  }, [registeredUsers])
  const nothingfun = () => {

  }
  return (

    <>
      <NavBar sendSearch={nothingfun}></NavBar>

      <div>

        <div className="container mt-5 ">

          <div className='row mt-5'>
            <h3 className='text-center' >{t("Create Community")}</h3>
            <form action="">
              <h5 dir={classBasedOnLang}>{t("Community Name")}</h5>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control className='space' type="text" value={commName} title='communityName'
                  onChange={(e) => { setCommName(e.target.value) }}
                  placeholder="please enter your Community Name" />
              </Form.Group>
              <h5 dir={classBasedOnLang}>{t("Topic")}:</h5>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control className='space' type="text" value={commTopic} onChange={(e) => { setCommTopic(e.target.value) }} placeholder="please enter the topic of your community" />
              </Form.Group>
              {/* <div>
                {i18n.language === "ar" ? (
                  <h5 dir="rtl">{t("Description")}</h5>
                ) : (
                  <h5>{t("Description")}</h5>
                )}
              </div> */}
              <h5 dir={classBasedOnLang}>{t("Description")}</h5>

              <Form>
                <Form.Group className="mb-3 " controlId="exampleForm.ControlTextarea1" >
                  <Form.Control className='textarea' value={commDesc} onChange={(e) => { setCommDesc(e.target.value) }} as="textarea" rows={3} />
                </Form.Group>
              </Form>
              <Form.Group controlId="formFile" className="mb-3">

                <h5 dir={classBasedOnLang} className='text-left'>{t("Community Cover")}</h5>
                <Form.Control type="file" value={commCover} onChange={(e) => {
                  let file1 = e.target.files[0];
                  if (file1) {
                    setCommCover(file1);
                  }
                }} />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <h5 dir={classBasedOnLang}>{t("Community Icon")}</h5>
                <Form.Control type="file" value={commIcon} onChange={(e) => {
                  let file = e.target.files[0];
                  if (file) {
                    setCommIcon(file);
                  }
                }} />
              </Form.Group>
              <Search send={sendSearchTxt} ></Search>
              <Users data={result} addSelected={addSelectedUsers}></Users>
              <div className='text-center'>
                <input type="submit" value="Submit" className='mybuttonsubmit mb-3' onClick={handleSubmit} /></div>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default CreateCommunity;
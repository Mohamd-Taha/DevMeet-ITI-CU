import NavBar from '../../Components/NavBar';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"
import "./Meetups.css"
// import MeetupRoom from '../9MeetupRoom/MeetupRoom';
const Meetups = () => {
    const [roomcode, setRoomCode] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(roomcode && roomcode.length==13 && typeof roomcode!= 'number'){
        // alert("your Room id is  "+roomcode)
        navigate(`/meetup/${roomcode}`)
        }
        else{
            alert ("Enter a valid Zoom Meeting ID , It must be number of 13 digit")
        }
    }
    const setRoomCodeRandom = () => {
        setRoomCode(Date.now())

        // myalert()
    }
    // const myalert=()=>{

    // }
    return (
        <>
            <NavBar />
            <div className='container-fluid'>
                <div className="row mt-5">
                    <div className="col-3 topusersize mt-5">
                        <div className="row mt-5">

                            <h5> Top Users</h5>

                        </div>
                    </div>
                    <div className=" col-5">
                        <div className="row ">
                            <div className='parent_jRoom'>
                                <div className='jRoom'>
                                    <div className='mycenterdiv'>
                                        <form onSubmit={handleFormSubmit} className='form'>
                                            {/* <div>Enter id or personal link name</div> */}
                                            {/* <input type="text" class="my_form-control" value={roomcode} onChange={e=>setRoomCode(e.target.value)}  placeholder='Enter id or personal link name' required /> */}
                                            <input type='submit' className='joinbutton mb-2' value="Create Meeting" onClick={setRoomCodeRandom} />
                                            <h3>Or</h3>
                                            <div>Join Meeting</div>
                                            <input type="text" className="my_form-control mt-2" placeholder='Please Enter Meeting ID' value={roomcode} onChange={e => setRoomCode(e.target.value)} />
                                            <br />
                                            <input type='submit' className='joinbutton2 mt-2' value="join" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                    <div className=" col-4">
                        <div className="row mt-4">
                            <h3>Events</h3>
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">1  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">2  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">3  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">4  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">5  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className='d-flex'>
                                <div className=" mybackground col-2 text-sm-center">6  <br /> Dec</div>
                                <div className="myeventdiv col-10  border-bottom border-dark t-center text-sm-center mb-2">event starts</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {/* <MeetupRoom myRoom={roomcode}/> */}
        </>
    );
};

export default Meetups;



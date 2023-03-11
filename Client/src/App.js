import React , { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate ,Redirect , NavLink } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Landing  from "./Pages/1LandingPage/Landing.jsx";
import Login from "./Pages/3Login/Login.jsx";
import Register from './Pages/2Register/Register.jsx';
import Home from "./Pages/4Home/Home";
import Profile from './Pages/5Profile/Profile' 
import Messanger from './Pages/6Messenger/Messenger'
import Notifications from './Pages/7Notifications/Notifications'
import Meetups from './Pages/8Meetups/Meetups'
import Search from './Pages/11Search/Search'
import Error404 from './Components/Error404'


function App() {
  const {user, dispatch} = useAuthContext()
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user?<Landing></Landing>:<Navigate to='/home'></Navigate>}></Route>
        <Route path="/login" element={!user?<Login></Login>:<Navigate to="/home"></Navigate>}></Route>
        <Route path="/register" element={!user?<Register></Register>:<Navigate to="/home"></Navigate>}></Route>
        <Route path="/home" element={user?<Home/>:<Navigate to="/login"></Navigate>}></Route>
        
        <Route path="profile" element={<Profile/>}></Route>  {/* "profile/:userID" */}
        <Route path="messenger" element={<Messanger/>}></Route>
        <Route path="notifications" element={<Notifications/>}></Route>
        <Route path="meetups" element={<Meetups/>}></Route>  {/* "meetups/:meetupID" */}
        <Route path="search" element={<Search/>}></Route>  
        
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
    </BrowserRouter>


    //  <div>
    //   {/* <Landing/>   */}
    //   {/* <Profile/> */}
    //   {/* <Home/> */}
    // </div>




    );
  }
  export default App;
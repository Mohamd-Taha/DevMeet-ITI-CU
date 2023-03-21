import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Redirect,
  NavLink,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import AboutUs from "./Pages/1AboutUs/AboutUs";
import Landing from "./Pages/1LandingPage/Landing.jsx";
import Login from "./Pages/3Login/Login.jsx";
import Register from "./Pages/2Register/Register.jsx";
import Home from "./Pages/4Home/Home";
import Profile from "./Pages/5Profile/Profile";
import Messanger from "./Pages/6Messenger/Messenger";
import Meetups from './Pages/8Meetups/Meetups'
import MeetupRoom from "./Pages/9MeetupRoom/MeetupRoom";

import Search from "./Pages/11Search/Search";
import Error404 from "./Components/Error404";
import Community from "./Pages/10Community/Community";
// import NotifyModal from "./Pages/7Notifications/NotifyModal";
import Notifications from "./Pages/7Notifications/Notifications";
import ComponentSearch from "./Pages/10Community/components/ComponentSearch";
import UpdateProfile from "./Pages/5Profile/Components/UpdateProfile/UpdateProfile";
import "./Localization/i18n";
import { io } from "socket.io-client";

function App() {
  const { user, dispatch, isLoading } = useAuthContext();
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(io.connect("http://localhost:7400"));
    console.log(socket);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ !user ? <Landing></Landing> : <Navigate to="/home"></Navigate> }></Route>
        <Route path="/Aboutus" element={<AboutUs></AboutUs>}></Route>
        <Route path="/login" element={!user ? <Login></Login> : <Navigate to="/home"></Navigate>}></Route>
        <Route path="/register" element={ !user ? <Register></Register> : <Navigate to="/home"></Navigate> } ></Route>

        <Route path="profile" element={user ? <Profile /> : <Navigate to="/login"></Navigate>} ></Route> 
        <Route path="/updateProfile" element={<UpdateProfile />}></Route>
        <Route path="/home" element={  user ? <Home socket={socket} /> : <Navigate to="/login"></Navigate> } ></Route>
        <Route path="/search" element={user ? <Search /> : <Navigate to="/login"></Navigate>} ></Route>
        <Route path="componentSearch" element={<ComponentSearch />}></Route>
        <Route path="messenger" element={<Messanger />}></Route>
        <Route path="meetups" element={<Meetups/>}></Route>   
        <Route path="/meetup/:roomId" element={<MeetupRoom/>}></Route> 
        <Route path="/community/:id" element={<Community />}></Route>
        <Route path="notifications" element={<Notifications socket={socket} />} ></Route>
        <Route path="notifications/:userId" element={<Notifications socket={socket} />}></Route>
        {/* <Route path="notifications/:id" element={<NotifyModal />}></Route> */}
        {/* <Route path="notifications" element={<Notifications/>}></Route> */}
        <Route path="*" element={<Error404></Error404>}></Route>
      </Routes>
    </BrowserRouter>


  );
}
export default App;

import React , { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter, Route, Routes, Navigate ,Redirect , NavLink } from "react-router-dom";
import Home from "./components/homecomponent";
import Headercomponents from "./components/headercomponents";
import Footercomponents from "./components/footercomponents";
import Logincomponents from "./components/logincomponents";
import { useAuthContext } from "./hooks/useAuthContext";



import Landing  from "./Pages/1LandingPage/Landing";
// import Login from './Pages/3Login/Login';
// import SignUP from './Pages/2SignUp/';
import Profile from './Pages/5Profile/Profile';
import Home from './Pages/4Home/Home';
import Footer from "./Components/Footer";




  function App() {
    const {user, dispatch} = useAuthContext()
    return (

    <BrowserRouter>
    <Routes>
    <Route path="/" element={!user?<Logincomponents></Logincomponents>:<Navigate to='/home'></Navigate>}></Route>
    <Route path="/login" element={!user?<Logincomponents></Logincomponents>:<Navigate to="/home"></Navigate>}></Route>
    <Route path="/home" element={user?<Home/>:<Navigate to="/login"></Navigate>}></Route>
    </Routes>
    </BrowserRouter>


// <div>
//       <Landing/>  
//       {/* <Profile/> */}
//       {/* <Home/> */}



//       {/* <BrowserRouter>
//         <Routes>
//           <Route  path="/#Login" element={()=>{<Login/>}} />
//         </Routes>
//         <Routes>
//           <Route  path="/#SignUp" element={()=>{<SignUP/>}} />
//         </Routes>
//       </BrowserRouter>   */}

//     </div>




    );
  }
  export default App;
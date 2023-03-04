import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/homecomponent";
import Headercomponents from "./components/headercomponents";
import Footercomponents from "./components/footercomponents";
import Logincomponents from "./components/logincomponents";
import { useAuthContext } from "./hooks/useAuthContext";

  function App() {
    const {userId, dispatch} = useAuthContext()
    return (
 
    <BrowserRouter>
     <Routes>
    <Route path="/" element={!userId?<Logincomponents></Logincomponents>:<Navigate to='/home'></Navigate>}></Route>
    <Route path="/login" element={!userId?<Logincomponents></Logincomponents>:<Navigate to="/home"></Navigate>}></Route>
    <Route path="/home" element={userId?<Home/>:<Navigate to="/login"></Navigate>}></Route>
    </Routes>
    </BrowserRouter>
    );
  }
  export default App;
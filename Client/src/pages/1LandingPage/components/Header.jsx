import React from "react";
import SiteLogo from '../SiteLogo.png';
import { BrowserRouter,Routes,Route, Switch, Link ,NavLink} from 'react-router-dom';

// import { NavLink } from "react-router-dom"; 

let Header = () => {
  return (
    <nav id="menu" className=" navbar-default navbarFIXtop">
      <div className="Maincontainer">
        <div className="navbarHHeader">
        <a className="naVbrand page-scroll ancr navancr " href="#page-top">  DevMeet </a> 
          <img  src={SiteLogo} height="50px" alt="pic"/> 
        </div> 
          <ul className=" navbarNNNav navtoright unordlist">
            <li className="navLnk" >
              <a href="#features" className="page-scroll ancr navancr navancrA">Features & Services</a>
            </li> 
            <li className="navLnk" >
              <a href="#about" className="page-scroll ancr  navancr navancrA">About Us</a>
            </li>
            <button className="btn btn-custom  " >
              <Link to='/login' className="page-scroll logsginin_btns ancr  navancr navancrA" >Login</Link> 
            </button> 
            <button className="btn btn-custom  " >
              <Link to='/register' className="page-scroll logsginin_btns ancr navancr navancrA " >SignUp</Link>
            </button>
          </ul> 
      </div>
    {/* <div>
      <NavLink   style={({isActive })=>({color:isActive?"red":"yellow"})} > hi </NavLink>
    </div> */} 
    </nav>
  );
};


export default Header;
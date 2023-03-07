import React from 'react';
import SiteLogo from '../Pages/1LandingPage/SiteLogo.png'; 
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BrowserRouter,Routes,Route, Switch, Link ,NavLink} from 'react-router-dom';


const NavBar = () => {
    return (  
    <nav id="menu" className=" navbar-default navbarFIXtop">
        <div className=" ">
            <div className="navbarHHeader">
                <a className="naVbrand page-scroll ancr navancr " href="#page-top">  DevMeet </a>
                <img src={SiteLogo} height="50px" alt="pic" />
            </div> 

            <ul className=" navbarNNNav navtoright unordlist">
                <li className="navLnk" >
                    <NavLink  to="/" className="ancr navancr navancrA" style={({isActive })=>({color:isActive?"#7925c7 ":""})} > Home </NavLink>
                </li>
                <li className="navLnk" >
                    <NavLink  to="/notifications" className="ancr navancr navancrA" style={({isActive })=>({color:isActive?"#7925c7 ":""})} > Notifications </NavLink>
                </li>
                <li className="navLnk" >
                    <NavLink  to="/messenger" className="ancr navancr navancrA" style={({isActive })=>({color:isActive?"#7925c7 ":""})} > Messenger </NavLink>
                </li>
                <li className="navLnk" >
                    <NavLink  to="/meetups" className="ancr navancr navancrA" style={({isActive })=>({color:isActive?"#7925c7 ":""})} > Meetups </NavLink>
                </li>
                <li className="navLnk" >
                    <NavLink  to="/profile" className="ancr navancr navancrA" style={({isActive })=>({color:isActive?"#7925c7 ":""})} > Profile </NavLink>
                </li>
                <button className="btn btn-custom  " > 
                    <Link to='/logout' className=" logsginin_btns ancr  navancr navancrA" >Logout</Link>
                </button>
            </ul> 
              {/* SEARCH BAR */}
            <Box component="form" sx={{ '& .MuiTextField-root': {  marginLeft:'60px' ,width: '20ch' }, }} noValidate autoComplete="off" >   
                <TextField id="standard-search" label="Search"  type="search" variant="standard" />          
            </Box> 
    
        </div>  


        {/* <div>
            <NavLink   style={({isActive })=>({color:isActive?"red":"yellow"})} > hi </NavLink>
        </div> */}



            {/* <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person />
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat />
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications />
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <img src="/assets/persons/1.jpg" alt="" className="topbarImg" /> */}

    </nav>  
    );
};

export default NavBar;
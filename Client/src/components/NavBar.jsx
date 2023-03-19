import React, { useState } from 'react';
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { BrowserRouter, Routes, Route, Switch, Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; 
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './MainComponentsSTYLES.css'
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';

const NavBar = ({sendSearch}) => {
    const {user, dispatch } = useAuthContext()
    const [search, setSearch]= useState()
    let [t,i18n]= useTranslation();
    let userInfo = user.user;
    const LogOut = () => {
        //need to use withCredentials to send cookies to server 
        axios.get('http://localhost:7400/logout', {
            withCredentials: true
        }).then((response) => { return response })
            .then(() => {
                localStorage.removeItem('user')
                dispatch({ type: 'LOGOUT' })
            })
            .catch((err) => { console.log(err) })

    }
    return (
        <nav id="menu" className=" navbar-default navbarFIXtop">
            <div className=" ">
                <div className="navbarHHeader">
                <NavLink to="/home"  >
                    <a className="naVbrand page-scroll ancr navancr " href="#page-top">  DevMeet </a>                 
                    <img src="/assets/SiteLogo.png" height="50px" alt="pic" />
                </NavLink>
                </div>

                <ul className=" navbarNNNav navtoright unordlist">
                    <li className="navLnk" >
                        <NavLink to="/" className="ancr navancr navancrA" style={({ isActive }) => ({ color: isActive ? "#7925c7 " : "" })} > {t("Home")} </NavLink>
                    </li>
                    <li className="navLnk" >
                        <NavLink to={`/notifications/${userInfo._id}`} className="ancr navancr navancrA" style={({ isActive }) => ({ color: isActive ? "#7925c7 " : "" })} > {t("Notifications")}  </NavLink>
                    </li>
                    <li className="navLnk" >
                        <NavLink to="/messenger" className="ancr navancr navancrA" style={({ isActive }) => ({ color: isActive ? "#7925c7 " : "" })} > {t("Messenger") }</NavLink>
                    </li>
                    <li className="navLnk" >
                        <NavLink to="/meetups" className="ancr navancr navancrA" style={({ isActive }) => ({ color: isActive ? "#7925c7 " : "" })} > {t("Meetups")} </NavLink>
                    </li>
                    <li className="navLnk" >
                        <NavLink to="/profile" className="ancr navancr navancrA" style={({ isActive }) => ({ color: isActive ? "#7925c7 " : "" })} > {t("Profile")} </NavLink>
                    </li>
                    <button className="myBotton myBotton-custom logsginin_btns ancr  navancr navancrA " onClick={LogOut} >
                        {t("Logout")}
                    </button>

          <div style={{display: 'inline-block', position:"relative", left:"30px", top:"1px"}} > 
      <div style={{display: 'flex'}}>
     {i18n.language==="en"&&<button style={{backgroundColor: '#8B008B', color: 'white', padding: '10px 20px', borderRadius: '5px 0 0 5px', border: 'none', fontSize: '16px', fontWeight: 'bold'}} onClick={()=>{i18n.changeLanguage("ar")}}>
        AR
      </button>}
      { i18n.language==="ar" && <button style={{backgroundColor: 'white', color: '#8B008B', padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', fontSize: '16px', fontWeight: 'bold'}}onClick={()=>{i18n.changeLanguage("en")}}>
        EN
        </button>}
    </div>
    </div>
                </ul>
                {/* SEARCH BAR */}

                <div className="topbarCentre">
                    <div className="searchbar">
                        <Search className="searchIcon" />
                        <input placeholder={t("Search...")} className="searchInput " onChange={(e)=>{setSearch(e.target.value)}} />
                        <span className="focus-bg"></span>
                        <div>
                            <IconButton color="primary" aria-label="upload picture" component="label" onClick={()=>{sendSearch(search)}}>
                                <SendIcon htmlColor='purple' /> 
                            </IconButton>
                        </div>
                    </div>
                </div>

                {/* <Box component="form" sx={{ '& .MuiTextField-root': {  marginLeft:'60px' ,width: '20ch' }, }} noValidate autoComplete="off" >   
                <TextField id="standard-search" label="Search"  type="search" variant="standard" />          
            </Box>  */}

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
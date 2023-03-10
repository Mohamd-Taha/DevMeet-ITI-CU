import React from 'react'; 
import { BrowserRouter, Routes, Route, Switch, Link, NavLink, useNavigate } from 'react-router-dom';



const PlainNavBar = () => {
    return (
        <nav id="menu" className=" navbar-default navbarFIXtop">
            <div className=" Maincontainer">
                <div className="navbarHHeader">
                    <a className="naVbrand page-scroll ancr navancr " href="#page-top">  DevMeet </a>
                    <img src="/assets/SiteLogo.png" height="50px" alt="pic" />
                </div>
                <ul className=" navbarNNNav navtoright unordlist">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="myBotton myBotton-custom logsginin_btns ancr  navancr navancrA " > Back </button>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

export default PlainNavBar;
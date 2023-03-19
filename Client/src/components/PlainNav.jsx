import React from 'react'; 
import { BrowserRouter, Routes, Route, Switch, Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const PlainNavBar = () => {
    let x=useTranslation();
    let [t,i18n]= useTranslation();
    console.log(x)
    console.log(i18n)
    console.log(t)
    return (
        <nav id="menu" className=" navbar-default navbarFIXtop">
            <div className=" Maincontainer">
                <div className="navbarHHeader">
                <NavLink to="/"  style={{ textDecoration: 'none' }}>
                    <a className="naVbrand page-scroll ancr navancr " href="#page-top">  DevMeet </a>
                    <img src="/assets/SiteLogo.png" height="50px" alt="pic" />
                </NavLink>
                </div>
                <ul className=" navbarNNNav navtoright unordlist">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="myBotton myBotton-custom logsginin_btns ancr  navancr navancrA " >{ t("Back")} </button>
                    </Link>
                </ul>

    <div style={{display: 'flex'}}>
      <button style={{backgroundColor: '#8B008B', color: 'white', padding: '10px 20px', borderRadius: '5px 0 0 5px', border: 'none', fontSize: '16px', fontWeight: 'bold'}} onClick={()=>{i18n.changeLanguage("ar")}}>
        AR
      </button>
      <button style={{backgroundColor: 'white', color: '#8B008B', padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', fontSize: '16px', fontWeight: 'bold'}}onClick={()=>{i18n.changeLanguage("en")}}>
        EN
      </button>
    </div>
            </div>
        </nav>
    );
};

export default PlainNavBar;
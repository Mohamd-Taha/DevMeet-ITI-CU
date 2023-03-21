import React from "react";
import { BrowserRouter, Routes, Route, Switch, Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Margin } from "@mui/icons-material";
// import { NavLink } from "react-router-dom"; 

let Header = () => {
  let [t, i18n] = useTranslation();
  return (
    <nav id="menu" className=" navbar-default navbarFIXtop">
      <div className="Maincontainer">
        <div className="navbarHHeader">
          <NavLink to="/" >
            <a className="naVbrand page-scroll ancr navancr ">  DevMeet </a>
            <img src="/assets/SiteLogo.png" height="50px" />
          </NavLink>
        </div>
        <ul className=" navbarNNNav navtoright unordlist">
          <li className="navLnk" >
            <a href="#features" className="page-scroll ancr navancr navancrA"> {t("Features & Services")}</a>
          </li>
          <li className="navLnk" >
            <Link to='/Aboutus' className="page-scroll logsginin_btns ancr  navancr navancrA" >{t("About Us")}</Link>
          </li>
          <button className="myBotton myBotton-custom  " >
            <Link to='/login' className="page-scroll logsginin_btns ancr  navancr navancrA" >{t("Login")}</Link>
          </button>
          <button className="myBotton myBotton-custom  " >
            <Link to='/register' className="page-scroll logsginin_btns ancr navancr navancrA " >{t("Register")}</Link>
          </button>
          <div style={{ display: 'inline-block', position: "relative", left: "30px", top: "1px" }} >
            <div style={{ display: 'flex' }}>
              {i18n.language === "en" && <button style={{ backgroundColor: '#8B008B', color: 'white', padding: '10px 20px', borderRadius: '5px 0 0 5px', border: 'none', fontSize: '16px', fontWeight: 'bold' }} onClick={() => { i18n.changeLanguage("ar") }}>
                AR
              </button>}
              {i18n.language === "ar" && <button style={{ backgroundColor: 'white', color: '#8B008B', padding: '10px 20px', borderRadius: '0 5px 5px 0', border: 'none', fontSize: '16px', fontWeight: 'bold' }} onClick={() => { i18n.changeLanguage("en") }}>
                EN
              </button>}
            </div>
          </div>
        </ul>
      </div>
      {/* <div>
      <NavLink   style={({isActive })=>({color:isActive?"red":"yellow"})} > hi </NavLink>
    </div> */}
    </nav>
  );
};


export default Header;
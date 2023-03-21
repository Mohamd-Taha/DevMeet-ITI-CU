import '@fortawesome/fontawesome-free/css/all.min.css';  // for icons in landingPage 
import React , { useState, useEffect } from "react";
import Header   from "./components/Header";
import Intro    from "./components/Intro";
import ConferenceVid  from "./components/ConferenceVid";
import Features from "./components/Features"; 
import ZoomVid  from "./components/ZoomVid";
import Contact  from "./components/contact"; 
import SmoothScroll from "smooth-scroll";
import Footer from '../../Components/Footer';
import './LandingPage.css' 
import Error404 from '../../Components/Error404'
import { useTranslation } from 'react-i18next';



export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,speedAsDuration: true,
});

function Landing () {
    let [t,i18n]= useTranslation();


    return (
    <>
        <Header/>
        <Intro />
        <ConferenceVid />
        <Features /> 
        <ZoomVid />
        <Contact/>
        <Footer/>
    </>
    );
}

export default Landing ;
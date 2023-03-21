import React , { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

import '../1LandingPage/LandingPage.css'

import PlainNav from '../../Components/PlainNav'; 
import Footer from '../../Components/Footer';
import About  from "./components/About";
import Team     from "./components/Team";
import GoogleMaps  from "../1AboutUs/components/GoogleMaps";
import Contact  from "../1LandingPage/components/contact";

const AboutUs = () => { 

    let [t,i18n]= useTranslation();

    return (
        <div>
            <PlainNav/>  
            <About />
            <Team/> 
            <GoogleMaps /> 
            <Contact />
            <Footer/>
        </div>
    );
};

export default AboutUs;

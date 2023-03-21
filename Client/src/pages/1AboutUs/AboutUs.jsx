import React , { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import JsonData from "../1LandingPage/data/data.json"; 
import '../1LandingPage/LandingPage.css'

import PlainNav from '../../Components/PlainNav'; 
import Footer from '../../Components/Footer';
import About  from "./components/About";
import Team     from "./components/Team";
import GoogleMaps  from "../1AboutUs/components/GoogleMaps";
import Contact  from "../1LandingPage/components/contact";

const Payment = () => { 

    let [t,i18n]= useTranslation();

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);



    return (
        <div>
            <PlainNav/>  
            <About data={landingPageData.About} />
            <Team data={landingPageData.Team} /> 
            <GoogleMaps /> 
            <Contact data={landingPageData.Contact} />
            <Footer/>
        </div>
    );
};

export default Payment;

import '@fortawesome/fontawesome-free/css/all.min.css';  // for icons in landingPage 
import React , { useState, useEffect } from "react";
import Header   from "./components/Header";
import Intro    from "./components/Intro";
import Features from "./components/Features";
import AboutUs  from "./components/AboutUs";
import Team     from "./components/Team";
import Contact  from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Footer from '../../Components/Footer';
import './LandingPage.css'
import { BrowserRouter,Routes,Route, Switch, Link ,NavLink} from 'react-router-dom';
import Error404 from '../../Components/Error404'
import { useTranslation } from 'react-i18next';



export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,speedAsDuration: true,
});

function Landing () {
    let [t,i18n]= useTranslation();

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
    <>
        <Header/>
        <Intro />
        <Features data={landingPageData.Features} />
        <AboutUs data={landingPageData.About} />
        <Team data={landingPageData.Team} /> 
        <Contact data={landingPageData.Contact} />
        <Footer/>
    </>
    );
}

export default Landing ;
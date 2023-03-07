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



export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,speedAsDuration: true,
});

function Landing () {

    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);

    return (
    <>
    <BrowserRouter>
        <Header/>
        <Intro />
        <Features data={landingPageData.Features} />
        <AboutUs data={landingPageData.About} />
        <Team data={landingPageData.Team} /> 
        <Contact data={landingPageData.Contact} />
        <Footer/>



    <Routes>
        {/* <Route path="/login" element={}></Route>*/}
        {/* <Route path="/siginup" element={}></Route>*/}
        {/* <Route path="*" element={<Error404></Error404>}></Route> */}
    </Routes> 



    </BrowserRouter>
    </>
    );
}

export default Landing ;
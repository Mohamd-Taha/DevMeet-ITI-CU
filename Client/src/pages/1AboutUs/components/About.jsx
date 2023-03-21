import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from 'react-i18next';


let About = (props) => {
   let [t,i18n]= useTranslation();
  return (
    <div id="about" style={{paddingTop:'150px'}}>
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colXS12 colmd6"> 
            <img src="images/LandingPageimgs/About2.png " className="img-responsive" alt="" style={{height:'360px', width:'600px'}}/> 
          </div>
          <div className="colXS12 colmd6">
            <div className="about-text">
              <h2 className="font-h2" >{t("About Us")} </h2>
              <p className="parag"  >
               {t("Welcome to DevMeet, the social media platform for developers. At DevMeet,")} 
                {t("we believe that developers need a place to connect, collaborate, and learn from")} 
                {t("each other. That's why we've created a community where developers can meet, post,")}  
                {t("and ask technical and non-technical questions, and interact with each other")} 
              </p>
              <h3 className="font-h3" style={{paddingTop:'20px'}}>{t("Why Choose Us?")} </h3>
              <div className="list-style">
                <div className="collg6 colsm6 colXS12">
                  <ul> 
                    <li>{t("Quality")} </li>
                    <li>{t("Reliability")} </li>
                    <li>{t("Experience")} </li>
                    <li>{t("Good Customer service")} </li>
                  </ul>
                </div>
                <div className="collg6 colsm6 colXS12">
                  <ul>
                    <li>{t("Easy of use")} </li>
                    <li>{t("Innovation")} </li>
                    <li>{t("24/7 Availability")} </li>
                    <li>{t("Cost-effectiveness")} </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <Container style={{paddingTop:'500px'}}>
          <h2 className="font-h2" >{t("Know More")}</h2>
          <div style={{display:'flex'}} >
            <div>
              <img src="images/Aboutus.png " className="img-responsive" alt="" style={{height:'360px', width:'600px'}}/> 
            </div>
            <div>
                <p className="parag aboutusarticle">
                 {t("Our platform offers a variety of features, including a user-friendly interface,")} 
                   {t("customizable profiles, and a powerful search engine that helps developers find ")}
                   {t("the information and resources they need quickly and easily. We're committed to ")}
                   {t("creating a safe, inclusive, and supportive environment for all developers, regardless")} 
                   {t("of their level of experience or background.")}
                </p>
                <p className="parag aboutusarticle"  >
                   {t("In addition to our online community, we also hold virtual and in-person meetings and events")}
                   {t("where developers can come together to network, learn, and share their knowledge. Our events")} 
                   {t("are designed to provide developers with valuable opportunities to connect with industry experts,")}
                   {t("learn about the latest technologies and trends, and build their skills.")}
                </p>
              </div>
            </div>
            <div>
              <p className="parag aboutusarticle"  >
                 {t("At DevMeet, we're passionate about helping developers succeed. Our team is made up of experienced")}
                 {t("professionals who are dedicated to providing the resources and support that developers need to")} 
                 {t("thrive in their careers. We're always looking for ways to improve and innovate, and we're committed")}
                 {t("to creating a community that is truly beneficial to developers.")}
              </p>
            </div>
        </Container>
      </div>
    </div>
  );
};



export default About;
import React from "react";
import { Container } from "react-bootstrap";



let About = (props) => {
  return (
    <div id="about" style={{paddingTop:'150px'}}>
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colXS12 colmd6"> 
            <img src="images/LandingPageimgs/About2.png " className="img-responsive" alt="" style={{height:'360px', width:'600px'}}/> 
          </div>
          <div className="colXS12 colmd6">
            <div className="about-text">
              <h2 className="font-h2" >About Us</h2>
              <p className="parag"  >
                Welcome to DevMeet, the social media platform for developers. At DevMeet, 
                we believe that developers need a place to connect, collaborate, and learn from 
                each other. That's why we've created a community where developers can meet, post, 
                and ask technical and non-technical questions, and interact with each other
              </p>
              <h3 className="font-h3" style={{paddingTop:'20px'}}>Why Choose Us?</h3>
              <div className="list-style">
                <div className="collg6 colsm6 colXS12">
                  <ul> 
                    <li>Quality</li>
                    <li>Reliability</li>
                    <li>Experience</li>
                    <li>Good Customer service</li>
                  </ul>
                </div>
                <div className="collg6 colsm6 colXS12">
                  <ul>
                    <li>Easy of use</li>
                    <li>Innovation</li>
                    <li>24/7 Availability</li>
                    <li>Cost-effectiveness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> 

        <Container style={{paddingTop:'500px'}}>
          <h2 className="font-h2" >Know More</h2>
          <div style={{display:'flex'}} >
            <div>
              <img src="images/Aboutus.png " className="img-responsive" alt="" style={{height:'360px', width:'600px'}}/> 
            </div>
            <div>
                <p className="parag aboutusarticle">
                  Our platform offers a variety of features, including a user-friendly interface, 
                  customizable profiles, and a powerful search engine that helps developers find 
                  the information and resources they need quickly and easily. We're committed to 
                  creating a safe, inclusive, and supportive environment for all developers, regardless 
                  of their level of experience or background.
                </p>
                <p className="parag aboutusarticle"  >
                  In addition to our online community, we also hold virtual and in-person meetings and events
                  where developers can come together to network, learn, and share their knowledge. Our events 
                  are designed to provide developers with valuable opportunities to connect with industry experts,
                  learn about the latest technologies and trends, and build their skills.
                </p>
              </div>
            </div>
            <div>
              <p className="parag aboutusarticle"  >
                At DevMeet, we're passionate about helping developers succeed. Our team is made up of experienced
                professionals who are dedicated to providing the resources and support that developers need to 
                thrive in their careers. We're always looking for ways to improve and innovate, and we're committed
                to creating a community that is truly beneficial to developers.
              </p>
            </div>
        </Container>
      </div>
    </div>
  );
};



export default About;
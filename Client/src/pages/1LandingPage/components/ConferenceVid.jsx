import React from "react";
import { Container } from 'react-bootstrap';



let Team = () => {
  return (
    <div id="team" className="txtCenter">
      <div className="Maincontainer" >
        <div className="colMD8 colmdofst2 section-title">
          <h2 className="font-h2">Meet with the experts of your field</h2>
          <p className="parag" >Join the conversations,Meetups and connect with the tech community</p>
          <h4 className="font-h4" style={{paddingBottom:'20px'}} >Building a better future through innovation and collaboration</h4>

          <div className="ratio ratio-16x9" > 
            <iframe style={{ borderRadius:'20px' }} src="https://www.youtube.com/embed/YGBtQc5PzDU?start=4" title="YouTube video" allowFullScreen></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Team ;
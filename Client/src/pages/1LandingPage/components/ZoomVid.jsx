import React from "react";

let Team = () => {
  return (
    <div id="team" className="txtCenter">
      <div className="Maincontainer" >
        <div className="colMD8 colmdofst2 section-title">
        <h2 className="font-h2">Online Meetings</h2>
          <img src='/images/LandingPageimgs/ZoomLogo.png' alt="zoom" style={{paddingBottom:'10px', height:'10rem'}}/>
          <p className="parag" >Video conferences Using ZOOM</p>
          <h4 className="font-h4" style={{paddingBottom:'20px'}} >Allowing people to connect and collaborate remotely from anywhere in the world.</h4>

          
          <div className="ratio ratio-16x9" > 
            <iframe style={{ borderRadius:'20px' }} src="https://www.youtube.com/embed/VnyitUU4DUY" title="YouTube video" allowFullScreen></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Team ;




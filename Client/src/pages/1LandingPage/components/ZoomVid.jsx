import React from "react";
import { useTranslation } from 'react-i18next';

let Team = () => {
     let [t,i18n]= useTranslation();
  return (
    <div id="team" className="txtCenter">
      <div className="Maincontainer" >
        <div className="colMD8 colmdofst2 section-title">
        <h2 className="font-h2">{t("Online Meetings")}</h2>
          <img src='/images/LandingPageimgs/ZoomLogo.png' alt="zoom" style={{paddingBottom:'10px', height:'10rem'}}/>
          <p className="parag" >{t("Video conferences Using ZOOM")}</p>
          <h4 className="font-h4" style={{paddingBottom:'20px'}} >{t("Allowing people to connect and collaborate remotely from anywhere in the world.")}</h4>

          
          <div className="ratio ratio-16x9" > 
            <iframe style={{ borderRadius:'20px' }} src="https://www.youtube.com/embed/VnyitUU4DUY" title="YouTube video" allowFullScreen></iframe>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Team ;




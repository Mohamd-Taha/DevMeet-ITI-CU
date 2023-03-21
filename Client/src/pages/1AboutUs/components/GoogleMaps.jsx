import React from "react";
import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
let Team = () => {
     let [t,i18n]= useTranslation();
  return (
    <div className="txtCenter section-title " style={{paddingTop:'70px'}}>

      <h2 className="font-h2">{t("Reserve us a visit")}</h2> 
      <p className="parag" >{t("in Our Office")}</p>
      <h4 className="font-h4" style={{paddingBottom:'20px'}} >{t("We are most welcomed to deal with you")} </h4>
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914.9274097825751!2d31.200798996708315!3d30.028078772304934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584732138d4725%3A0x70252ef3fa2affd9!2z2YXYsdmD2LIg2KfZhNin2KjYr9in2Lkg2KfZhNiq2YPZhtmI2YTZiNis2Yo!5e0!3m2!1sen!2seg!4v1679352214909!5m2!1sen!2seg" width="1600px" height="500px" style={{border:'2px dashed gray'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      </div> 
  );
};


export default Team ;



import React from "react";
import { useTranslation } from 'react-i18next';

let Intro = (props) => {
    let [t,i18n]= useTranslation();
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="Maincontainer">
            <div className="myrow">
              <div className="colMD8 colmdofst2 intro-text">
                <h1  className="font-h1" >DevMeet </h1>
                <p className="parag"  >{t("The Place Where Developers Can Meet")}</p>
                <a  href="#features" className="  myBotton-custom  page-scroll ancr">{t("Learn More")} </a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Intro ;
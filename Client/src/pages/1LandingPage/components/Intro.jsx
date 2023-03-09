import React from "react";

let Intro = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="Maincontainer">
            <div className="myrow">
              <div className="colMD8 colmdofst2 intro-text">
                <h1  className="font-h1" >DevMeet </h1>
                <p className="parag"  >The Place Where Developers Can Meet</p>
                <a  href="#features" className="  myBotton-custom  page-scroll ancr">Learn More </a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Intro ;
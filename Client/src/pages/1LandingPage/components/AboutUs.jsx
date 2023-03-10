import React from "react";




let AboutUs = (props) => {
  return (
    <div id="about">
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colXS12 colmd6"> 
            <img src="images/LandingPageimgs/About2.png " className="img-responsive" alt="" style={{height:'360px', width:'600px'}}/> 
          </div>
          <div className="colXS12 colmd6">
            <div className="about-text">
              <h2 className="font-h2" >About Us</h2>
              <p className="parag"  >{props.data ? props.data.paragraph : "loading..."}</p>
              <h3 className="font-h3" >Why Choose Us?</h3>
              <div className="list-style">
                <div className="collg6 colsm6 colXS12">
                  <ul>
                    {props.data
                      ? props.data.Why.map((d, i) => (
                          <li key={`${d}-${i}`}>{d}</li>
                        ))
                      : "loading"}
                  </ul>
                </div>
                <div className="collg6 colsm6 colXS12">
                  <ul>
                    {props.data ? props.data.Why2.map((d, i) => (
                          <li key={`${d}-${i}`}> {d}</li>
                        )) : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default AboutUs;
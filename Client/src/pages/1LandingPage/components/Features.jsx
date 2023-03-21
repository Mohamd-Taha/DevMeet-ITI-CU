import React from "react";

let Features = (props) => {
  return (
    <div id="features" className="txtCenter" style={{backgroundColor:'white'}}>
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colmd10 colmdofst1 section-title">
            <h2 className="font-h2" >Features</h2>
          </div>
          {props.data ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`} className="colxs6 colmd3">
                  {" "}
                  <i className={d.icon}></i>
                  <h3 className="font-h3" >{d.title}</h3>
                  <p className="parag"  >{d.text}</p>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Features ;
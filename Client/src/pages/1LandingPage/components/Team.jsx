import React from "react";

let Team = (props) => {
  return (
    <div id="team" className="txtCenter">
      <div className="Maincontainer">
        <div className="colMD8 colmdofst2 section-title">
          <h2 className="font-h2">Meet the Team</h2>
          <p className="parag" >We are Students @ITP - Information Technology Institute </p>
          <h4 className="font-h4" >Full Stack Web Develeopment using MEARN track</h4>
        </div>
        <div id="myrow"> 
          {props.data ? props.data.map((d, i) => ( 
                <div key={`${d.name}-${i}`} className="colmd3 colsm6 team"> 
                  <div className="thumbnail"> 
                    <img src={d.img} alt="." className="team-img" />
                    <div className="caption">
                      <h4 className="font-h4" >{d.name}</h4>
                      <p className="parag" >{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};


export default Team ;
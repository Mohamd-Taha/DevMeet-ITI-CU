import React from "react";

let Features = () => {
  return (
    <div id="features" className="txtCenter" style={{backgroundColor:'white'}}>
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colmd10 colmdofst1 section-title">
            <h2 className="font-h2" >Features</h2>
          </div>

          
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-bullhorn"></i>
              <h3 className="font-h3" >Post & Ask Questions</h3>
              <p className="parag"  >Post your question on the platform and you will gladly get the help</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-laptop-code"></i>
              <h3 className="font-h3" >Interact and Comment</h3>
              <p className="parag"  >You can help the others if you have the solution for thier issues</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-users"></i>
              <h3 className="font-h3" >Online Meetings</h3>
              <p className="parag"  >Meet & Disscuss a lot of topics and negotiate with others using Zoom meetings</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-comments"></i>
              <h3 className="font-h3" >Chatting</h3>
              <p className="parag"  >Developers can be connected to each other in chat rooms</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-diagram-project"></i>
              <h3 className="font-h3" >Communities</h3>
              <p className="parag"  >Collaborate with your community members and get new ideas</p>
            </div> 


        </div>
      </div>
    </div>
  );
};

export default Features ;
import React from "react";
import { useTranslation } from 'react-i18next';

let Features = () => {
   let [t,i18n]= useTranslation();
  return (
    <div id="features" className="txtCenter" style={{backgroundColor:'white'}}>
      <div className="Maincontainer">
        <div className="myrow">
          <div className="colmd10 colmdofst1 section-title">
            <h2 className="font-h2" >{t("Features")}</h2>
          </div>

          
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-bullhorn"></i>
              <h3 className="font-h3" >{t("Post & Ask Questions")}</h3>
              <p className="parag"  >{t("Post your question on the platform and you will gladly get the help")}</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-laptop-code"></i>
              <h3 className="font-h3" >{t("Interact and Comment")}</h3>
              <p className="parag"  >{t("You can help the others if you have the solution for thier issues")}</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-users"></i>
              <h3 className="font-h3" >{t("Online Meetings")}</h3>
              <p className="parag"  >{t("Meet & Disscuss a lot of topics and negotiate with others using Zoom meetings")}</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-comments"></i>
              <h3 className="font-h3" >{t("Chatting")}</h3>
              <p className="parag"  >{t("Developers can be connected to each other in chat rooms")}</p>
            </div> 
            <div   className="colxs6 colmd3">
              {" "}
              <i className="fa fa-diagram-project"></i>
              <h3 className="font-h3" >{t("Communities")}</h3>
              <p className="parag"  >{t("Collaborate with your community members and get new ideas")}</p>
            </div> 


        </div>
      </div>
    </div>
  );
};

export default Features ;
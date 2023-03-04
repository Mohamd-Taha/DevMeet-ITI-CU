import React from 'react';

import { FaYoutube,FaFacebook,FaLinkedin,FaInstagram} from 'react-icons/fa';
function Footercomponents(props) {
  
    return (
        <div>
            <footer >
            <FaYoutube className="icons youtube" />
         <FaFacebook className="icons facebook"/>
         <FaLinkedin className="icons linkedin"/>
         <FaInstagram className="icons instagram"/>
            
            
            </footer>
        </div>
    );
}

export default Footercomponents;
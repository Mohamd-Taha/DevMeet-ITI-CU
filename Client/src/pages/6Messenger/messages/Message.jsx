import React, { useState } from 'react';
import "./message.css"
import {format} from "timeago.js"
import axios from "axios";
function Message({message,own}) {
   
    return (
        <div className={own?"message own":"message"}>
            <div className="messageTop">
                <img className='messageImg' src="images/profileimg.jpg" alt="" />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>
    );
}

export default Message;
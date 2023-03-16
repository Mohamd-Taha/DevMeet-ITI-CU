import React, { useState } from 'react';
import "./message.css"
import { format } from "timeago.js"
import axios from "axios";
function Message({ message, own }) {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg' src="images/profileimg.jpg" alt="you" />
                <p className='messageText'>{message.text}</p>
            </div>
                <span  className="messageBottom"  > {format(message.createdAt)} </span>
        </div>
    );
}

export default Message;
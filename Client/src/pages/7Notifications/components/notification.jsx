import React from 'react';
import './notification.css'



const Notification = (props) => {
    return (
        <div>
            <div className ='wrapper'>
                <img className='UserImage'  src={props.userImage} alt="User image" />
                <div className='NotificationContent' >
                    <h3 className='Title' >{props.title}</h3>
                    <span className='Time' >{props.time}</span>
                    <p className='Description' >{props.description}</p>
                </div>
                <span className='Icon' >{props.icon}</span>
            </div>
        </div>
    );
};


export default Notification;

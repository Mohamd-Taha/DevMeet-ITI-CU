import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./conversation.css"
const Conversation = ({conversation,currentUser}) => {
    var counter=0;
    const  [user,setUser]=useState(null)
    useEffect(()=>{
const friendId=conversation.members.find(m=>m !==currentUser._id);
const getUser=async ()=>{
    await axios("http://localhost:7400/user/"+friendId).then(res=>{
       setUser(res.data)
       counter++;
      }).catch(
        err=>{
            console.log("err")
        
      })
}
getUser();
    },[currentUser,conversation])
    return (
        <div className='conversation'>
            <img className='conversationImg' src="images/profileimg.jpg" alt="" />
            <span className="conversationName">{user?.firstName}</span>
        </div>
    );
};

export default Conversation;
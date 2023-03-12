import React from 'react'
import { NavLink } from 'react-router-dom'
import "./closeFriend.css"


export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
        <NavLink to={{pathname:`/profile`, state:{user: user}}}> 
          <img className='sidebarFriendImg' src={`http://localhost:7400/images/${user.profilePicture}`} alt="" />
          <span className='sidearFriendName'>{user.firstName}</span>
          <span className='sidearFriendName'>{user.lastName}</span>
        </NavLink>  
    </li>
  )
}

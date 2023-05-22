import React from 'react'
import { NavLink } from 'react-router-dom'
import "./closeFriend.css"


export default function CloseFriend({ user }) {
  return (
    <li className=" ">
      <NavLink to={`/profile`} state={{ user: user }}>
        <img className='sidebarFriendImg' src={`${process.env.REACT_APP_API_URL}/images/${user.profilePicture}`} alt="" />
        <span className='sidearFriendName'>{" " + user.firstName + " " + user.lastName}</span>
      </NavLink>
    </li>
  )
}

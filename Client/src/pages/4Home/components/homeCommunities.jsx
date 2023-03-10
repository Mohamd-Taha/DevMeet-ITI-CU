import React from 'react'
import { NavLink } from 'react-router-dom'
import "./homeCommunities.css"
function HomeCommunities({community}) {

  return (
      <li className="sidebarCommunity">
        <NavLink to={{pathname:`/community`, state:{community: community}}}> 
        <img className='sidebarCommunityImg' src={`http://localhost:7400/images/${community.commiunityIcon}`} alt="" />
         </NavLink>
        <span>{community.communityName}</span>
       
    </li>
  )
}

export default HomeCommunities
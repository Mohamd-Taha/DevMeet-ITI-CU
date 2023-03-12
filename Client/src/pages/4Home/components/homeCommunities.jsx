import React from 'react'
import { NavLink } from 'react-router-dom'
import "./homeCommunities.css"
function HomeCommunities({community}) {

  return (
      <li className="sidebarCommunity">
           <NavLink className={'communityNavLink'} to={`/community`} state={{community: community}}>
        <img className='sidebarCommunityImg' src={`http://localhost:7400/images/${community.commiunityIcon}`} alt="" />
        <span className='communitySpan'>{community.communityName}</span>
              </NavLink>
       
    </li>
  )
}

export default HomeCommunities
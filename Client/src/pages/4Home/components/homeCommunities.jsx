import React from 'react'
import { NavLink } from 'react-router-dom'
import "./homeCommunities.css"
function HomeCommunities({ community }) {

  return (
    <li className="sidebarCommunity">
      {/* <NavLink to={{pathname:`/community`, state:{community: community}}}>  */}
      <NavLink to={`/community/${community._id}`}>
        <img className='sidebarCommunityImg' src={`${process.env.REACT_APP_API_URL}/images/${community.commiunityIcon}`} alt="" />
        <span className='communitySpan'>{community.communityName}</span>
      </NavLink>
    </li>
  )
}

export default HomeCommunities
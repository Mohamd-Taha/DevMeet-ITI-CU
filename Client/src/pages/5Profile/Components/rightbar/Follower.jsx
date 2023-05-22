import React from 'react';
import { NavLink } from "react-router-dom";


const Follower = ({ follower }) => {

    return (
        <div className="rightbarFollowing" >
            <NavLink to={`/profile`} state={{ user: follower }}>
                <img src={`${process.env.REACT_APP_API_URL}/images/${follower.profilePicture}`} className="rightbarFollowingImg" />
            </NavLink>
            <h6 style={{ lineHeight: '1' }} >{follower.firstName + " "}</h6>
            <h6 style={{ lineHeight: '0.2' }} >{follower.lastName + " "}</h6>
            {/* <span>{follower.email}</span> */}
        </div>
    );
};

export default Follower;

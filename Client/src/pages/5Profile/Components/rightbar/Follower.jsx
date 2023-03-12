import React from 'react'; 
import { NavLink } from "react-router-dom";


const Follower = ({follower}) => { 

    return (
        <div className="rightbarFollowing" >
            <NavLink to={`/profile`} state={{ user: follower }}>
                <img  src={`http://localhost:7400/images/${follower.profilePicture}`} className="rightbarFollowingImg" />
            </NavLink>
            <h6>{follower.firstName+" "+follower.lastName}</h6>
            {/* <span>{follower.email}</span> */}
        </div>
    );
};

export default Follower;

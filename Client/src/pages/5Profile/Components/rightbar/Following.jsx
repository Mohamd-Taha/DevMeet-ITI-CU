import React from 'react';
import { NavLink } from "react-router-dom";


const Following = ({ following }) => {

    return (
        <div className="rightbarFollowing" >
            <NavLink to={`/profile`} state={{ user: following }}>
                <img src={`${process.env.REACT_APP_API_URL}/images/${following.profilePicture}`} className="rightbarFollowingImg" />
            </NavLink>
            <h6 style={{ lineHeight: '1' }} >{following.firstName + " "}</h6>
            <h6 style={{ lineHeight: '0.2' }} >{following.lastName + " "}</h6>
        </div>
    );
};

export default Following;

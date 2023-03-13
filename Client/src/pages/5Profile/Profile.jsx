import React, { useEffect } from 'react'
import "./Profile.css" 
import NavBar from '../../Components/NavBar';
// import Leftbar from "./Components/Leftbar/Leftbar";
import ProfilePosts from "./Components/ProfilePosts/ProfilePosts";
import Rightbar from "./Components/rightbar/Rightbar";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from 'axios';

function Profile() {
const location = useLocation()
console.log(location)
const {state} = location
console.log(state)
 const { user } = useAuthContext()
 let userProfile = user.user
if(state){
userProfile= state.user
Object.freeze(userProfile)
    }
else{
 Object.freeze(userProfile)
    }

    return (
        <>
            <NavBar />
            <div className="profile">
                {/* < Leftbar /> */}
                <div className="profileRight">
                    <div className="profilerightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={`http://localhost:7400/images/${userProfile.coverPicture}`} alt="" />
                            <img className='profileUserImg' src={`http://localhost:7400/images/${userProfile.profilePicture}`} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{userProfile.firstName+" "+userProfile.lastName}</h4>
                            <span className='profileInfoDesc'>Hello World</span>
                        </div>
                    </div>

                    <div className="profilerightBottom">
                        <ProfilePosts />
                        <Rightbar profile  userProfile={userProfile} />
                    </div>
                </div>
            </div>
        </> 
    )
}
export default Profile;

import React, { useEffect } from 'react'
import "./Profile.css" 
import NavBar from '../../Components/NavBar';
import Sidebar from "./Components/sidebar/Sidebar";
import Feed from "./Components/feed/Feed";
import Rightbar from "./Components/rightbar/Rightbar";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from 'axios';

export default function Profile() {
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
                <Sidebar />
                <div className="profileRight">
                    <div className="profilerightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src="assets/post/3.jpg" alt="" />
                            <img className='profileUserImg' src="assets/persons/4.jpg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{userProfile.firstName}&nbsp;{userProfile.lastName}</h4>
                            <span className='profileInfoDesc'>Hello MEARN</span>
                        </div>
                    </div>
                    <div className="profilerightBottom">
                        <Feed />
                        {userProfile && <Rightbar userProfile={userProfile} profile/>}
                    </div>
                </div>
            </div>
        </>
    )
}

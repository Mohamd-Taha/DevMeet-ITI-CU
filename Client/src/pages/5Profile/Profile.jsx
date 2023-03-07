import React from 'react'
import "./Profile.css" 
import NavBar from '../../Components/NavBar';
import Sidebar from "./Components/sidebar/Sidebar";
import Feed from "./Components/feed/Feed";
import Rightbar from "./Components/rightbar/Rightbar";
export default function Profile() {
    return (
        <>
            {/* <NavBar /> */}
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profilerightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src="assets/post/3.jpg" alt="" />
                            <img className='profileUserImg' src="assets/persons/4.jpg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>Abdelrahman Mohamed</h4>
                            <span className='profileInfoDesc'>Hello MEARN</span>
                        </div>
                    </div>
                    <div className="profilerightBottom">
                        <Feed />
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    )
}

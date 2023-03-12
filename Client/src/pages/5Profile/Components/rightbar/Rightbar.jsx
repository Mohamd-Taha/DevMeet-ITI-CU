import React , { useEffect, useState } from 'react'
import Follower from './Follower';
import './Rightbar.css'
import axios from 'axios';




const Rightbar = ({ profile, userProfile }) => {

    const [followers,setFollowers]= useState();

    useEffect(() => {
        axios.get(`http://localhost:7400/user/followers/${userProfile._id}`, { withCredentials: true })
            .then((response) => { return response })
            .then(({ data }) => {
                console.log(data)
                setFollowers(data);
            })
            .catch((err) => { console.log(err) })
            console.log(followers);
    }, [])




    return (
        <>
            <div className='rightbar'>


                <div className="rightbarWrapper">
                    <h4 className='rightbarTitle'>User information</h4>
                    <div className="rightbarInfo">
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">City:</span>
                            <span className="rightbarInfoValue">Cairo</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">From:</span>
                            <span className="rightbarInfoValue">Egypt</span>
                        </div>
                        <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Title:</span>
                            <span className="rightbarInfoValue">Sofrware Developer</span>
                        </div>
                    </div>

                    <hr className='sidebarHr' />

                    <h3 className='rightbarTitle'>My Followers</h3>
                    <div className="rightbarFollowings">

                        
                    {followers?.map((f) => ( 
                        <Follower  key={f._id} follower={f} />
                    ))}

                        

                    </div>

                    <hr className='sidebarHr' />

                </div>
            </div>
        </>
    );
}
export default Rightbar;
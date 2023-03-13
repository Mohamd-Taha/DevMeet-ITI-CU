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
            console.log("0000000");
    }, [userProfile])




    return (
        <>
            <div className='rightbar'>


                <div className="rightbarWrapper">
                    <h4 className='rightbarTitle'>User information</h4>
                    <div className="rightbarInfo">
                        {userProfile.city && <div className="rightbarInfoItem">
                          <span className="rightbarInfoKey">Location:</span>
                            <span className="rightbarInfoValue">{userProfile.city}</span>
                        </div>}
                      {userProfile.career &&  <div className="rightbarInfoItem">
                            <span className="rightbarInfoKey">Occupation:</span>
                            <span className="rightbarInfoValue">{userProfile.career}</span>
                        </div>}
                    </div>

                    <hr className='sidebarHr' />

                    { followers && <h3 className='rightbarTitle'>{"("+followers.length+") "}Followers</h3>}

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
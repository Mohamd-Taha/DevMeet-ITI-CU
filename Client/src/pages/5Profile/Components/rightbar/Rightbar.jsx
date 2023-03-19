import React, { useEffect, useState } from 'react'
import Follower from './Follower';
import Following from './Following';
import './rightbar.css'
import axios from 'axios';




const Rightbar = ({ profile, userProfile , user}) => {

    const [followers, setFollowers] = useState();
    const [followings, setFollowings] = useState();

    useEffect(() => {
        axios.get(`http://localhost:7400/user/followers/${userProfile._id}`, { withCredentials: true })
            .then((response) => { return response })
            .then(({ data }) => { 
                setFollowers(data);
            })
            .catch((err) => { console.log(err) })

        axios.get(`http://localhost:7400/user/following/${userProfile._id}`, { withCredentials: true })
            .then((response) => { return response })
            .then(({ data }) => { 
                setFollowings(data);
            })
            .catch((err) => { console.log(err) })

    }, [userProfile])




    return (
        <>
            <div className='rightbar'>


                <div className="rightbarWrapper">
                    <h4 className='rightbarTitle'>User information</h4>
                    <div className="rightbarInfo">
                        {!userProfile.city && !userProfile.career && userProfile._id==user._id &&
                            <div>
                                <p>Update your profile info...</p>
                            </div>
                        }

                        {!userProfile.city && !userProfile.career && userProfile._id!=user._id &&
                            <div>
                                <p>This User hasn't updated his profile info yet</p>
                            </div>
                        }    



                        {userProfile.city &&
                            <div className="rightbarInfoItem">
                                <span className="rightbarInfoKey">Location:</span>
                                <span className="rightbarInfoValue">{userProfile.city}</span>
                            </div>
                        }

                        {userProfile.career &&
                            <div className="rightbarInfoItem">
                                <span className="rightbarInfoKey">Title:</span>
                                <span className="rightbarInfoValue">{userProfile.career}</span>
                            </div>
                        }
                    </div>

                    <hr className='sidebarHr' />

                    {followers && <h3 className='rightbarTitle'>{"(" + followers.length + ") "}Followers</h3>}
                    <div className="rightbarFollowings">
                        {followers?.map((f) => (
                            <Follower key={f._id} follower={f} />
                        ))}
                    </div>

                    <hr className='sidebarHr' />

                    {followings && <h3 className='rightbarTitle'>{"(" + followings.length + ") "}Followings</h3>}
                    <div className="rightbarFollowings">
                        {followings?.map((f) => (
                            <Following key={f._id} following={f} />
                        ))}
                    </div>



                </div>
            </div>
        </>
    );
}
export default Rightbar;
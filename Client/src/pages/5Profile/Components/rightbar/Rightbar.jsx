import React, { useEffect, useState } from 'react'
import Follower from './Follower';
import Following from './Following';
import './rightbar.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next'




const Rightbar = ({ profile, userProfile, user }) => {

    const [followers, setFollowers] = useState();
    const [followings, setFollowings] = useState();
    let [t, i18n] = useTranslation();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/followers/${userProfile._id}`, { withCredentials: true })
            .then((response) => { return response })
            .then(({ data }) => {
                setFollowers(data);
            })
            .catch((err) => { console.log(err) })

        axios.get(`${process.env.REACT_APP_API_URL}/user/following/${userProfile._id}`, { withCredentials: true })
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
                    <h4 className='rightbarTitle'>{t("User information")}</h4>
                    <div className="rightbarInfo">
                        {!userProfile.city && !userProfile.career && userProfile._id == user._id &&
                            <div>
                                <p>{t("Update your profile info...")}</p>
                            </div>
                        }

                        {!userProfile.city && !userProfile.career && userProfile._id != user._id &&
                            <div>
                                <p>This User hasn't updated his profile info yet</p>
                            </div>
                        }



                        {userProfile.city &&
                            <div className="rightbarInfoItem">
                                <span className="rightbarInfoKey">{t("Location:")}</span>
                                <span className="rightbarInfoValue">{userProfile.city}</span>
                            </div>
                        }

                        {userProfile.career &&
                            <div className="rightbarInfoItem">
                                <span className="rightbarInfoKey">{t("Title:")}</span>
                                <span className="rightbarInfoValue">{userProfile.career}</span>
                            </div>
                        }
                    </div>

                    <hr className='sidebarHr' />

                    {followers && <h3 className='rightbarTitle'>{"(" + followers.length + ") "}{t("Followers")}</h3>}
                    <div className="rightbarFollowings">
                        {followers?.map((f) => (
                            <Follower key={f._id} follower={f} />
                        ))}
                    </div>

                    <hr className='sidebarHr' />

                    {followings && <h3 className='rightbarTitle'>{"(" + followings.length + ") "}{t("Followings")}</h3>}
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
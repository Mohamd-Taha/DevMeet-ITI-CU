import React, { useEffect, useState } from 'react'
import "./Profile.css"
import NavBar from '../../Components/NavBar';
import { NavLink } from "react-router-dom";
// import Leftbar from "./Components/Leftbar/Leftbar";
import ProfilePosts from "./Components/ProfilePosts/ProfilePosts";
import Rightbar from "./Components/rightbar/Rightbar";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next'

function Profile() {
    let [t,i18n]= useTranslation();
    const location = useLocation()
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState();

    const { state } = location
    let { user } = useAuthContext()


    useEffect(() => {
        if (state) {
            setUserProfile(state.user)
            Object.freeze(user)
        }
        else {
            setUserProfile(user.user);
            Object.freeze(user);
        }
    })

    const checkFollowing = (user, userProfile) => {
        
        if (user?.user_id != userProfile?._id) {
            if (user.user.following.includes(userProfile._id)) {
                console.log("true")
                return true
            }
        }

        return false
    }


    const AddConversation = () => {
        console.log(user)
        axios.post("http://localhost:7400/api/conversations/", {
            receiverId: userProfile._id,
            senderId: user.user._id,
        }).
            then(res => {
                console.log(res.data)
                console.log("****works");
            }).catch(
                err => {
                    console.log("err")
                })
    }


    const [isFollowing, setIsFollowing] = useState(checkFollowing(user, userProfile));
    console.log(isFollowing)






    useEffect(() => {
        if (user && userProfile) {
            checkFollowing(user, userProfile)
        }
    }, [])

    const handleProfile = () => {
        navigate('/updateProfile');
    }

    const handleFollow = () => {
        console.log(user.user._id)
        const id = user.user._id
        axios.patch(`http://localhost:7400/user/${id}/${userProfile._id}`, { withCredentials: true, })
            .then((response) => {
                console.log(response)
                return response
            })
            .then(({ data }) => {
                setUserProfile({ ...userProfile, following: data })
                console.log("followed")
                setIsFollowing(!isFollowing)
            })
            .catch((err) => { console.log(err) })

    }
    
    return (
        <>
            <NavBar />
            {user && userProfile &&
                <div className="profile">
                    {/* < Leftbar /> */}
                    <div className="profileRight">
                        <div className="profileMainContainer">
                            <div className="profileCover">
                                <img className='profileCoverImg' src={`http://localhost:7400/images/${userProfile.coverPicture}`} alt="" />
                                <img className='profileUserImg' src={`http://localhost:7400/images/${userProfile.profilePicture}`} alt="" />
                            </div>


                            <div className='TotalLikes'>  
                                <h5 > Total Likes:</h5>
                                <img className='TotalLikesSymb' src='/images/TotalLikesSymb.png'  alt="Likes" />
                                <h5>{ userProfile.likes } Likes</h5> 
                            </div>
                            
                            {/* <div className='BadgesContainer' >
                                <p>Badges</p>
                            </div> */}


                            {user.user._id != userProfile._id && 
                                <NavLink to={`/messenger`} state={{ user: user }}>
                                    <Button style={{ backgroundColor: 'purple', translate: '-120%' }} variant="contained" id="UpdateProfile" onClick={AddConversation} > 
                                        {t("Message")} 
                                    </Button>
                                </NavLink>
                            }



                            {user.user._id == userProfile._id &&
                                <Button style={{ backgroundColor: 'purple', translate: '-120%' }} variant="contained" id="UpdateProfile" onClick={handleProfile}>{t("Update Profile")}</Button>
                            }
                            {user.user._id != userProfile._id && <Button style={{ backgroundColor: 'purple' }}
                                variant="contained" color="primary"
                                id="UpdateProfile" onClick={handleFollow}>{isFollowing ? <span style={{ color: 'gray' }}>{t("Following")}</span> : <span>{t("Follow")}</span>}</Button>
                            }
                            {/* {user.user._id!=userProfile._id && <Button 
                                variant="contained" 
                                color="primary" 
                                id="UpdateProfile2" onClick={handleFollow}>Follow</Button>
                                }            */}

                            <div className="profileInfo">
                                <h4 className='profileInfoName'>{userProfile.firstName + " " + userProfile.lastName}</h4>
                                {userProfile.desc && <span className='profileInfoDesc'>{userProfile.desc}</span>}
                            </div>
                        </div>

                        <div className="profilerightBottom">
                            <ProfilePosts userProfile={userProfile} />
                            <Rightbar profile userProfile={userProfile}  user={user}/>
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default Profile;

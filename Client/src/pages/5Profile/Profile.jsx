import React, { useEffect, useState } from 'react'
import "./Profile.css"
import NavBar from '../../Components/NavBar';
// import Leftbar from "./Components/Leftbar/Leftbar";
import ProfilePosts from "./Components/ProfilePosts/ProfilePosts";
import Rightbar from "./Components/rightbar/Rightbar";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert, Box, Button, Card, CardActions, CardContent, Container, Divider, FormControl, FormGroup, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";



function Profile() {
    const location = useLocation()
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState();
    const [isFollowing, setIsFollowing] = useState();
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
        if (user.user_id != userProfile._id) {
            for (let i = 0; i < user.user.following.length; i++) {
                if (user.user.following[i] == userProfile._id) {
                    setIsFollowing(true)
                    console.log("inside checkfollowing")
                }
            }
        }
        setIsFollowing(false)
    }

    useEffect(() => {
        if (user && userProfile) {
            console.log("********* inside usefffect checkfollowing")
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
                        <div className="profilerightTop">
                            <div className="profileCover">
                                <img className='profileCoverImg' src={`http://localhost:7400/images/${userProfile.coverPicture}`} alt="" />
                                <img className='profileUserImg' src={`http://localhost:7400/images/${userProfile.profilePicture}`} alt="" />
                            </div>

                            {user.user._id == userProfile._id &&
                                <Button style={{ backgroundColor: 'purple' }} variant="contained"  id="UpdateProfile" onClick={handleProfile}> Update Profile</Button>
                            }
                            {user.user._id != userProfile._id && <Button style={{ backgroundColor: 'purple' }}
                                variant="contained"
                                color="primary"
                                id="UpdateProfile" onClick={handleFollow}>{isFollowing ? <span style={{ color: 'gray' }}>Following</span> : "Follow"}</Button>
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
                            <Rightbar profile userProfile={userProfile} />
                        </div>
                    </div>
                </div>}
        </>
    )
}
export default Profile;

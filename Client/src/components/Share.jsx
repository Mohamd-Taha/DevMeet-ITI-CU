import React from 'react'
import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions} from "@mui/icons-material"
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Share({user, sendNewPost}) {
const [description, setDescription]=useState()
const makePost = () => {
 axios.post(`http://localhost:7400/posts/`, {userId:user._id, description:description})
        .then((response)=>{return response})
        .then(({data})=>{
               sendNewPost(data)

           
        })
        .catch((err)=>{console.log(err)})
    }
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img className='shareProfileImg' src="assets/persons/1.jpg" alt="" />
            <input placeholder={`What's on your mind ${user.firstName}?`} className='shareInput' onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <hr className='shareHr'/>
        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor='tomato' className='shareIcon'/>
                    <span className='shareOptionText'>Photo or video</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'>Tag</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'>Location</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                    <span className='shareOptionText'>Feelings</span>
                </div>
            </div>
            <button className='shareButton' onClick={makePost}>Share</button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import "./share.css"
import {PermMedia, Label, Room, EmojiEmotions} from "@mui/icons-material"
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
export default function Share({user, sendNewPost}) {
const [description, setDescription]=useState()
const [image, setImage] = useState()
const makePost = () => {
  const formData = new FormData()
  formData.append("userId", user._id)
  formData.append("description", description)
  formData.append("image1", image)
  //console.log(formData)
 axios.post(`http://localhost:7400/posts/`, formData)
        .then((response)=>{
          console.log(response)
          return response
        })
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
                    <input type="file" name="image1" accept="image/png, image/jpeg" onChange={(e)=>{setImage(e.target.files[0])}} />
                    <span className='shareOptionText'>Photo or video</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'>Tag</span>
                </div>
            </div> 
            <Button variant="contained" style={{ backgroundColor: 'purple' }} onClick={makePost} >Share</Button>
        </div>
      </div>
    </div>
  )
}

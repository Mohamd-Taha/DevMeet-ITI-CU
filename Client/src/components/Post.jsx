import React, { useState } from 'react'
import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "./dummyData"
import { BrowserRouter, Route, Routes, Navigate, NavLink } from "react-router-dom";
import axios from 'axios';


export default function Post({ post, userId, sendNewPost}) {
  const date = new Date(post.createdAt)
  const [likes, setLikes] = useState()
  const [] = useState()
  // const [isliked, setIsLiked] = useState(false)
  const likeHandler =()=> {
  axios.patch(`http://localhost:7400/likes/${post._id}`, {userId} )
        .then((response)=>{return response})
        .then(({data})=>{
          let MapObject = new Map(Object.entries(data.likes));
          data.likes=MapObject 
          console.log(data)
          sendNewPost(data)
        })
        .catch((err)=>{console.log(err)})
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
               <NavLink to={{pathname:`/profile/${post.userId}`, state:{userId: post.userId}}}> <img className='postProfileImg'
                //  src={Users.filter((u) => u.id === post.userId)[0].profilePicture} 
                alt="" /></NavLink>
                <span className="postUsername">
                  {post.firstName}
                  </span>
                <span className="postDate">{date.toLocaleString('en-GB', {timeZone:"UTC", day:'numeric', month: 'long', year:'numeric', hourCycle:"h23", hour:"2-digit", minute:"2-digit"})}</span>
            </div>
            <div className="postTopRight">
                {/* <MoreVert /> */}
            </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.description}</span>
          <img className='postImg' src="/assets/newImage.png" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
            <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter"> {post.likes.size}  people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommenttext"> comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}

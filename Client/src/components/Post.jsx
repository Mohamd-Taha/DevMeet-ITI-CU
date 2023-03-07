import React, { useState } from 'react'
import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "./dummyData"
import { BrowserRouter, Route, Routes, Navigate, NavLink } from "react-router-dom";
import axios from 'axios';


export default function Post({ post, userId}) {
  const [likes, setLikes] = useState()
  // const [isliked, setIsLiked] = useState(false)
  const likeHandler =()=> {
  axios.patch(`http://localhost:7400/likes/${post._id}`, {userId} )
        .then((response)=>{return response})
        .then(({data})=>{
          let MapObject = new Map(Object.entries(data.likes));
          data.likes=MapObject 
          //  sendNewPost(data)
        })
        .catch((err)=>{console.log(err)})
  }
  console.log(post.likes.size)
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
                <span className="postDate">{post.createdAt}</span>
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

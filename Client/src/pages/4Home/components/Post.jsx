import React, { useState, useEffect } from 'react'
import "./post.css"
import { MoreVert } from "@mui/icons-material"
import { Users } from "../../../Pages/dummyData"
import { BrowserRouter, Route, Routes, Navigate, NavLink } from "react-router-dom";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 
import Comments from './Comments';
import axios from 'axios';




const Post = ({ post, userId, sendNewPost }) => {


  const date = new Date(post.createdAt)
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState([]);  
  const [comment, setComment] = useState();
  const [image, setImage] = useState();
  const [otherUser, setOtherUser] = useState();
  const [Allcomments, setAllComments] = useState([]);   //for new comment
  const [newComment, setNewComment] = useState();       //for new comment
  const [isVisible, setIsVisible] = useState(false);            // for comments div visibilty
  const ToggleShowComments = () => { setIsVisible(!isVisible); }; // for comments div visibilty 
  // const [isliked, setIsLiked] = useState(false)
  const likeHandler = () => {
    axios.patch(`http://localhost:7400/likes/${post._id}`, { userId }, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        let MapObject = new Map(Object.entries(data.likes));
        data.likes = MapObject
        console.log(data)
        sendNewPost(data)
      })
      .catch((err) => { console.log(err) })
  }
  const commentPost = () => {
    const formData = new FormData()
    formData.append("description", comment)
    formData.append("image1", image)
    formData.append('postId', post._id)
    axios.post(`http://localhost:7400/comments/${userId}`, formData, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        console.log(data)
        console.log(comments)
        setComments([data, ...comments])
        console.log(comments)
      })
      .catch((err) => { console.log(err) })
  }
  const commentGet = () => {
    const postId = post._id
    axios.get(`http://localhost:7400/posts/comments/${postId}`, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        setComments(data)
        console.log(data)
      })
      .catch((err) => { console.log(err) })
  }
//////////////////////////////////////////
const handleAddComment = () => {
  if (newComment) { 
    setAllComments([...comments, newComment]);
    setNewComment('');
  }
}; 
//////////////////////////////////////////
  useEffect(() => {
    const id = userId
    axios.get(`http://localhost:7400/user/${id}`, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        setOtherUser(data)
      })
      .catch((err) => { console.log(err) })
  }, [])
  if (otherUser) {
    return (
      <div className='post'>
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <NavLink to={{ pathname: `/profile`, state: { userId: post.userId } }}> <img className='postProfileImg'
                src={`http://localhost:7400/images/${post.userPicturePath}`}
                alt="" /></NavLink>
              <span className="postUsername">
                {post.firstName}
              </span>
              <span className="postDate">{date.toLocaleString('en-GB', { timeZone: "UTC", day: 'numeric', month: 'long', year: 'numeric', hourCycle: "h23", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="postTopRight">
              {/* <MoreVert /> */}
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.description}</span>
            {post.picturePath && <img className='postImg' src={`http://localhost:7400/images/${post.picturePath}`} alt="" />}
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img className='likeIcon' src="/assets/like.png" onClick={likeHandler} alt="" />
              <img className='likeIcon' src="/assets/heart.png" onClick={likeHandler} alt="" />
              <span className="postLikeCounter"> {post.likes.size}  Likes </span>
            </div>
            <div className="postBottomRight">
              <IconButton color="primary"  component="label" onClick={ToggleShowComments} > 
                  {isVisible ? <VisibilityIcon htmlColor='#5890FF'/>  : <VisibilityOffIcon htmlColor='gray'/> }
              </IconButton> 
              <span className="postCommenttext" onClick={commentGet}> X Comments</span>
            </div>
          </div>
          
          <div className='commentsDiv'>
            <TextField hiddenLabel placeholder="Write your comment..."  size="small" style={{ width: '93%' }}  onChange={(e) => setNewComment(e.target.value)} /*onChange={(e) => { setComment(e.target.value) }}*/ />
            <IconButton color="primary"  component="label"  onClick={handleAddComment}>
              <InsertCommentIcon htmlColor='purple'/> <input hidden type="button" value="submit" onClick={commentPost} />
            </IconButton>
          </div> 

          <Divider variant="inset" component="li" style={{listStyle:'none'}}/>
          <div className='comments'> 
            {isVisible &&  <Comments message={newComment} /> } 
          </div>  
        </div>
      </div>
    );
  }
}
export default Post;  
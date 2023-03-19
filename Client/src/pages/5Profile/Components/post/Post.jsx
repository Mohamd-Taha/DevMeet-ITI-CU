// import {Users} from "../../../dummyData";


import React, { useState, useEffect } from 'react'
import "./post.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter, Route, Routes, Navigate, NavLink } from "react-router-dom";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ProfileComments from './ProfileComments';
import { format } from "timeago.js"
import axios from 'axios';
import { fontWeight } from '@mui/system';
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useTranslation } from 'react-i18next'






const Post = ({post, userId, sendNewPost, refreshPosts }) => {

  let { user } = useAuthContext()
  user = user.user
  Object.freeze(user)
  const date = new Date(post.createdAt)
  const [likes, setLikes] = useState();
  const [error, setError] = useState();
  const [commentCount, setCommentCount] = useState(post.comments.length)
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();
  const [image, setImage] = useState();
  const [otherUser, setOtherUser] = useState();
  const [Allcomments, setAllComments] = useState([]);   //for new comment
  const [newComment, setNewComment] = useState();       //for new comment
  const [isVisible, setIsVisible] = useState(false);            // for comments div visibilty
  const ToggleShowComments = () => { setIsVisible(!isVisible); }; // for comments div visibilty 
  const [isLiked, setIsLiked] = useState(post.likes.get(userId));    // for like animation    
  let [t,i18n]= useTranslation();




  // const [isliked, setIsLiked] = useState(false)
  const likeHandler = async () => {
    await axios.patch(`http://localhost:7400/likes/${post._id}`, { userId }, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        console.log(data)
        let MapObject = new Map(Object.entries(data.likes));
        data.likes = MapObject
        console.log(data)
        sendNewPost(data)
        setIsLiked(!isLiked)
      })
      .catch((err) => { console.log(err) })
  }
  const commentPost = () => {
    setError(null)
    if (comment) {
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
      setCommentCount(commentCount + 1)
      document.getElementById('commentInput').value = "";
      setComment('');
    }
    else {
      setError("*")
    }
  }
  const updateCount = ()=>{
    setCommentCount(commentCount-1)
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

  const DeleteMyPost = () => {
    const id = post._id
    axios.delete(`http://localhost:7400/posts/${id}`, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        console.log(data)
        refreshPosts()
      })
      .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    const id = post.userId
    axios.get(`http://localhost:7400/user/${id}`, { withCredentials: true })
      .then((response) => { return response })
      .then(({ data }) => {
        setOtherUser(data)
      })
      .catch((err) => { console.log(err) })
    commentGet()
  }, [])
  if (otherUser) {
    return (  
      <div className='post'>
        <div className="postWrapper">
          <div className="postTop">
            
            <div className="postTopLeft">
              <NavLink to={`/profile`} state={{ user: otherUser }}> 
                <img className='postProfileImg'  src={`http://localhost:7400/images/${post.userPicturePath}`} alt="" />
              </NavLink>

              <span className="postUsername"> {post.firstName+" "+post.lastName} </span>
              
              {(format(post.createdAt)>"3 days ago") ?
                <span className="postDate">{" ("+date.toLocaleString('en-GB', {  day: 'numeric', month: 'long'  })+") "}</span> 
                :
                <span className="postDate">{format(post.createdAt)+" "}</span>
              }
              {/* <span className="postDate">{date.toLocaleString('en-GB', { timeZone: "UTC", day: 'numeric', month: 'long', year: 'numeric', hourCycle: "h23", hour: "2-digit", minute: "2-digit" })}</span> */}
            </div>

            <div className="postTopRight">  
              {
                !post.tags[0] ? 
                <span className="TagsCorner" style={{color:'gray'}}>{t("Not Taged")} </span> :  
                <span className="TagsCorner"> {"#"+post.tags.join(", #")}</span>
              } 

              {
                (post.userId==user._id) && 
                  <IconButton color="primary" component="label" onClick={DeleteMyPost} >
                    <DeleteIcon htmlColor='#F25268' />   
                  </IconButton> 
              }
            </div>

          </div>
          <div className="postCenter">
            <span className="postText">{post.description}</span>
            {post.picturePath && <img className='postImg' src={`http://localhost:7400/images/${post.picturePath}`} alt="" />}
          </div>
          <div className="postBottom">
            <div className="postBottomLeft"  onClick={likeHandler} > 
              {isLiked ? <FavoriteIcon htmlColor='#f25268' style={{marginRight:'5px'}} /> : <FavoriteBorderIcon htmlColor='red' style={{marginRight:'5px'}} />}
              <span className="postLikeCounter" style={{ fontWeight: 'bold' }} > {post.likes.size}{t("Likes")} </span>
            </div>
            <div className="postBottomRight">
              <IconButton color="primary" component="label" onClick={ToggleShowComments} >
                {isVisible ? <VisibilityIcon htmlColor='#5890FF' /> : <VisibilityOffIcon htmlColor='gray' />}
                <span className="postCommenttext ms-2 " style={{ fontWeight: 'bold' , color:'black' }} onClick={commentGet}> {commentCount} {t("Comments")}</span>
              </IconButton>
            </div>
          </div>

          <div className='commentsDiv'>
            {error && <div style={{ color: 'red', fontWeight: 'bolder' }}> {error}</div>}
            <TextField id="commentInput" required placeholder={t("Write your comment...")} size="small" style={{ width: '93%' }} onChange={(e) => { setComment(e.target.value) }} />
            <IconButton component="label" >
              <InsertCommentIcon htmlColor='purple' /> <input hidden type="button" value="submit" onClick={commentPost} />
            </IconButton>
          </div>

          <Divider variant="inset" component="li" style={{ listStyle: 'none' }} />
          <div className='comments'>
            {isVisible && comments?.map((c) => <ProfileComments key={c._id} message={c.description} firstName={c.firstName} lastName={c.lastName} userPicturePath={c.userPicturePath} sendComments={commentGet} id={c._id} userId={c.userId} sendCount={updateCount} />)}
          </div>
        </div>
      </div>
      /*    {currentPosts?.map((p) => (
          <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} />
        ))} */
    );
  }
}
export default Post;  
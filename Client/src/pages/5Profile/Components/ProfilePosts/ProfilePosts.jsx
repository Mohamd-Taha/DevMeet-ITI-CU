import React, { useEffect, useState } from 'react'
import "./ProfilePosts.css"
import ProfileShare from '../ProfileShare/ProfileShare'
import Post from '../post/Post'
import axios from 'axios';
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useTranslation } from 'react-i18next'

const Feed = ({userProfile}) => {
let [t,i18n]= useTranslation();
const [profilePosts, setProfilePosts]=useState()
let { user } = useAuthContext();
user = user.user
Object.freeze(user)
console.log(profilePosts)

const getMyPosts = () => {
  axios.get(`http://localhost:7400/profile/posts/${userProfile._id}`)
    .then((response) => { return response })
    .then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        let MapObject = new Map(Object.entries(data[i].likes));
        data[i].likes = MapObject
      }
      setProfilePosts(data)
    })
    .catch((err) => { console.log(err) })
}

const DeletePost=()=>{
  console.log("inside home delete post")
  getMyPosts()
    }

const getLikedPost = (post) => {
  const index = profilePosts.findIndex((el) => el._id === post._id);
  const updatedPost = {...post, likes: post.likes};
  setProfilePosts([ 
...profilePosts.slice(0, index),
updatedPost,
...profilePosts.slice(index + 1)
]);
}
const getSharePost = (post) => {


  let reci=user.followers.map(e=>{
    return {id:e, isRead:'false' }
  })

  let msg = {
    id: user._id,
    text: "Added New Post",
    content: post.description,
    // recipients:user.followers,
    recipients:reci,
    url: `/post/${post._id}`
  }
  console.log(user.followers)

  axios.post('http://localhost:7400/notification', {...msg })
    .then((res) => { console.log("notify added succefully") })




  /***
   * handle logic of notifications
  var folllowerofpost=user.followers;

  
  /***

[
{ objectid:"efhshnh545h454h4" ,isRead:'false'},
{ objectid:"efhshnh545h454h4" ,isRead:'false'},
{ objectid:"efhshnh545h454h4" ,isRead:'false'}
]

//handle notification read
var readed =(notifyid)=>{
notificationmodel.find(notifyid).recipients[0].isRead ='true'
}

let msg={
    id:user._id,
    text:"Added New Post",
    content:post.description,
    recipients:reci,
    //url: `/post/${res.data.newPost._id}`,
  }
*/



  // axios.post('/notification',{msg});



  let MapObject = new Map(Object.entries(post.likes));
  post.likes = MapObject
  setProfilePosts([post, ...profilePosts])
  //  for (let i = 0; i < post.length; i++) {
  //         let MapObject = new Map(Object.entries(post[i].likes));
  //         post[i].likes = MapObject
  // }
}

useEffect(()=>{
  getMyPosts()
  },[userProfile])
  

  






  return (
    <div className='feed'>
      <div className="feedWrapper">
        {  userProfile._id==user._id  && <ProfileShare user={user} sendNewPost={getSharePost} personalCheck='true' />}
        {profilePosts?.map((p) => (
          <Post key={p.id} post={p} userId={user._id} sendNewPost={getLikedPost} refreshPosts={DeletePost} />
        ))}

        { profilePosts && profilePosts.length==0 && // if the user has no posts to view in profile
          <div className='noUserPostsyet'>  
            <p>This User has no posts Yet</p>
          </div>
        }


      </div>
    </div>
  )
}

export default Feed;
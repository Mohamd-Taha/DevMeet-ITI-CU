import React from 'react'
import { useEffect, useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";
import Post from './components/Post'
import { Posts } from '../dummyData'
import './Home.css'
import Sidebar from './components/Sidebar';
import axios from 'axios';
import Share from './components/Share'
import NavBar from '../../Components/NavBar';
import Footer from "../../Components/Footer";

const Homecomponent = () => {

  let { user } = useAuthContext()
  user = user.user
  const [currentPosts, setCurrentPosts] = useState()
  const [flag, setFlag] = useState(false)
  Object.freeze(user)
  const getNewPosts = () => {
    axios.get(`http://localhost:7400/posts/${user._id}`)
      .then((response) => { return response })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let MapObject = new Map(Object.entries(data[i].likes));
          data[i].likes = MapObject
        }
        setCurrentPosts(data)
        console.log(data)

      })
      .catch((err) => { console.log(err) })
  }
  const getTrendingPosts = () => {
    axios.get(`http://localhost:7400/posts/trending/${user._id}`)
      .then((response) => { return response })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let MapObject = new Map(Object.entries(data[i].likes));
          data[i].likes = MapObject
        }
        setCurrentPosts(data)
      })
      .catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getNewPosts()
  }, [])
  const getSharePost = (post) => {
    let MapObject = new Map(Object.entries(post.likes));
         post.likes = MapObject
     setCurrentPosts([post, ...currentPosts])
  //  for (let i = 0; i < post.length; i++) {
  //         let MapObject = new Map(Object.entries(post[i].likes));
  //         post[i].likes = MapObject
        // }
   
  }
  const getLikedPost = (post) => {
    setCurrentPosts(currentPosts.map(el => (el._id === post._id ? el.likes = post.likes : el)))
    console.log("enteredsharepost")
  }
  return (
    <div className='parentHomeDiv'>
      <NavBar />
      <div className='filterDiv'>
        <btn className="tagbuttons" style={{ "borderRight": "0.5px solid rgb(174, 174, 175)" }} onClick={getNewPosts}>New</btn>
        <btn className="tagbuttons" onClick={getTrendingPosts}>Trending</btn>
      </div>
      <div className='leftHomeDiv'>
        <Sidebar getTagPosts={getSharePost}></Sidebar>
      </div>
      <div className='shareDiv'>
        <Share user={user} sendNewPost={getSharePost} ></Share>
      </div>
      <div className='PostsDiv'>
        {currentPosts?.map((p) => (
          <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} />
        ))}
      </div>
      <div className='TopRightDiv'>
        <div>Meeting Times</div>
      </div>
      <div className='BottomRightDiv'>
        <div>Communities</div>
      </div>
      {/* <Footer /> */}
    </div>

  )
}


export default Homecomponent
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
import HomeCommunities from './components/homeCommunities';
import Search from '../11Search/Search';

const Homecomponent = () => {

  let { user } = useAuthContext()
  user = user.user
  const [currentPosts, setCurrentPosts] = useState()
  const [flag, setFlag] = useState(true)
  const [communities, setCommunities] = useState()
  const [search, setSearch] = useState()
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
   const getSharePost = (post) => {
    let MapObject = new Map(Object.entries(post.likes));
         post.likes = MapObject
     setCurrentPosts([post, ...currentPosts])
  //  for (let i = 0; i < post.length; i++) {
  //         let MapObject = new Map(Object.entries(post[i].likes));
  //         post[i].likes = MapObject
        // }
   
  }

  const getSearch=(data)=>{
    setSearch(data);
    setFlag(false);
    console.log("************");
    console.log(search);
    try{
    const searchQuery= search.split(" ")
    axios.post(`http://localhost:7400/search`,{firstName:searchQuery[0], lastName:searchQuery[1] }, {withCredentials: true} )
        .then((response)=>{return response})
        .then(({data})=>{
        console.log(data)
        })
        .catch((err)=>{console.log(err)})
      }
      catch{}

  }
 
  useEffect(() => {
    getNewPosts()
  }, [])

 useEffect(()=>{
      axios.get(`http://localhost:7400/communities/get`)
      .then((response) => { return response })
      .then(({ data }) => {
      console.log(data)
      setCommunities(data)
      })
      .catch((err) => { console.log(err) })
 }, [])
   const getTagPosts = (post) => {
   for (let i = 0; i < post.length; i++) {
          let MapObject = new Map(Object.entries(post[i].likes));
          post[i].likes = MapObject
        }
        setCurrentPosts(post)
   
  }
  const getLikedPost = (post) => {
    const index = currentPosts.findIndex((el) => el._id === post._id);
    const updatedPost = {...post, likes: post.likes};
    setCurrentPosts([ 
  ...currentPosts.slice(0, index),
  updatedPost,
  ...currentPosts.slice(index + 1)
]);
     console.log("enteredsharepost")
  //  await setCurrentPosts(currentPosts.map(el => (el._id === post._id ? el.likes = post.likes : el)))
   
  }
  return (  
    <div className='parentHomeDiv'>
      <NavBar sendSearch={getSearch}/>
      <div className='leftHomeDiv'>
        <Sidebar getTagPosts={getTagPosts}></Sidebar>
      </div>
     { flag ?< div className='filterDiv'>
        <btn className="tagbuttons" style={{ "borderRight": "0.5px solid rgb(174, 174, 175)" }} onClick={getNewPosts}>New</btn>
        <btn className="tagbuttons" onClick={getTrendingPosts}>Trending</btn>
      </div> : <div className='searchDiv'><Search/></div>}
       { flag && <div className='shareDiv'>
        <Share user={user} sendNewPost={getSharePost} ></Share>
      </div>}
      {flag &&  <div className='PostsDiv'>
        {currentPosts?.map((p) => (
          <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} />
        ))}
      </div>}
      <div className='TopRightDiv'>
        <div>Meeting Times</div>
      </div>
      <div className='BottomRightDiv'>
        <div>Communities</div>
       {communities?.map((c)=>(
       <HomeCommunities key={c._id} community={c}></HomeCommunities>
       ))}
      </div>
      {/* <Footer /> */}
    </div>

  )
}


export default Homecomponent
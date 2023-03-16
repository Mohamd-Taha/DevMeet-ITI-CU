import React from 'react'
import { useEffect, useState } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext";
import Post from './components/Post'
import './Home.css'
import Sidebar from './components/Sidebar';
import axios from 'axios';
import Share from './components/Share'
import NavBar from '../../Components/NavBar';
import Footer from "../../Components/Footer";
import HomeCommunities from './components/homeCommunities';
import Search from '../11Search/Search';

const Homecomponent = () => {

  let { user } = useAuthContext();
  user = user.user
  const [currentPosts, setCurrentPosts] = useState()
  const [flag, setFlag] = useState(true)
  const [communities, setCommunities] = useState()
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState()
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
        setSearchResults(data)
        })
        .catch((err)=>{console.log(err)})
      }
      catch{}

  }
 
  useEffect(() => {
    getNewPosts()
  }, [])

  //get all communities from this user
  useEffect(() => {
    axios.post(`http://localhost:7400/communities/getAcomm`,
      {
        userId: user._id
      })
      .then((response) => { return response })
      .then(({ data }) => {
        console.log("from inside the home get comm")
        console.log(data)
        console.log("after display data recieeved from the server")
        setCommunities(data.communities)
      })
      .catch((err) => { console.log(err) })
 }, [])
  const DeletePost=()=>{
console.log("inside home delete post")
getNewPosts()
  }

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
      </div> : <>
      <div className='searchDiv'>
        <div className='SearchNav'>
          <input className='buttonSearch' type="button" value="Users" />
          <input className='buttonSearch' type="button" value="Posts" />
          <input  className='buttonSearch'type="button" value="Communities" />
        </div>
        {searchResults?.map((c)=>(
        <Search key={c._id} user={c} firstName={c.firstName} lastName={c.lastName} userPicturePath={c.profilePicture}/>
        ))}
        
        </div>
        
        </>
        }
       { flag && <div className='shareDiv'>
       <Share user={user} sendNewPost={getSharePost} personalCheck='true'  ></Share>
      </div>}
      {flag &&  <div className='PostsDiv'>
        {currentPosts?.map((p) => (
          <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} refreshPosts={DeletePost} />
        ))}
      </div>}
      <div className='TopRightDiv'>
        <div>Meeting Times</div>
      </div>
      <div className='BottomRightDiv'>
        <div>Communities</div>
        {communities?.map((c) => (
          <HomeCommunities key={c._id} community={c}></HomeCommunities>
        ))}
      </div>
      {/* <Footer /> */}
    </div>

  )
}


export default Homecomponent
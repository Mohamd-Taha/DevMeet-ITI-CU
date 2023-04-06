import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Post from "./components/Post";
import "./Home.css";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import Share from "./components/Share";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import HomeCommunities from "./components/homeCommunities";
import Search from "../11Search/Search";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import CommunitySearch from "../10Community/components/communitySearch";
import CreateCommunity from "../10Community/createCommunity/createCommunity";
import { faL } from "@fortawesome/free-solid-svg-icons";


const Homecomponent = ({ socket }) => {
  let { user } = useAuthContext();
  user = user.user
  const [currentPosts, setCurrentPosts] = useState()
  const [flag, setFlag] = useState(true);

  const [communities, setCommunities] = useState()
  const [search, setSearch] = useState()
  const [searchResults, setSearchResults] = useState()
  const [communitySearchResult, setCommunitySearchResult] = useState([])
  const [searchFlag, setSearchFlag] = useState()
  const [crtCmtyFlag, setCrtCmtyFlag] = useState(false)
  // const [isDiv1Visible, setIsDiv1Visible] = useState(true);   // for notloaded posts divs

  const [activeButton, setActiveButton] = useState(null);  //for New / Trending
  const handleButtonClick = (buttonIndex) => { //for New / Trending
    setActiveButton(buttonIndex);
  };

  Object.freeze(user);
  const getNewPosts = () => {
    axios
      .get(`http://localhost:7400/posts/${user._id}`)
      .then((response) => {
        return response;
      })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let MapObject = new Map(Object.entries(data[i].likes));
          data[i].likes = MapObject;
        }
        setCurrentPosts(data);
        console.log(data);
        handleButtonClick(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTrendingPosts = () => {
    axios
      .get(`http://localhost:7400/posts/trending/${user._id}`)
      .then((response) => {
        return response;
      })
      .then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          let MapObject = new Map(Object.entries(data[i].likes));
          data[i].likes = MapObject;
        }
        setCurrentPosts(data);
        handleButtonClick(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // useEffect(() => {   //nopostsdiv
  //   const div2 = document.getElementById("div2");
  //   if (isDiv1Visible)   div2.style.display = "none";
  //   else  div2.style.display = "block"; 
  // }, [isDiv1Visible]);


  const getSharePost = (post) => {

    let reci = user.followers.map((e) => {
      return { id: e, isRead: "false" };
    });

    let msg = {
      id: user._id,
      text: "Added New Post",
      content: post.description,
      // recipients:user.followers,
      recipients: reci,
      url: `/post/${post._id}`,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
      },
    };
    console.log("notification add post send from client Home.jsx line- 87");
    console.log(msg);
    socket.emit("notify", msg);

    axios.post("http://localhost:7400/notification", { ...msg })
      .then((res) => { console.log("notify added succefully"); });

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
    post.likes = MapObject;
    setCurrentPosts([post, ...currentPosts]);
    //  for (let i = 0; i < post.length; i++) {
    //         let MapObject = new Map(Object.entries(post[i].likes));
    //         post[i].likes = MapObject
    // }
  };

  const getSearch = (data) => {
    if (!data) return;
    setSearch(data);
    setFlag(false);
    setSearchFlag(false)
    console.log("************");
    console.log(search);
    try {
      const searchQuery = search.split(" ");
      axios.post(`http://localhost:7400/search`, { firstName: searchQuery[0], lastName: searchQuery[1] },
        { withCredentials: true }
      )
        .then((response) => {
          return response;
        })
        .then(({ data }) => {
          console.log(data);
          setSearchResults(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch { }
  };
  const searchCommunity = () => {
    let searchWord = search;
    axios.get('http://localhost:7400/communities/searchbyname',
      { params: { communityName: searchWord } }
    ).then((res) => {
      console.log(res.data)
      setCommunitySearchResult(res.data);
    }
    ).catch((err) => {
      console.log(err)
    })
    setSearchFlag(true)

  }
  useEffect(() => {
    socket.emit("joinUser", user);
  })
  useEffect(() => {
    getNewPosts();
  }, []);

  const setcommunityFlag = () => {
    setCrtCmtyFlag(true)
    setFlag(false)

  }

  //get all communities from this user
  useEffect(() => {
    axios.post(`http://localhost:7400/communities/getAcomm`,
      {
        userId: user._id,
      })
      .then((response) => {
        return response;
      })
      .then(({ data }) => {
        console.log("from inside the home get comm");
        console.log(data);
        console.log("after display data recieeved from the server");
        setCommunities(data.communities);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const DeletePost = () => {
    console.log("inside home delete post");
    getNewPosts();
  };

  const getTagPosts = (post) => {
    for (let i = 0; i < post.length; i++) {
      let MapObject = new Map(Object.entries(post[i].likes));
      post[i].likes = MapObject;
    }
    setCurrentPosts(post);
  };
  const getLikedPost = (post) => {
    const index = currentPosts.findIndex((el) => el._id === post._id);
    const updatedPost = { ...post, likes: post.likes };
    setCurrentPosts([
      ...currentPosts.slice(0, index),
      updatedPost,
      ...currentPosts.slice(index + 1),
    ]);
    console.log("enteredsharepost");
    //  await setCurrentPosts(currentPosts.map(el => (el._id === post._id ? el.likes = post.likes : el)))
  };
  return (
    <div className="parentHomeDiv">
      <NavBar sendSearch={getSearch} />
      <div className="leftHomeDiv">
        <Sidebar getTagPosts={getTagPosts}></Sidebar>
      </div>
      {/* 1st option */}
      {flag ?
        <div className="filterDiv">
          <lable className={activeButton === 0 ? "tagbuttons " : "activetagbuttons"} style={{ borderRight: "0.5px solid rgb(174, 174, 175)" }} onClick={getNewPosts}>Recent Posts</lable>
          <span>&nbsp;&nbsp;</span>
          <lable className={activeButton === 1 ? "tagbuttons " : "activetagbuttons"} onClick={getTrendingPosts} >Trending Posts</lable>
        </div> :
        <>
          <div className="searchDiv">
            <div className="SearchNav">
              <input className="buttonSearch" type="button" value="Found Users" onClick={() => { setSearchFlag(false) }} />
              {/* /* <input className="buttonSearch" type="button" value="Posts" /> */}
              <input className="buttonSearch" type="button" value="Communities" onClick={searchCommunity} /> */
            </div>
            {searchResults && !searchFlag && <>
              {searchResults?.map((c) => (
                <Search key={c._id} user={c} firstName={c.firstName} lastName={c.lastName} userPicturePath={c.profilePicture} />
              ))} </>}
            {!searchResults && !searchFlag &&
              <div className="noHomePostsyet">
                <p>No Matches Found</p>
              </div>
            }
            {communitySearchResult && searchFlag && <>
              {communitySearchResult?.map((c) => (
                <CommunitySearch comm={c} />
              ))} </>
            }
          </div>


        </>
      }
      {/* {crtCmtyFlag ?
        <CreateCommunity />
        : <></>
      } */}
      {/* end of 1st option */}

      {/* start of 2st option */}
      {flag && <div className="shareDiv">
        <Share user={user} sendNewPost={getSharePost} personalCheck="true"></Share>
      </div>}
      {/* end of 2nd option */}

      {/* start of 3rd option */}
      {flag && <div className="PostsDiv">
        {currentPosts?.map((p) => (
          <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} refreshPosts={DeletePost} socket={socket} />
        ))}

        {currentPosts && currentPosts.length == 0 &&
          // if there is no posts in home page
          <div /*style={{ display: isDiv1Visible ? "block" : "none" }} */ className='noHomePostsyet'>
            <p>You have No posts to view</p>
            <p>No One Posted for this Tag till now</p>
          </div>
        }
        {currentPosts && currentPosts.length == 0 && user.following.length == 0 && // if there is no posts in home page 
          <div id="div2"/* style={{ display: !isDiv1Visible ? "block" : "none" }} */ className="noHomePostsyet">
            <p>You have No posts to view</p>
            <p>Follow other users to show thier posts, also you can share your own posts</p>
          </div>
        }
      </div>
      }
      {/* end of 2st option */}


      <div className="TopRightDiv">
        <p>Meeting Times</p>
      </div>
      <div className="BottomRightDiv">
        <p><strong>Communities</strong></p>
        {communities?.map((c) => (
          <div key={c._id} className="border border-warning mx-2 mb-2 rounded">
            <HomeCommunities community={c}></HomeCommunities>
          </div>
        ))}
        <div>
          <img style={{ width: "38px", height: "auto" }} src={`http://localhost:7400/images/addcommunity.png`}></img>
          <Link to="/addnewcommunity">
            <Button style={{ backgroundColor: "#68377f", }}  >

              Create New Community
            </Button>
          </Link>

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Homecomponent;
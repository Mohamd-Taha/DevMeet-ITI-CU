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
import { Link, Outlet } from "react-router-dom";
import CommunitySearch from "../10Community/components/communitySearch";
import CreateCommunity from "../10Community/createCommunity/createCommunity";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';


const Homecomponent = ({ socket }) => {
  let [t, i18n] = useTranslation();
  let { user } = useAuthContext();
  user = user.user
  const [currentPosts, setCurrentPosts] = useState()

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



  const [searchText, setSearchText] = useState();;
  const getSearchWord = (data) => {
    setSearchText(data);
  }

  //this method will go to a new component for search and will display it when click on search 
  //and will replace this method with another one to move the searchText to the parent component
  const getSearch = (data) => {
    if (!data) return;
    setSearch(data);
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


  const getTagPosts = (post) => {
    for (let i = 0; i < post.length; i++) {
      let MapObject = new Map(Object.entries(post[i].likes));
      post[i].likes = MapObject;
    }
    setCurrentPosts(post);
  };

  return (
    <div className="parentHomeDiv">
      {/* <NavBar sendSearch={getSearch} /> */}
      <NavBar sendSearch={getSearchWord} />
      <div className="leftHomeDiv">
        <Sidebar getTagPosts={getTagPosts}></Sidebar>
      </div>

      <div className="center">
        <Outlet context={searchText}></Outlet>
      </div>


      <div className="TopRightDiv">
        <p>{t("Meeting Times")}</p>
      </div>

      <div className="BottomRightDiv">
        <p><strong>{t("Communities")}</strong></p>
        {
          communities?.map((c) => (
            <div key={c._id} className="border border-warning mx-2 mb-2 rounded">
              <HomeCommunities community={c}></HomeCommunities>
            </div>
          ))
        }
        <div>
          <img style={{ width: "38px", height: "auto" }} src={`http://localhost:7400/images/addcommunity.png`}></img>
          <Link to="/addnewcommunity">
            <Button style={{ backgroundColor: "#68377f", }}  >

              Create New Community
            </Button>
          </Link>

        </div>
      </div >

    </div >
  );
};

export default Homecomponent;
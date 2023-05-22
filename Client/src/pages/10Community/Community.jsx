import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import axios, { isCancel, AxiosError } from "axios";
import { width } from "@mui/system";
import Post from "../4Home/components/Post";
import Share from "../4Home/components/Share";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col } from "reactstrap";
import { Height } from "@mui/icons-material";
import "./Community.css"
import NavBar from "../../Components/NavBar";
const Community = () => {
    let { user } = useAuthContext();

    user = user.user;
    const { id } = useParams();
    const [imageSrc, serImageSrc] = useState("communityCover");
    const [community, setCommunity] = useState({});
    const [currentPosts, setCurrentPosts] = useState([]);

    const styleImg = "width='100px' height='50px' ";
    // let communistyiD = '6404a978ea4b09ad95f03e70';

    const getSharePost = (post) => {
        let MapObject = new Map(Object.entries(post.likes));
        post.likes = MapObject;
        setCurrentPosts([post, ...currentPosts]);
        //  for (let i = 0; i < post.length; i++) {
        //         let MapObject = new Map(Object.entries(post[i].likes));
        //         post[i].likes = MapObject
    };

    // const postJSX = postList.map((elem) => {
    //     <div>
    //         <Post key={elem.text} data={elem}></Post>
    //     </div>

    // })

    //get all details of this community including full info and it's posts
    useEffect(() => {
        console.log("Community Componen mounting");
        axios
            .get(`${process.env.REACT_APP_API_URL}/communities/getCommunityByid`, {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                console.log(res.data)
                setCommunity(res.data);
                for (let i = 0; i < res.data.posts.length; i++) {
                    let MapObject = new Map(Object.entries(res.data.posts[i].likes));
                    res.data.posts[i].likes = MapObject;
                }
                setCurrentPosts(res.data.posts);

                console.log(community);
            })
            .catch((err) => console.log(err));

        //get all posts
    }, []);

    /**
          //mounting function
          useEffect(() => {
                  xios.post(`${process.env.REACT_APP_API_URL}/communities/getAcomm`, {
                  userId: "6404a978ea4b09ad95f03e70"
              }).then(res => console.log(res))
          }, [])
       */
    // useEffect(() => {
    //     console.log("mounting component")

    // }, [imageSrc])
    const getLikedPost = () => {

    }

    const DeletePost = () => {

    }

    return (
        //first outline dev
        <>
            <NavBar />
            <div className="CommunityContainer">
                <div className="Community">
                    <div className="CommunityRight">
                        <div className="CommunityrightTop">
                            <div className="CommunityCover">
                                <img className='CommunityCoverImg' src="/images/facebookimg.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 border border-danger">
                        <h1>ADV AREA 1</h1>
                    </div>
                    <div className="col-8 cneter=block  ">
                        <div className="row" id="topicdesign">
                            <div className="d-flex justify-content-sm-between">
                                <h2>NODEJS EGYPT</h2>
                                <button className="joinbutton">join request</button>
                            </div>
                            <h4>1.7k members</h4>
                        </div>
                        <div>
                            <h4>Description</h4>
                            {/* <form> */}
                            <textarea id="textarea" placeholder="write text..."></textarea>
                            {/* </form> */}
                        </div>
                    </div>
                    <div className="col-2 border border-danger">
                        {" "}
                        <h1>ADV AREA 2</h1>
                    </div>
                </div>

                <div className="row ">
                    <div className="col-2 border border-info">TOP Users</div>
                    {/* main element /posts */}
                    <div className="col-8 border border-info">
                        <div className="d-flex flex-column">
                            <div>
                                <Share
                                    user={user}
                                    sendNewPost={getSharePost}
                                    personalCheck="false"
                                ></Share>
                            </div>
                            <div>
                                {currentPosts?.map((p) => (
                                    <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} refreshPosts={DeletePost} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-2 border border-info">upcoming meetups</div>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
        </>

    );
};

export default Community;

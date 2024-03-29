import React from 'react';
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Post from "../components/Post";
import Share from "../components/Share";
import axios from "axios";
import { useTranslation } from 'react-i18next';

const Posts = (socket) => {
    let { user } = useAuthContext();
    user = user.user
    const [currentPosts, setCurrentPosts] = useState()
    const [activeButton, setActiveButton] = useState(null);  //for New / Trending
    const handleButtonClick = (buttonIndex) => { //for New / Trending
        setActiveButton(buttonIndex);
    };
    let [t, i18n] = useTranslation();




    //methods

    //method related to get many posts
    const getNewPosts = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts/${user._id}`)
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
            .get(`${process.env.REACT_APP_API_URL}/posts/trending/${user._id}`)
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

    //methods related to the post component itself

    const getSharePost = (post) => {
        console.log("from getSharePost")

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
        // socket.emit("notify", msg);

        axios.post(`${process.env.REACT_APP_API_URL}/notification`, { ...msg })
            .then((res) => { console.log("notify added succefully"); });



        let MapObject = new Map(Object.entries(post.likes));
        post.likes = MapObject;
        setCurrentPosts([post, ...currentPosts]);
        //  for (let i = 0; i < post.length; i++) {
        //         let MapObject = new Map(Object.entries(post[i].likes));
        //         post[i].likes = MapObject
        // }
    };

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


    //Mounting
    useEffect(() => {
        getNewPosts();
    }, []);

    return (
        <>
            <div className="filterDiv">
                <lable className={activeButton === 0 ? "tagbuttons " : "activetagbuttons"} style={{ borderRight: "0.5px solid rgb(174, 174, 175)" }} onClick={getNewPosts}>{t("Recent Posts")}</lable>
                <span>&nbsp;&nbsp;</span>
                <lable className={activeButton === 1 ? "tagbuttons " : "activetagbuttons"} onClick={getTrendingPosts} >{t("Trending Posts")}</lable>
            </div>


            <div className="shareDiv">
                <Share user={user} sendNewPost={getSharePost} personalCheck="true"></Share>
            </div>

            <div className="PostsDiv">
                {currentPosts?.map((p) => (
                    <Post key={p._id} post={p} userId={user._id} sendNewPost={getLikedPost} refreshPosts={DeletePost} socket={socket} />
                ))}
            </div>


        </>
    );
};

export default Posts;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";

import axios, { isCancel, AxiosError } from 'axios';
import { width } from '@mui/system';
import Post from '../4Home/Components/Post';
import Share from '../4Home/Components/Share';





const Community = () => {

    let { user } = useAuthContext()
    user = user.user

    const { idParam } = useParams();
    // const idParam = '640cfa5e56cb738eda3b521c'

    const [imageSrc, serImageSrc] = useState("communityCover");
    const [community, setCommunity] = useState({});
    const [currentPosts, setCurrentPosts] = useState([])

    const styleImg = "width='100px' height='50px' "
    // let communistyiD = '6404a978ea4b09ad95f03e70';



    const getSharePost = (post) => {
        let MapObject = new Map(Object.entries(post.likes));
        post.likes = MapObject
        setCurrentPosts([post, ...currentPosts])
        //  for (let i = 0; i < post.length; i++) {
        //         let MapObject = new Map(Object.entries(post[i].likes));
        //         post[i].likes = MapObject
    }


    // const postJSX = postList.map((elem) => {
    //     <div>
    //         <Post key={elem.text} data={elem}></Post>
    //     </div>

    // })

    //get all details of this community including full info and it's posts
    useEffect(() => {

        console.log("Community Componen mounting")
        axios.get('http://localhost:7400/communities/getCommunityByid', {

            params:{
                id: idParam
            }
        }
        ).then(res => {
            setCommunity(res.data);
            setCurrentPosts(res.data.posts)

            console.log(community)
        }).catch((err) => console.log(err))

        //get all posts


    }, [])



    /**
        //mounting function
        useEffect(() => {
                xios.post('http://localhost:7400/communities/getAcomm', {
                userId: "6404a978ea4b09ad95f03e70"
            }).then(res => console.log(res))
        }, [])
     */
    // useEffect(() => {
    //     console.log("mounting component")

    // }, [imageSrc])


    return (
        //first outline dev
        <div>

            <div >

                {/* <image  src={require('https://marketplace.canva.com/EAEmB3DmXk0/1/0/1600w/canva-bright-gradient-lettering-rainbow-facebook-cover-0Z5QgybLshE.jpg')} /> */}
                <img className='center' src={`http://localhost:7400/images/${community.commiunityIcon}`} alt="" />

                <div className='commName'>{community.communityName} </div>


                <div className="flex-container">
                    <div >
                        <b>Followers:</b>{community.registeredNumber}
                    </div>

                    <div className='moderators'><u>Moderators</u></div>
                    {/* <button type="button" class="btn btn-dark"></button> */}
                    <nav class="navbar navbar-light bg-drak">



                    </nav>
                </div><hr></hr>
                <div class="input-group mb-2 justify-content-center ">
                    <button class="btn btn-outline-secondary " type="button">Posts</button>
                    <button class="btn btn-outline-secondary " type="button">Questions</button>
                    <form class="form-inline" >
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>

                <div className='container'>
                    <div className='row '>
                        <div className='col-2 border border-primary'> Upcomming Meetups</div>
                        <div className='col-1'> </div>
                        <div className='col-6 border border-primary rounded  '>
                            <div>posts</div>
                            <div><Share user={user} sendNewPost={getSharePost} personalCheck='false'></Share>
                            </div>
                        </div>
                        <div className='col-1'> </div>
                        <div className='col-2 border border-primary p-3' > Top Contributors</div>
                    </div>
                </div>



                {/* <div> {postJSX}</div> */}

            </div>


            {/* <communityHeader/> */}

        </div>
    );
};

export default Community;
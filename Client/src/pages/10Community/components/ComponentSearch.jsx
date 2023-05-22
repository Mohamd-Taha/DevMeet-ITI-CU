import React from 'react';
import axios from 'axios';
import './componentSearch.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';




const ComponentSearch = (commuunityprops) => {
    let s = "Social Forces is a journal of social research highlighting sociological inquiry but also exploring realms shared with social psychology, anthropology, political science, history, and economics. The journal's intended academic readers include sociologists, social psychologists, criminologists, economists, political scientists, anthropologists, and students of urban studies, race/ethnic relations, and religious studies."
    //get it from Auth
    var user = { _id: "" };



    var followCommunity = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/communities/requestToJoin`,
            {
                communityId: commuunityprops._id, userId: user.id
            }
        )
    }



    useEffect(() => {

    }, [])

    let community = {
        communityName: "Social Forces", communityDescription: s
        , CommunityIcon: "CommunityIcon.png", communityTopic: "Social"
    }
    return (
        <div>


            <div>

                <div className="card border-0 justify-content-center" style={{ width: '70%', margin: "auto" }}>
                    <div className="position-relative text-white">

                        <div className="card-img-overlay three"><span className="badge badge-light text-uppercase">{community.communityTopic} </span></div>

                        <div className="--card-smooth-caption">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-auto">
                                    <h5 className="card-title text-white">{community.communityName}</h5>
                                    {/* <h6 className="card-subtitle text-white">Alternative caption</h6> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <p className="card-text"> {community.communityDescription}</p>
                    </div>

                    <div className="card-footer">
                        <div className="media align-items-center">
                            <div style={{ alignItems: 'center' }} className="media-body"><button style={{ width: '20%' }} className='border border-danger rounded'>Follow</button></div>

                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default ComponentSearch;
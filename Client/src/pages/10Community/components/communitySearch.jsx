import React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, CardText, Button, Badge } from 'reactstrap'
import { useEffect, useState } from "react";
import { fontSize } from '@mui/system';
import { Block } from '@mui/icons-material';
import axios from 'axios';

const CommunitySearch = () => {
    //{ community, userId } component props
    let userId = "6414c0799c6e5ce227dafc";
    const [joined, setJoined] = useState(false)
    const [flag, setFlag] = useState(false)

    let joinedOrNot;

    let comm = {
        communityName: "ITI Organization",
        communityAdmin: {
            adminId: "640de48d4699705215d4e701"
        },
        communityDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        ,
        commiunityIcon: "CommunityIcon.png",
        commiunityCover: "egyptphones.png",
        registeredUsers: [
            "640e0a3ed0c672be0e671db8",
            "640fa1b4975e1079f7ddd1bd",
            "64134f0ad03d8e9718c6495b",
            "6414c0799c6e5ce227dafc27",
            "64161f16f33803128e2a93fa",
            "64161f36f33803128e2a9408"
        ],
        communityTopic: "Programming Languages"
        ,
        registeredNumber: 6,
        meetups: [],
        posts: [],
        joinRequests: [],
        _id: "64185c278b1025aa1d94dec4",
        createdAt: "2023-03-20T13:14:15.530Z",
        updatedAt: "2023-03-20T13:14:15.530Z",
        __v: 0
    }



    var checkIFloined = (userId) => {

        if (comm.registeredUsers.includes(userId)) {
            setJoined(true);
        }
        console.log(`joined value is  ${joined}`)

    }
    var requestToJoin = (userId) => {
        axios.posts('http://localhost:7400/communities/requestToJoin', {
            userId: userId,
            communityId: comm._id
        })
    }

    useEffect(() => {
        console.log("inside community search component")
        checkIFloined(userId);
        setFlag(true)
    }, [])




    return (
        <div>
            <Card
                style={{
                    width: '40rem'
                }}
            >
                <img
                    alt="Sample"
                    src={`http://localhost:7400/images/${comm.commiunityCover}`}
                />
                <CardBody>
                    <CardTitle tag="h5" style={{ fontSize: "2em" }}>
                        {comm.communityName}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 "
                        tag="h6"

                    >
                        <div>
                            <strong style={{ color: 'black' }}>Topic:</strong> {comm.communityTopic}
                        </div>

                    </CardSubtitle>
                    <CardText>
                        {comm.communityDescription}
                    </CardText>
                    <div style={{ fontSize: "1rem", fontWeight: "bold" }}> Followers:<span className='border rounded border-primary px-2'>{comm.registeredNumber}</span> </div>


                    <hr></hr>
                    {flag &&
                        <>
                            {joined
                                ? <Badge color="success">Joined</Badge>
                                : <Button size="lg">Join</Button>
                            }</>}

                    {/* {joinedOrNot}
                    {jsx} */}


                    {/* <Button>Join</Button> */}
                    {/* {(!joined) ? <Button>Join</Button> : <Badge Badge color="success">Joined</Badge>} */}

                </CardBody>
            </Card>

        </div >

        // <div >
        //     <div className='container border border-primary' style={{ width: "60vw" }}>
        //         <div className='row'>
        //             <div className='col-2'>
        //                 <img
        //                     alt="Sample"
        //                     src={`http://localhost:7400/images/${comm.commiunityCover}`}
        //                 />
        //             </div>
        //             <div className='col-8'>
        //                 <div>{comm.communityName}</div>
        //                 <div>{comm.communityDescription}</div>
        //             </div>
        //             <div className='col-2'>
        //                 <button>Join</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>


    );
};

export default CommunitySearch;
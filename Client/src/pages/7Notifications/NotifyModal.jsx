import React from 'react'
import { useEffect, useState } from 'react';
//import NoNotice from '/assets/notice.png'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import moment from 'moment'
import axios from 'axios';
import {useParams}from "react-router-dom";
     
//import { useAuthContext } from "../../hooks/useAuthContext";


const NotifyModal = () => {
    let { id } = useParams();




    const [notify, setnotify] = useState([])
    //let { user } = useAuthContext()
    //NEEDED : take userID FORM AUTHENCICATION/TOKEN AUTOMATICALLY
    // let user={_id:"60261ccf416a1ed478d7357a"}
    let user=id;

    useEffect(() => {

        axios.get(`http://localhost:7400/notifications`, {
            params: { id: user }
        }).then(res => {
            setnotify(res.data.notifies)
            console.log("inside mounting funcion")
            console.log(res.data)
        })

    },
    [])

    //need auth state
    var handleIsRead = (msg,index) => {

        let data=notify;
        var selectedNotfiy=notify[index];
        selectedNotfiy.isRead='true';
        data[index]=selectedNotfiy;
        setnotify(data);
        console.log("handleIsRead")

        axios.patch(`http://localhost:7400/isReadNotification/${msg._id}`).then(res=>{
            console.log("done")
        })


    }
    var handleDeleteAll = () => {
        console.log("handleDeleteAll")

    }
    // var getNotifies = axios.get(`http://localhost:7400/notifications`, {
    //     params: { id: user._id }
    // })

    //need req.user._id
    










    //noftification array 
    // mounting >> get all notification 
    //handle isRead 
    // io.on("createNotiftToclient", array.push( msg ))
    //delete all read for loop array >> check is read 
    //
    //const[Notify,setNotidy]=useState([]);
    //const isReadNotify ={
    //axios
    //edit on specified notification isRead>>True >>> renerder page 
    //}
    //







    // const { auth, notify } = useSelector(state => state)
    // //
    // const dispatch = useDispatch()

    // const handleIsRead = (msg) => {
    //     dispatch(isReadNotify({msg, auth}))
    // }

    // const handleSound = () => {
    //     dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
    // }

    // const handleDeleteAll = () => {
    //     const newArr = notify.data.filter(item => item.isRead === false)
    //     if(newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    //     if(window.confirm(`You have ${newArr.length} unread notices. Are you sure you want to delete all?`)){
    //         return dispatch(deleteAllNotifies(auth.token))
    //     }
    // }

    return (
        <div style={{ minWidth: '300px' }}>
            {/* handle sound */}
            <div className="d-flex justify-content-between align-items-center px-3">
                <h3>Notification</h3>
                {
                    // notify.sound ? 
                    // <i className="fas fa-bell text-danger" 
                    // style={{fontSize: '1.2rem', cursor: 'pointer'}}
                    // onClick={handleSound} />

                    <i className="fas fa-bell-slash text-danger"
                        style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    // onClick={handleSound} 
                    />
                }
            </div>
            <hr className="mt-0" />

            {
                notify.length === 0 &&
                <img src="/images/notice.png" alt="NoNotice" className="w-100" />}

            <div style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
                {
                    notify.map((msg, index) => (
                        // satart
                        <div key={index} className="px-2 mb-3" >
                            <Link  className="d-flex text-dark align-items-center"
                                onClick={() => handleIsRead(msg,index)}>
                                    {/* take this and access backend server and retrive an image */}
                                {/* <Avatar src={msg.user.profilePicture} size="big-avatar" /> */}

                                <div className="mx-1 flex-fill">
                                    <div>
                                        <strong className="mr-1">{msg.user.firstName} {msg.user.lastName}</strong>
                                        <span> {msg.text}</span>
                                    </div>
                                    {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
                                </div>

                                {
                                    msg.image &&
                                    <div style={{ width: '30px' }}>
                                        {/* {
                                            msg.image.match(/video/i)
                                                ? <video src={msg.image} width="100%" />
                                                : <Avatar src={msg.image} size="medium-avatar" />
                                        } */}
                                    </div>
                                }

                            </Link>
                            <small className="text-muted d-flex justify-content-between px-2">
                                {moment(msg.createdAt).fromNow()}
                                {
                                    !msg.isRead && <i className="fas fa-circle text-primary" />
                                }
                            </small>
                            {/* end */}
                        </div>
                    ))
                }

            </div>

            <hr className="my-1" />
            <div className="text-right text-danger mr-2" style={{ cursor: 'pointer' }}
                onClick={handleDeleteAll}>
                Delete All
            </div>

        </div>
    )
}

export default NotifyModal

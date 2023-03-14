import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import ChatOnline from './chatOnline/chatOnline';
import Conversation from './conversations/Conversation';
import Message from './messages/Message';
import axios from "axios";
import NavBar from '../../Components/NavBar';
// import { io } from "socket.io-client";


import "./Messanger.css"

const Messanger = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    user = user.user
    var count = 0;
    var my;
    const [conversations, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [ newMessage, setNewMessage ] = useState("")
    const scrollRef=useRef();
     const [userImg, setuserImg] = useState([])
 

    useEffect(() => {
        const getConversations = () => {

            axios.get("http://localhost:7400/api/conversations/" + user._id).then(res => {
                setConversation(res.data);
            }).catch(
                err => {
                    console.log("err")

                })
        };
        getConversations();
    }, [user._id])
    

    useEffect(() => {
        const getUser = async () => {
            await axios.get("http://localhost:7400/api/messages/" + currentChat?._id).then(res => {

                setMessages(res.data)
            }).catch(
                err => {
                    console.log("err")

                })
        }
      
        // console.log(currentChat._id)
        getUser()
    }, [currentChat])
    useEffect(() => {
        const getImgUser = async () => {
            await axios.get("http://localhost:7400/user/" + user?._id).then(res => {

                // setuserImg(res.data)
                // img =res.data.profilePicture
                // // console.log(userImg)
            }).catch(
                err => {
                    console.log("err")

                })
        }
      
        // console.log(currentChat._id)
        getImgUser()
    }, [user._id]) 

    const doThis = (d) => {
        setCurrentChat(d)
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage  
        }
        await axios.post("http://localhost:7400/api/messages/",message).
        then(res => {
            setMessages([...messages,res.data])
            console.log(res.data)
            console.log(message)
            setNewMessage("")
        }).catch(
            err => {
                console.log("err")
            })
    
}
useEffect(()=>{
scrollRef.current?.scrollIntoView({bahavior:"smooth"})
},[messages])
return (<>
    <NavBar></NavBar>
    <div className='messanger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for friends' className='chatMenuInput' />
                {conversations.map(C => (
                    <div onClick={() => doThis(C)}>
                        <Conversation conversation={C} currentUser={user} />
                    </div>


                ))}

            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ?
                        <>
                            <div className="chatBoxTop">
                                {messages.map((m) =>(
                                    <div  ref={scrollRef}>
                                          <Message message={m} own={m.sender === user._id} />  
                                    </div>
                                  
                                )
                                  
                                )}

                            </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput' placeholder='write something...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                <button className='chatSubmitButton' onClick={handleSubmit}>send</button>
                            </div>
                        </> : <span className='noConversationText'>Open a conversation to start a chat.</span>}
            </div>
        </div>
        {/* //(e) => setNewMessage(e.target.value) */}
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline />
                {/* <img className='postProfileImg'src={`http://localhost:7400/images/${img.userPicturePath}`}/> */}
            </div>
        </div>
    </div>
    </>
);
}

export default Messanger;

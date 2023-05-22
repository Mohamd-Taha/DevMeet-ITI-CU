import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import Conversation from './conversations/Conversation';
import Message from './messages/Message';
import axios from "axios";
import NavBar from '../../Components/NavBar';
import { io } from "socket.io-client";
import { useTranslation } from 'react-i18next'


import "./Messanger.css"

const Messanger = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    user = user.user
    var count = 0;
    const [conversations, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef();
    const [userImg, setuserImg] = useState([])
    let [t, i18n] = useTranslation();
    const [converstaionFlag, setConversationFlag] = useState(false);
    const [selectedChat, setSelectedChat] = useState();
    const [userImage, setUserImage] = useState();
    const [recieverImage, setRecieverImage] = useState();

    //Component Update 
    useEffect(() => {

        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...messages, arrivalMessage])

    }
        , [arrivalMessage, currentChat])

    useEffect(() => {
        const getUser = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/messages/` + currentChat?._id).then(res => {
                setMessages(res.data)
            }).catch(
                err => {
                    console.log("err")

                })
        }

        // console.log(currentChat._id)
        getUser()
    },
        [currentChat])

    useEffect(() => {
        setConversationFlag(true)
        console.log(conversations)
    }
        , [conversations])

    useEffect(() => {
        const getImgUser = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/user/` + user?._id).then(res => {

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
    }
        , [user._id])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ bahavior: "smooth" })
    }, [messages])


    //Mounting Functions
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
        console.log("from mounting function 1")


    }
        , [])

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
        console.log("from mounting function 2")
    }
        , [])


    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/conversations/` + user._id)
                setConversation(res.data);
                console.log(res);
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
        console.log("from mounting function 3")
    }, [])



    const doThis = (d) => {
        setCurrentChat(d)
        changeChat(d._id)

    }
    const changeChat = (newChatId) => {
        setSelectedChat(newChatId);
    }

    const handleSubmit = async (e) => {
        if (newMessage.trim() === "") return;
        e.preventDefault();
        const message = {
            conversationId: currentChat._id,
            sender: user._id,
            text: newMessage
        }
        const receiverId = currentChat.members.find(member => member !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        })
        await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/`, message).
            then(res => {
                setMessages([...messages, res.data])
                console.log(res.data)
                console.log(message)
                setNewMessage("")
            }).catch(
                err => {
                    console.log("err")
                })
    }

    const getUserImage = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/images/${user?.profilePicture}`)
            setUserImage(res.data)
            console.log("userImage is downloaded")
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        const getUserImage = async () => {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/images/${user?.profilePicture}`)
            console.log(res.data)
            setUserImage(res.data)
            console.log("userImage is downloaded")
        }
    }
        , [])


    return (
        <>

            <NavBar style={{ zIndex: '100' }} ></NavBar >

            <div className='messanger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <h5 className='aboveUsersTitle'> Chat with DevMeet users...</h5>
                        {converstaionFlag && conversations.map(C => (
                            <div onClick={() => doThis(C)} style={{ width: '85%' }} key={C._id} >
                                <Conversation conversation={C} currentUser={user} selectedChat={selectedChat == C._id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper"> {
                        currentChat ? <>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.sender === user._id} user={user} />
                                    </div>
                                )
                                )}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea className='chatMessageInput' placeholder='write your message...' onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></textarea>
                                <button className='chatSubmitButton' onClick={handleSubmit} >{t("SEND")}</button>
                            </div>
                        </> : <div className='noConversationText' >
                            <span>{t(" Open a conversation to start a chat...")}</span>
                        </div>
                    }
                    </div>
                </div>
            </div>

            {/* </div> */}
            {/* </> */}
        </>
    );
}

export default Messanger;

import React, { useEffect } from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material'
import { Users } from "../../../Pages/dummyData"
import CloseFriend from './CloseFriend'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import axios from 'axios'


export default function Sidebar() {
const filterTag=(event)=>{
const tag = event.target.innerText.replace(/\s/g, '');
console.log(tag)
 axios.get(`http://localhost:7400/posts/tags/${tag}`) 
 .then((response) => { return response })
 .then(({ data }) => {
        
      })
      .catch((err) => { console.log(err) })
  
    }
    useEffect(()=>{
     const elements = document.querySelectorAll('.sidebarListItem');
     elements.forEach((element) => {
     element.addEventListener('click', filterTag);
    });
    return () => {
        elements.forEach((element) => {
        element.removeEventListener('click', filterTag);
      });
    };
    },[])
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon' />
                        <h3 className="sidebarListItemText">Trending Tags</h3>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">Java</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">Web Development</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">DataManagment</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">DevOps</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">Flutter</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">ProblemSolving </span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">Git</span>
                    </li>
                </ul>
                <Button variant="contained" style={{ backgroundColor: 'purple' }} >See More</Button>
                <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon' />  <span className="sidebarListItemText">Top Users</span>
                    </li>
                    {Users.map(u => (
                        <CloseFriend key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}


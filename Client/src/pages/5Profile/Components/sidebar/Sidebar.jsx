import React from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {RssFeed,Chat, PlayCircleFilledOutlined,Group,Bookmark, HelpOutline,WorkOutline,Event,School} from '@mui/icons-material'
import {Users} from "../../dummyData"
import CloseFriend from '../closeFriend/CloseFriend'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';



export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon'/>
                        <h3 className="sidebarListItemText">Trending Tags</h3>
                    </li>
                    <li className="sidebarListItem">
                    <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">#Java</span>
                    </li>
                    <li className="sidebarListItem">
                    <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">#Web Development</span>
                    </li> 
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">#DataManagment</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">DevOps</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">Flutter</span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">ProblemSolving </span>
                    </li>
                    <li className="sidebarListItem">
                        <CodeIcon className='sidebarIcon'/>
                        <span className="sidebarListItemText">Git</span>
                    </li>
                </ul>
                <Button variant="contained" style={{ backgroundColor: 'purple' }} >See More</Button>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon'/>  <span className="sidebarListItemText">Top Users</span>
                    </li>
                    {Users.map(u=> (
                        <CloseFriend key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}


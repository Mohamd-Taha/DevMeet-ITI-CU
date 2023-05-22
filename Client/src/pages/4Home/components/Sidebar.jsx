import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RssFeed, Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material'
import CloseFriend from './CloseFriend'
import CodeIcon from '@mui/icons-material/Code';
import Button from '@mui/material/Button';
import axios from 'axios'
import TagIcon from '@mui/icons-material/Tag';
import { useTranslation } from 'react-i18next';

export default function Sidebar({ getTagPosts }) {
    let [t, i18n] = useTranslation();
    const [topUsers, setTopUsers] = useState()
    const filterTag = (event) => {
        const tag = event.target.innerText.replace(/\s/g, '');
        console.log(tag)
        axios.get(`${process.env.REACT_APP_API_URL}/posts/tags/${tag}`)
            .then((response) => { return response })
            .then(({ data }) => {
                getTagPosts(data)
            })
            .catch((err) => { console.log(err) })

    }
    useEffect(() => {
        const elements = document.querySelectorAll('.sidebarListItem');
        elements.forEach((element) => {
            element.addEventListener('click', filterTag);
        });
        return () => {
            elements.forEach((element) => {
                element.removeEventListener('click', filterTag);
            });
        };
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/top/likes`)
            .then((response) => { return response })
            .then(({ data }) => {
                setTopUsers(data)
            })
            .catch((err) => { console.log(err) })
    }, [])



    const Tags = ['JavaScript', 'TypeScript', 'React', 'CSS', 'HTML', 'Angular', 'NodeJS', 'MongoDB', 'UXUI', 'PHP', 'Mysql', 'SQL', 'Database', 'Data Structure', 'C', 'C#', 'C++', 'Java', 'R', 'Python', 'DevOps', 'Data Analysis',
        'Frontend', 'Backend', 'ProblemSolving', 'React Native', 'Kotlin', 'Flutter', 'Cyber Security', 'VueJS', 'Algorithms']; // lw momkn ta5odhom mn hna (melFront) fa eshta fa dol kfaya awi


    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList" >
                    <li >
                        <h2 className="sidebarListItemTextMAIN" >{t("Trending Tags")} <RssFeed className='sidebarIcon' /></h2>
                    </li>
                    {Tags.map((tag, index) => (
                        <li className="sidebarListItem" key={index} >
                            <TagIcon className='sidebarIcon' />
                            <span className="sidebarListItemText" >{tag}</span>
                        </li>
                    ))}
                </ul>
                {/* <Button variant="contained" style={{ backgroundColor: 'purple' }} >See More</Button> */}

                <hr className='sidebarHr' />

                <ul className="sidebarFriendList">
                    <h3 className="sidebarListItemTextMAIN" >{t("Top Contributors")} <Group className='sidebarIcon' /> </h3>
                    {topUsers?.map(u => (
                        <CloseFriend key={u._id} user={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}


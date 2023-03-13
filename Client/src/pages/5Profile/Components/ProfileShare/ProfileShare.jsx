import React from 'react'
import "./ProfileShare.css"
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material"
import Button from '@mui/material/Button';




const Share = () => {


    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src="assets/persons/1.jpg" alt="" />
                    <input placeholder="What's in your mind Sophia?" className='shareInput' />
                </div>
                <hr className='shareHr' />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor='purple' className='shareIcon' />
                            <span className='shareOptionText'>Photo or video</span>
                        </div>
                    </div>
                    {/* <div className="shareOptions">
                <div className="shareOption">
                    <Label htmlColor='blue' className='shareIcon'/>
                    <span className='shareOptionText'>Tag</span>
                </div>
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon'/>
                    <span className='shareOptionText'>Location</span>
                </div>  
            </div>
            <div className="shareOptions">
                <div className="shareOption">
                    <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                    <span className='shareOptionText'>Feelings</span>
                </div> 
            </div>   */}
                    <Button variant="contained" style={{ backgroundColor: 'purple' }} >Post</Button>
                </div>
            </div>
        </div>
    )
}

export default Share;
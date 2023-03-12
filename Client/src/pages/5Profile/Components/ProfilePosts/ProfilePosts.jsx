import React from 'react'
import "./ProfilePosts.css"
import ProfileShare from '../ProfileShare/ProfileShare'
import Post from '../post/Post'
import { Posts } from "../../../dummyData";


const Feed = () => {
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <ProfileShare />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  )
}
export default Feed;
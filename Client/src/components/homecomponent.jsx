import React from 'react'
import { useEffect, useState } from 'react'
import {useAuthContext} from "../hooks/useAuthContext";
import Post from './Post'
import {Posts} from './dummyData'
import './styles.css'
const Homecomponent=()=> {
 const {userId}=useAuthContext()
  return (
   <div className='parentHomeDiv'>
    <div className='filterDiv'>
    <btn className="tagbuttons">New</btn>
    <btn className="tagbuttons">Top</btn>
    <btn className="tagbuttons">Relevant</btn>
    <btn className="tagbuttons">Old</btn>
   </div>
   <div className='leftHomeDiv'>
    <a href="">Java</a>
    <a href="">Python</a>
    <a href="">C++</a>
    <a href="">Javascript</a>
   </div>
    <div className='PostsDiv'>
 {Posts.map((p) =>(
          <Post key = {p.id} post ={p}/>
        ))}
  </div>
  <div className='TopRightDiv'>
    <div>Meeting Times</div>
   </div>
   </div>
  )
}

export default Homecomponent
import React from 'react'
import { useEffect, useState } from 'react'
import {useAuthContext} from "../hooks/useAuthContext";
import './styles.css'
const Homecomponent=()=> {
 const {userId}=useAuthContext()
  return (
   <div>
    <div className='tagsDiv'>
    this is tags div
    </div>
   </div>
  )
}

export default Homecomponent
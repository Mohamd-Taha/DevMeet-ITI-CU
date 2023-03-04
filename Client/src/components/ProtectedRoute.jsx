import React from 'react'
import {Route, redirect} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import cookies from 'universal-cookie'
function ProtectedRoute({component:Component, ...rest}) {
const token = cookies.get('jwt')
if(!token){
 return redirect("./login");
}
else{
 const decodedToken = jwt_decode(token)
 console.log(decodedToken)
}
  return (
    <div>hi</div>
  )
}

export default ProtectedRoute
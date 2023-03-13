import {createContext, useReducer,useEffect, useState} from 'react'

export const AuthContext = createContext()

export const authReducer=(state, action)=>{
 switch(action.type){
  case 'LOGIN':
   return{user:action.payload}
  case 'LOGOUT':
  return {user:null}
  case 'Update':
  return {user:action.payload}
  default:
   return state
 }
}
export const profileReducer=(state, action)=>{
  switch(action.type){
  case 'friends':
      return state.friends=action.payload
  case 'posts':
    return state.posts=action.payload
  case 'updatePosts':
    return state.posts.map((post)=>{
      if(post._id==action.payload._id){
        return action.payload
      }
    })
  default:
  return state
  }
}

export const AuthContextProvider = ({children})=>{
 const [state, dispatch]=useReducer(authReducer, {
  user:null,
 })
const [isLoading, setIsLoading] = useState(true);
 const [profileState, profileDispatch]= useReducer(profileReducer)

 useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
   setIsLoading(false)
  }, [])
 console.log("Authcontext state:", state)
 return(
<AuthContext.Provider value={{...state, ...profileState, isLoading, dispatch, profileDispatch}}>
 {children}
</AuthContext.Provider>
 )
}
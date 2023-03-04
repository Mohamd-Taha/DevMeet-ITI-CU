import * as actions from './actionTypes'
function setPosts(posts){
return{
 type: actions.setPosts, 
 payload:{
  posts
 }
}
}
function setFriends(friends){
 return{
  type: actions.setFriends,
  payload:{
   friends  
  }
 }
}